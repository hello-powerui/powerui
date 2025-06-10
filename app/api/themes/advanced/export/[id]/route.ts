import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/db/prisma';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/themes/advanced/export/[id] - Export theme as Power BI JSON
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

    // Parse the theme data
    const themeData = typeof theme.themeData === 'string' 
      ? JSON.parse(theme.themeData) 
      : theme.themeData;

    // Set proper headers for file download
    const headers = new Headers();
    const fileName = `${themeData.name || 'theme'}.json`.replace(/[^a-z0-9]/gi, '_');
    headers.set('Content-Type', 'application/json');
    headers.set('Content-Disposition', `attachment; filename="${fileName}"`);

    return new NextResponse(JSON.stringify(themeData, null, 2), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error exporting advanced theme:', error);
    return NextResponse.json(
      { error: 'Failed to export theme' },
      { status: 500 }
    );
  }
}