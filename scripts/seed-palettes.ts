import { PaletteService } from '@/lib/db/services/palette-service';
import { prisma } from '@/lib/db/prisma';

async function seedPalettes() {
  console.log('🎨 Starting palette seeding...');
  
  try {
    await PaletteService.seedBuiltInPalettes();
    console.log('✅ Built-in palettes seeded successfully!');
    
    // Verify the palettes were created
    const colorPalettes = await prisma.colorPalette.findMany({
      where: { isBuiltIn: true }
    });
    console.log(`📊 Created ${colorPalettes.length} built-in color palettes`);
    
    const neutralPalettes = await prisma.neutralPalette.findMany({
      where: { isBuiltIn: true }
    });
    console.log(`📊 Created ${neutralPalettes.length} built-in neutral palettes`);
    
  } catch (error) {
    console.error('❌ Error seeding palettes:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding
seedPalettes();