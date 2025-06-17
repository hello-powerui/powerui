import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';

export async function GET(req: NextRequest) {
  try {
    const { dbUser: user } = await requireAuth();
    
    // First, get all themes with basic info
    const allThemes = await prisma.theme.findMany({
      select: {
        id: true,
        name: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    
    // Get user's themes with full data
    const userThemes = await prisma.theme.findMany({
      where: { userId: user.id },
      include: {
        _count: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    
    // Check for any orphaned themes (no user)
    const orphanedThemes = await prisma.theme.findMany({
      where: { userId: null },
    });
    
    // Get recent theme operations from logs (if any)
    const recentUpdates = await prisma.theme.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: {
        id: true,
        name: true,
        updatedAt: true,
        createdAt: true,
      },
    });
    
    return NextResponse.json({
      summary: {
        totalThemesInDB: allThemes.length,
        userThemesCount: userThemes.length,
        orphanedThemesCount: orphanedThemes.length,
        userId: user.id,
      },
      userThemes: userThemes.map(t => ({
        id: t.id,
        name: t.name,
        created: t.createdAt,
        updated: t.updatedAt,
        hasData: !!t.themeData,
      })),
      recentActivity: recentUpdates.map(t => ({
        id: t.id,
        name: t.name,
        lastModified: t.updatedAt,
        created: t.createdAt,
        isNew: t.createdAt.getTime() === t.updatedAt.getTime(),
      })),
      allThemesOverview: allThemes.map(t => ({
        id: t.id,
        name: t.name,
        belongsToUser: t.userId === user.id,
        userId: t.userId,
      })),
    });
  } catch (error) {
    console.error('[DEBUG] Error checking themes:', error);
    return NextResponse.json(
      { error: 'Failed to check themes', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}