import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/db/prisma';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/themes/advanced/[id] - Get specific theme
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const theme = await prisma.advancedTheme.findFirst({
      where: {
        id: params.id,
        userId,
      },
    });

    if (!theme) {
      return NextResponse.json({ error: 'Theme not found' }, { status: 404 });
    }

    return NextResponse.json({ theme });
  } catch (error) {
    console.error('Error fetching advanced theme:', error);
    return NextResponse.json(
      { error: 'Failed to fetch theme' },
      { status: 500 }
    );
  }
}

// PUT /api/themes/advanced/[id] - Update theme
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, themeData, schemaVersion } = body;

    // Check if theme exists and belongs to user
    const existingTheme = await prisma.advancedTheme.findFirst({
      where: {
        id: params.id,
        userId,
      },
    });

    if (!existingTheme) {
      return NextResponse.json({ error: 'Theme not found' }, { status: 404 });
    }

    const updatedTheme = await prisma.advancedTheme.update({
      where: { id: params.id },
      data: {
        name: name || existingTheme.name,
        description: description !== undefined ? description : existingTheme.description,
        themeData: themeData || existingTheme.themeData,
        schemaVersion: schemaVersion || existingTheme.schemaVersion,
      },
    });

    return NextResponse.json({ theme: updatedTheme });
  } catch (error) {
    console.error('Error updating advanced theme:', error);
    return NextResponse.json(
      { error: 'Failed to update theme' },
      { status: 500 }
    );
  }
}

// DELETE /api/themes/advanced/[id] - Delete theme
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if theme exists and belongs to user
    const existingTheme = await prisma.advancedTheme.findFirst({
      where: {
        id: params.id,
        userId,
      },
    });

    if (!existingTheme) {
      return NextResponse.json({ error: 'Theme not found' }, { status: 404 });
    }

    await prisma.advancedTheme.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting advanced theme:', error);
    return NextResponse.json(
      { error: 'Failed to delete theme' },
      { status: 500 }
    );
  }
}