#!/usr/bin/env tsx
/**
 * Migration script to convert neutral palettes from shades object to colors array format
 */

import { prisma } from '@/lib/db/prisma';
import { NEUTRAL_SHADE_KEYS } from '@/lib/types/unified-palette';

async function migrateNeutralPalettes() {
  console.log('Starting neutral palette migration...');
  
  try {
    // Get all neutral palettes
    const palettes = await prisma.neutralPalette.findMany();
    console.log(`Found ${palettes.length} neutral palettes to migrate`);
    
    let migrated = 0;
    let skipped = 0;
    
    for (const palette of palettes) {
      // Check if already migrated (has colors array)
      if (Array.isArray(palette.colors)) {
        console.log(`Palette ${palette.name} (${palette.id}) already migrated`);
        skipped++;
        continue;
      }
      
      // Check if it's in old shades format
      if (palette.colors && typeof palette.colors === 'object' && !Array.isArray(palette.colors)) {
        const shades = palette.colors as Record<string, string>;
        
        // Convert shades to colors array
        const colors = NEUTRAL_SHADE_KEYS.map(key => {
          // Map old keys to new array positions
          if (key === '0') return '#FFFFFF'; // Add white at start
          if (key === '25') return shades['25'] || '#F7F8F8';
          if (key === '50') return shades['50'] || '#F1F3F4';
          if (key === '75') return shades['100'] || '#E4E7E9'; // Use 100 for 75
          if (key === '100') return shades['100'] || '#E4E7E9';
          if (key === '200') return shades['200'] || '#C9D0D3';
          if (key === '300') return shades['300'] || '#AEB8BD';
          if (key === '400') return shades['400'] || '#93A1A7';
          if (key === '500') return shades['500'] || '#788991';
          if (key === '600') return shades['600'] || '#606E74';
          if (key === '700') return shades['700'] || '#485257';
          if (key === '800') return shades['800'] || '#30373A';
          if (key === '900') return shades['900'] || '#181B1D';
          if (key === '1000') return '#000000'; // Add black at end
          return '#000000';
        });
        
        // Update the palette
        await prisma.neutralPalette.update({
          where: { id: palette.id },
          data: { colors }
        });
        
        console.log(`Migrated palette ${palette.name} (${palette.id})`);
        migrated++;
      } else {
        console.log(`Palette ${palette.name} (${palette.id}) has unexpected format, skipping`);
        skipped++;
      }
    }
    
    console.log(`\nMigration complete!`);
    console.log(`Migrated: ${migrated}`);
    console.log(`Skipped: ${skipped}`);
    console.log(`Total: ${palettes.length}`);
    
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
migrateNeutralPalettes();