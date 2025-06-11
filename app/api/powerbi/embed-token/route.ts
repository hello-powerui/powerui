import { NextRequest, NextResponse } from 'next/server';
import { powerBIConfig } from '@/lib/powerbi/config';

export async function POST(request: NextRequest) {
  try {
    const { reportId, workspaceId } = await request.json();

    if (!reportId || !workspaceId) {
      return NextResponse.json(
        { error: 'Report ID and Workspace ID are required' },
        { status: 400 }
      );
    }

    // First, get an access token
    const tokenResponse = await fetch(
      new URL('/api/powerbi/token', request.url).toString(),
      { method: 'POST' }
    );

    if (!tokenResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to get access token' },
        { status: 500 }
      );
    }

    const { accessToken } = await tokenResponse.json();

    // Get report details
    const reportResponse = await fetch(
      `${powerBIConfig.powerBIApiUrl}groups/${workspaceId}/reports/${reportId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!reportResponse.ok) {
      const error = await reportResponse.text();
      console.error('Failed to get report details:', {
        status: reportResponse.status,
        statusText: reportResponse.statusText,
        error,
        workspaceId,
        reportId,
      });
      return NextResponse.json(
        { 
          error: 'Failed to get report details',
          details: {
            status: reportResponse.status,
            message: reportResponse.statusText,
            workspaceId,
            reportId,
          }
        },
        { status: 500 }
      );
    }

    const report = await reportResponse.json();

    // Generate embed token
    const embedTokenResponse = await fetch(
      `${powerBIConfig.powerBIApiUrl}groups/${workspaceId}/reports/${reportId}/GenerateToken`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessLevel: 'View',
          datasetId: report.datasetId,
        }),
      }
    );

    if (!embedTokenResponse.ok) {
      const error = await embedTokenResponse.text();
      console.error('Failed to generate embed token:', error);
      return NextResponse.json(
        { error: 'Failed to generate embed token' },
        { status: 500 }
      );
    }

    const embedToken = await embedTokenResponse.json();

    // Return embed configuration
    return NextResponse.json({
      type: 'report',
      id: reportId,
      embedUrl: report.embedUrl,
      accessToken: embedToken.token,
      tokenType: 1, // Embed token
      expiry: embedToken.expiration,
    });
  } catch (error) {
    console.error('Error generating embed token:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}