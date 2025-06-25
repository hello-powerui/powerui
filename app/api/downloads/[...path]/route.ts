import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import { hasActiveSubscription } from '@/lib/user-permissions';
import { Readable } from 'stream';

// Allowed resource categories and their paths
const ALLOWED_PATHS = {
  'examples/powerbi': {
    extensions: ['.pbix'],
    requiresAuth: true,
  },
  'examples/templates': {
    extensions: ['.xlsx', '.csv', '.json'],
    requiresAuth: true,
  },
  'examples/datasets': {
    extensions: ['.csv', '.xlsx'],
    requiresAuth: true,
  },
};

// MIME type mapping
const MIME_TYPES: Record<string, string> = {
  '.pbix': 'application/vnd.ms-powerbi',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.csv': 'text/csv',
  '.json': 'application/json',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    // Get the file path from URL segments
    const { path } = await params;
    const filePath = path.join('/');
    
    // Extract category from path
    const category = filePath.substring(0, filePath.lastIndexOf('/'));
    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
    
    // Validate category
    const categoryConfig = ALLOWED_PATHS[category as keyof typeof ALLOWED_PATHS];
    if (!categoryConfig) {
      return NextResponse.json(
        { error: 'Invalid resource category' },
        { status: 404 }
      );
    }
    
    // Check authentication if required
    if (categoryConfig.requiresAuth) {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }
      
      // Check subscription status
      const hasSubscription = await hasActiveSubscription(userId);
      if (!hasSubscription) {
        return NextResponse.json(
          { error: 'Active subscription required. Please upgrade to access these files.' },
          { status: 403 }
        );
      }
    }
    
    // Validate file extension
    const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
    if (!categoryConfig.extensions.includes(fileExtension)) {
      return NextResponse.json(
        { error: 'File type not allowed' },
        { status: 403 }
      );
    }
    
    // Construct safe file path
    const basePath = join(process.cwd(), 'resources');
    const fullPath = join(basePath, filePath);
    
    // Security: Ensure the resolved path is within the resources directory
    if (!fullPath.startsWith(basePath)) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 403 }
      );
    }
    
    // Check if file exists and get stats
    let fileStats;
    try {
      fileStats = statSync(fullPath);
    } catch (error) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }
    
    // Set appropriate headers
    const headers = new Headers({
      'Content-Type': MIME_TYPES[fileExtension] || 'application/octet-stream',
      'Content-Length': fileStats.size.toString(),
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Cache-Control': 'private, max-age=3600', // Cache for 1 hour
    });
    
    // For Vercel, we need to convert Node.js stream to Web Stream
    const nodeStream = createReadStream(fullPath);
    const webStream = Readable.toWeb(nodeStream) as ReadableStream;
    
    return new NextResponse(webStream, {
      status: 200,
      headers,
    });
    
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// List available files in a category
export async function POST(request: NextRequest) {
  try {
    const { category } = await request.json();
    
    // Validate category
    const categoryConfig = ALLOWED_PATHS[category as keyof typeof ALLOWED_PATHS];
    if (!categoryConfig) {
      return NextResponse.json(
        { error: 'Invalid resource category' },
        { status: 404 }
      );
    }
    
    // Check authentication if required
    if (categoryConfig.requiresAuth) {
      const { userId } = await auth();
      
      if (!userId) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }
      
      // Check subscription status
      const hasSubscription = await hasActiveSubscription(userId);
      if (!hasSubscription) {
        return NextResponse.json(
          { error: 'Active subscription required' },
          { status: 403 }
        );
      }
    }
    
    // Read directory and return file list
    const { readdirSync, statSync } = await import('fs');
    const basePath = join(process.cwd(), 'resources', category);
    
    try {
      const files = readdirSync(basePath)
        .filter(file => {
          const ext = file.substring(file.lastIndexOf('.'));
          return categoryConfig.extensions.includes(ext);
        })
        .map(file => {
          const stats = statSync(join(basePath, file));
          return {
            name: file,
            size: stats.size,
            sizeFormatted: formatFileSize(stats.size),
            modified: stats.mtime,
          };
        });
      
      return NextResponse.json({ files });
    } catch (error) {
      return NextResponse.json({ files: [] });
    }
    
  } catch (error) {
    console.error('List files error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}