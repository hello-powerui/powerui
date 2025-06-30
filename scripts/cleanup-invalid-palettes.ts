import { prisma } from '@/lib/db/prisma'

async function cleanupInvalidPalettes(dryRun = true) {
  try {
    // Find all color palettes
    const allPalettes = await prisma.colorPalette.findMany({
      select: {
        id: true,
        name: true,
        colors: true,
        userId: true,
        isBuiltIn: true,
        user: {
          select: {
            email: true
          }
        }
      }
    })

    console.log(`Total palettes found: ${allPalettes.length}`)

    // Filter palettes with 1 or no colors
    const invalidPalettes = allPalettes.filter(palette => {
      const colors = palette.colors as string[]
      return !colors || !Array.isArray(colors) || colors.length <= 1
    })

    console.log(`\nPalettes with 1 or no colors: ${invalidPalettes.length}`)

    if (invalidPalettes.length === 0) {
      console.log('No invalid palettes found!')
      return
    }

    // Group by number of colors for reporting
    const byColorCount = {
      0: invalidPalettes.filter(p => !(p.colors as string[]) || (p.colors as string[]).length === 0),
      1: invalidPalettes.filter(p => (p.colors as string[])?.length === 1)
    }

    console.log(`\nBreakdown:`)
    console.log(`- Palettes with 0 colors: ${byColorCount[0].length}`)
    console.log(`- Palettes with 1 color: ${byColorCount[1].length}`)

    // Show details of palettes to be deleted
    console.log('\n=== Palettes to be deleted ===')
    for (const palette of invalidPalettes) {
      const colors = palette.colors as string[]
      const colorCount = colors?.length || 0
      console.log(`\n${palette.name} (${palette.id})`)
      console.log(`  User: ${palette.user.email}`)
      console.log(`  Colors: ${colorCount} - ${colors?.join(', ') || 'none'}`)
      console.log(`  Built-in: ${palette.isBuiltIn}`)
    }

    if (dryRun) {
      console.log('\n=== DRY RUN MODE ===')
      console.log('No palettes were deleted. Run with dryRun=false to actually delete.')
      return
    }

    // Check for themes using these palettes
    console.log('\n=== Checking theme dependencies ===')
    let themesAffected = 0
    
    for (const palette of invalidPalettes) {
      try {
        const themes = await prisma.$queryRaw`
          SELECT COUNT(*) as count FROM "Theme" 
          WHERE ("themeData"->>'colorPaletteId') = ${palette.id}
        ` as Array<{count: bigint}>
        
        const count = Number(themes[0].count)
        if (count > 0) {
          console.log(`⚠️  Palette "${palette.name}" (${palette.id}) is used by ${count} theme(s)`)
          themesAffected += count
        }
      } catch (error) {
        console.log(`Error checking themes for palette ${palette.id}:`, error)
      }
    }

    if (themesAffected > 0) {
      console.log(`\n⚠️  WARNING: ${themesAffected} themes are using these palettes!`)
      console.log('These themes will be updated to use the default color palette.')
    }

    // Delete the invalid palettes
    console.log('\n=== Deleting palettes ===')
    let deleteCount = 0
    let errorCount = 0

    for (const palette of invalidPalettes) {
      try {
        // Use the PaletteService delete method which handles theme updates
        const result = await prisma.$transaction(async (tx) => {
          // Update themes that use this palette
          const updatedThemes = await tx.$executeRaw`
            UPDATE "Theme" 
            SET "themeData" = jsonb_set(
              jsonb_set("themeData", '{colorPaletteId}', '"powerbi-default"'),
              '{dataColors}', 
              '["#01B8AA", "#374649", "#FD625E", "#F2C80F", "#5F6B6D", "#8AD4EB", "#FE9666", "#A66999"]'
            )
            WHERE ("themeData"->>'colorPaletteId') = ${palette.id}
          `

          // Delete the palette
          await tx.colorPalette.delete({
            where: { id: palette.id }
          })

          return { updatedThemes }
        })

        console.log(`✓ Deleted palette "${palette.name}" (${palette.id})`)
        if (result.updatedThemes > 0) {
          console.log(`  Updated ${result.updatedThemes} theme(s) to use default palette`)
        }
        deleteCount++
      } catch (error) {
        console.error(`✗ Error deleting palette ${palette.id}:`, error)
        errorCount++
      }
    }

    console.log('\n=== Summary ===')
    console.log(`Successfully deleted: ${deleteCount} palettes`)
    console.log(`Errors: ${errorCount}`)

  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Check command line arguments
const args = process.argv.slice(2)
const dryRun = !args.includes('--execute')

if (dryRun) {
  console.log('Running in DRY RUN mode. Use --execute flag to actually delete palettes.')
}

cleanupInvalidPalettes(dryRun)
  .then(() => {
    console.log('\nCleanup completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Cleanup failed:', error)
    process.exit(1)
  })