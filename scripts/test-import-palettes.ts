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

async function testImportPalettes() {
  const filePath = path.join(process.cwd(), 'memberstack-export', 'paid-member-palettes-2025-06-27T15-25-06.json')
  
  try {
    // Read the JSON file
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const data: PaletteExport = JSON.parse(fileContent)
    
    console.log(`Found ${data.membersWithPalettes} members with palettes`)
    console.log(`Total palettes in file: ${data.palettes.reduce((acc, m) => acc + m.json.customPalettes.length, 0)}`)
    
    // TEST: Only process first 3 members with palettes
    const testMembers = data.palettes.slice(0, 3).filter(m => m.json.customPalettes.length > 0)
    console.log(`\nTEST MODE: Processing only ${testMembers.length} members`)
    
    let successCount = 0
    let skipCount = 0
    let errorCount = 0
    
    // Process test members
    for (const memberData of testMembers) {
      console.log(`\nProcessing: ${memberData.email} (${memberData.json.customPalettes.length} palettes)`)
      
      try {
        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: memberData.email }
        })
        
        if (!user) {
          console.log(`  ⚠️  User not found for email: ${memberData.email}`)
          skipCount += memberData.json.customPalettes.length
          continue
        }
        
        console.log(`  ✓ Found user: ${user.id}`)
        
        // Import each custom palette
        for (const palette of memberData.json.customPalettes) {
          try {
            // Check if palette with this ID already exists
            const existingPalette = await prisma.colorPalette.findUnique({
              where: { id: palette.id }
            })
            
            if (existingPalette) {
              console.log(`  ⚠️  Palette ${palette.id} already exists, skipping`)
              skipCount++
              continue
            }
            
            // Create the palette with the original ID
            const created = await prisma.colorPalette.create({
              data: {
                id: palette.id, // Preserve the original ID
                userId: user.id,
                name: palette.name,
                colors: palette.colors,
                isBuiltIn: false
              }
            })
            
            console.log(`  ✓ Imported palette "${palette.name}" (${palette.id})`)
            console.log(`    Colors: ${palette.colors.join(', ')}`)
            successCount++
          } catch (paletteError) {
            console.error(`  ✗ Error importing palette ${palette.id}:`, paletteError)
            errorCount++
          }
        }
      } catch (memberError) {
        console.error(`✗ Error processing member ${memberData.email}:`, memberError)
        errorCount++
      }
    }
    
    console.log('\n=== TEST Import Summary ===')
    console.log(`Successfully imported: ${successCount} palettes`)
    console.log(`Skipped (user not found or palette exists): ${skipCount}`)
    console.log(`Errors: ${errorCount}`)
    
  } catch (error) {
    console.error('Fatal error during test import:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the test import
testImportPalettes()
  .then(() => {
    console.log('\nTest import completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Test import failed:', error)
    process.exit(1)
  })