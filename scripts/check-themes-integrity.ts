import { prisma } from '@/lib/db/prisma';

async function checkThemesIntegrity() {
  console.log('Checking themes database integrity...\n');
  
  try {
    // Get all themes
    const allThemes = await prisma.theme.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`Total themes in database: ${allThemes.length}`);
    console.log('\nThemes by user:');
    
    // Group by user
    const themesByUser = allThemes.reduce((acc, theme) => {
      const userId = theme.userId || 'NO_USER';
      if (!acc[userId]) acc[userId] = [];
      acc[userId].push(theme);
      return acc;
    }, {} as Record<string, typeof allThemes>);
    
    for (const [userId, themes] of Object.entries(themesByUser)) {
      console.log(`\nUser ${userId}: ${themes.length} themes`);
      themes.forEach(theme => {
        console.log(`  - ${theme.id}: "${theme.name}" (created: ${theme.createdAt.toISOString()})`);
      });
    }
    
    // Check for duplicate names
    console.log('\nChecking for duplicate theme names...');
    const nameGroups = allThemes.reduce((acc, theme) => {
      if (!acc[theme.name]) acc[theme.name] = [];
      acc[theme.name].push(theme);
      return acc;
    }, {} as Record<string, typeof allThemes>);
    
    const duplicates = Object.entries(nameGroups).filter(([_, themes]) => themes.length > 1);
    if (duplicates.length > 0) {
      console.log('Found duplicate theme names:');
      duplicates.forEach(([name, themes]) => {
        console.log(`  "${name}": ${themes.length} themes`);
        themes.forEach(theme => {
          console.log(`    - ${theme.id} (user: ${theme.userId})`);
        });
      });
    } else {
      console.log('No duplicate theme names found.');
    }
    
    // Check for themes with same themeData.id
    console.log('\nChecking for themes with duplicate internal IDs...');
    const themesWithInternalId = allThemes.filter(theme => {
      const themeData = theme.themeData as any;
      return themeData?.id;
    });
    
    console.log(`Themes with internal ID in themeData: ${themesWithInternalId.length}`);
    
    const internalIdGroups = themesWithInternalId.reduce((acc, theme) => {
      const themeData = theme.themeData as any;
      const internalId = themeData.id;
      if (!acc[internalId]) acc[internalId] = [];
      acc[internalId].push(theme);
      return acc;
    }, {} as Record<string, typeof allThemes>);
    
    const internalDuplicates = Object.entries(internalIdGroups).filter(([_, themes]) => themes.length > 1);
    if (internalDuplicates.length > 0) {
      console.log('CRITICAL: Found themes with duplicate internal IDs:');
      internalDuplicates.forEach(([internalId, themes]) => {
        console.log(`  Internal ID "${internalId}": ${themes.length} themes`);
        themes.forEach(theme => {
          console.log(`    - Database ID: ${theme.id}, Name: "${theme.name}", User: ${theme.userId}`);
        });
      });
    }
    
  } catch (error) {
    console.error('Error checking themes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkThemesIntegrity();