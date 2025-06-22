import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  try {
    // Public themes are accessible to all users, even non-authenticated
    // But we'll check if user is authenticated to exclude their own themes
    const { userId } = await auth();

    // Get search params for pagination
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Build where clause - show ALL public themes
    const where = {
      visibility: 'PUBLIC' as const,
    };

    // Get public themes with pagination
    const [themes, totalCount] = await Promise.all([
      prisma.theme.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              username: true,
            },
          },
          organization: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: [
          { createdAt: 'desc' },
        ],
        skip,
        take: limit,
      }),
      prisma.theme.count({ where }),
    ]);

    // Transform themes to hide sensitive data
    const publicThemes = themes.map(theme => ({
      id: theme.id,
      name: theme.name,
      description: theme.description,
      themeData: theme.themeData,
      createdAt: theme.createdAt,
      updatedAt: theme.updatedAt,
      author: {
        id: theme.user.id,
        // Show username if available, otherwise show masked email
        email: theme.user.email.split('@')[0] + '@...',
        username: theme.user.username,
      },
    }));

    return NextResponse.json({
      themes: publicThemes,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching public themes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch public themes' },
      { status: 500 }
    );
  }
}