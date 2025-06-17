import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';

export async function GET(req: NextRequest) {
  try {
    const { dbUser: user } = await requireAuth();
    
    // Get all themes for this user
    const userThemes = await prisma.theme.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });
    
    // Check for themes with duplicate internal IDs
    const themesWithInternalId = userThemes.filter(theme => {
      const themeData = theme.themeData as any;
      return themeData?.id;
    });
    
    const internalIdGroups = themesWithInternalId.reduce((acc, theme) => {
      const themeData = theme.themeData as any;
      const internalId = themeData.id;
      if (!acc[internalId]) acc[internalId] = [];
      acc[internalId].push(theme);
      return acc;
    }, {} as Record<string, typeof userThemes>);
    
    const internalDuplicates = Object.entries(internalIdGroups).filter(([_, themes]) => themes.length > 1);
    
    // Check for duplicate names
    const nameGroups = userThemes.reduce((acc, theme) => {
      if (!acc[theme.name]) acc[theme.name] = [];
      acc[theme.name].push(theme);
      return acc;
    }, {} as Record<string, typeof userThemes>);
    
    const duplicateNames = Object.entries(nameGroups).filter(([_, themes]) => themes.length > 1);
    
    return NextResponse.json({
      userId: user.id,
      totalThemes: userThemes.length,
      themes: userThemes.map(t => ({
        dbId: t.id,
        name: t.name,
        internalId: (t.themeData as any)?.id || null,
        created: t.createdAt,
        updated: t.updatedAt,
      })),
      issues: {
        duplicateInternalIds: internalDuplicates.map(([internalId, themes]) => ({
          internalId,
          count: themes.length,
          themes: themes.map(t => ({ dbId: t.id, name: t.name }))
        })),
        duplicateNames: duplicateNames.map(([name, themes]) => ({
          name,
          count: themes.length,
          themes: themes.map(t => ({ dbId: t.id }))
        }))
      }
    });
  } catch (error) {
    console.error('[DEBUG] Error checking integrity:', error);
    return NextResponse.json(
      { error: 'Failed to check integrity', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}