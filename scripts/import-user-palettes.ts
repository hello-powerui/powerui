import { prisma } from '@/lib/db/prisma'
import fs from 'fs/promises'
import path from 'path'

interface PaletteExport {
  exportDate: string
  totalPaidMembers: number
  membersWithPalettes: number
  errors: number
  palettes: MemberPalette[]
}

interface MemberPalette {
  memberId: string
  email: string
  firstName: string
  lastName: string
  planName: string
  json: {
    themes: any[]
    customPalettes: CustomPalette[]
    neutralPalettes: any[]
  }
}

interface CustomPalette {
  id: string
  name: string
  colors: string[]
}

async function importUserPalettes() {
  const filePath = path.join(process.cwd(), 'memberstack-export', 'paid-member-palettes-2025-06-27T15-25-06.json')
  
  try {
    // Read the JSON file
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data: PaletteExport = JSON.parse(fileContent)
    
    console.log(`Found ${data.membersWithPalettes} members with palettes`)
    console.log(`Total palettes to import: ${data.palettes.reduce((acc, m) => acc + m.json.customPalettes.length, 0)}`)
    
    let successCount = 0
    let skipCount = 0
    let errorCount = 0
    
    // Process each member
    for (const memberData of data.palettes) {
      try {
        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: memberData.email }
        })
        
        if (!user) {
          console.log(`User not found for email: ${memberData.email}`)
          skipCount++
          continue
        }
        
        // Import each custom palette
        for (const palette of memberData.json.customPalettes) {
          try {
            // Check if palette with this ID already exists
            const existingPalette = await prisma.colorPalette.findUnique({
              where: { id: palette.id }
            })
            
            if (existingPalette) {
              console.log(`Palette ${palette.id} already exists, skipping`)
              skipCount++
              continue
            }
            
            // Create the palette with the original ID
            await prisma.colorPalette.create({
              data: {
                id: palette.id, // Preserve the original ID
                userId: user.id,
                name: palette.name,
                colors: palette.colors,
                isBuiltIn: false
              }
            })
            
            console.log(`✓ Imported palette "${palette.name}" (${palette.id}) for ${memberData.email}`)
            successCount++
          } catch (paletteError) {
            console.error(`Error importing palette ${palette.id}:`, paletteError)
            errorCount++
          }
        }
      } catch (memberError) {
        console.error(`Error processing member ${memberData.email}:`, memberError)
        errorCount++
      }
    }
    
    console.log('\n=== Import Summary ===')
    console.log(`Successfully imported: ${successCount} palettes`)
    console.log(`Skipped (user not found or palette exists): ${skipCount}`)
    console.log(`Errors: ${errorCount}`)
    
  } catch (error) {
    console.error('Fatal error during import:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the import
importUserPalettes()
  .then(() => {
    console.log('\nImport completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Import failed:', error)
    process.exit(1)
  })