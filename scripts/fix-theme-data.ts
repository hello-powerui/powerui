#!/usr/bin/env npx tsx
import { prisma } from '@/lib/db/prisma';

async function fixThemeData() {
  console.log('🔧 Fixing theme data for existing themes...');
  
  try {
    // Get all themes
    const themes = await prisma.theme.findMany();
    
    let fixedCount = 0;
    
    for (const theme of themes) {
      // Check if theme has themeData
      if (!theme.themeData || Object.keys(theme.themeData as any).length === 0) {
        console.log(`Fixing theme: ${theme.name} (${theme.id})`);
        
        // Reconstruct themeData from existing fields
        const themeData = {
          name: theme.name,
          dataColors: theme.dataPalette === 'custom' 
            ? ['#2568E8', '#8338EC', '#FF006E', '#F95608', '#FFBE0C', '#2ACF56'] // Default colors
            : theme.dataPalette,
          neutralPalette: theme.neutralPalette || 'azure',
          mode: theme.colorMode || 'light',
          fontFamily: theme.fontFamily || 'segoe-ui',
          fontSize: 14,
          borderRadius: parseInt(theme.borders || '4'),
          bgStyle: theme.bgStyle || 'default',
          borderStyle: theme.borderStyle || 'default',
          paddingStyle: theme.paddingStyle || 'default',
          showBorders: theme.showBorders !== false,
          spacing: 'default',
          description: theme.description || '',
        };
        
        // Update theme with proper themeData
        await prisma.theme.update({
          where: { id: theme.id },
          data: { themeData }
        });
        
        fixedCount++;
      }
    }
    
    console.log(`✅ Fixed ${fixedCount} themes`);
    console.log('🎉 Theme data migration complete!');
  } catch (error) {
    console.error('❌ Error fixing theme data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

fixThemeData();