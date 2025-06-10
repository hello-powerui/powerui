import { PaletteService } from '@/lib/db/services/palette-service'

async function initDatabase() {
  console.log('🚀 Initializing database...')
  
  try {
    // Seed built-in palettes
    console.log('📦 Seeding built-in palettes...')
    await PaletteService.seedBuiltInPalettes()
    console.log('✅ Built-in palettes seeded successfully')
    
    console.log('🎉 Database initialization complete!')
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  initDatabase()
}