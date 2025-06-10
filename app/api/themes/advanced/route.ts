import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/db/prisma';

// GET /api/themes/advanced - List user's advanced themes
export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const themes = await prisma.advancedTheme.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        name: true,
        description: true,
        schemaVersion: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ themes });
  } catch (error) {
    console.error('Error fetching advanced themes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch themes' },
      { status: 500 }
    );
  }
}

// POST /api/themes/advanced - Create new advanced theme
export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, themeData, schemaVersion } = body;

    if (!name || !themeData) {
      return NextResponse.json(
        { error: 'Name and theme data are required' },
        { status: 400 }
      );
    }

    const theme = await prisma.advancedTheme.create({
      data: {
        name,
        description: description || '',
        themeData,
        schemaVersion: schemaVersion || '2.143',
        userId,
      },
    });

    return NextResponse.json({ theme }, { status: 201 });
  } catch (error) {
    console.error('Error creating advanced theme:', error);
    return NextResponse.json(
      { error: 'Failed to create theme' },
      { status: 500 }
    );
  }
}