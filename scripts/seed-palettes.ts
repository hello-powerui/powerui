#!/usr/bin/env tsx

import { PaletteService } from '@/lib/db/services/palette-service';

async function main() {
  try {
    console.log('🌱 Seeding built-in palettes...');
    
    await PaletteService.seedBuiltInPalettes();
    
    console.log('✅ Built-in palettes seeded successfully!');
    console.log('📝 This includes:');
    console.log('   - PowerUI Default color palette');
    console.log('   - Azure neutral palette (default)');
    console.log('   - Cool neutral palette');
    console.log('   - Neutral palette');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding palettes:', error);
    process.exit(1);
  }
}

main();