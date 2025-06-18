import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {

  const headers = Object.fromEntries(request.headers.entries());
  const url = new URL(request.url);
  
  const debugInfo = {
    method: 'GET',
    timestamp: new Date().toISOString(),
    url: url.toString(),
    pathname: url.pathname,
    searchParams: Object.fromEntries(url.searchParams.entries()),
    headers: {
      host: headers.host,
      'user-agent': headers['user-agent'],
      'x-vercel-deployment-url': headers['x-vercel-deployment-url'],
      'x-vercel-id': headers['x-vercel-id'],
      'x-vercel-ip-country': headers['x-vercel-ip-country'],
      'x-vercel-ip-city': headers['x-vercel-ip-city'],
    },
    runtime: 'edge',
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
      VERCEL_REGION: process.env.VERCEL_REGION,
    },
    message: 'Debug API route is working correctly!',
  };
  
  return NextResponse.json(debugInfo, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(request: NextRequest) {

  let body = null;
  try {
    body = await request.json();
  } catch (error) {
    
  }
  
  const headers = Object.fromEntries(request.headers.entries());
  const url = new URL(request.url);
  
  const debugInfo = {
    method: 'POST',
    timestamp: new Date().toISOString(),
    url: url.toString(),
    pathname: url.pathname,
    body,
    headers: {
      host: headers.host,
      'content-type': headers['content-type'],
      'content-length': headers['content-length'],
      'user-agent': headers['user-agent'],
      'x-vercel-deployment-url': headers['x-vercel-deployment-url'],
      'x-vercel-id': headers['x-vercel-id'],
    },
    runtime: 'edge',
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
    },
    message: 'Debug API route POST is working correctly!',
  };
  
  return NextResponse.json(debugInfo, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Content-Type': 'application/json',
    },
  });
}