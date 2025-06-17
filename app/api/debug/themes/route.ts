import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';

export async function GET(req: NextRequest) {
  try {
    const { dbUser: user } = await requireAuth();
    
    // Get all themes for the user with detailed info
    const themes = await prisma.theme.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        version: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    
    // Get total count of themes in database
    const totalThemes = await prisma.theme.count();
    const userThemes = await prisma.theme.count({ where: { userId: user.id } });
    
    return NextResponse.json({
      userId: user.id,
      userThemes,
      totalThemes,
      themes,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch debug info' },
      { status: 500 }
    );
  }
}