import { NextRequest, NextResponse } from 'next/server';
import { powerBIConfig } from '@/lib/powerbi/config';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    
    const { reportId, workspaceId } = await request.json();

    if (!reportId || !workspaceId) {
      
      return NextResponse.json(
        { error: 'Report ID and Workspace ID are required' },
        { status: 400 }
      );
    }

    // Get credentials
    const clientId = process.env.POWERBI_CLIENT_ID;
    const clientSecret = process.env.POWERBI_CLIENT_SECRET;
    const tenantId = process.env.POWERBI_TENANT_ID || powerBIConfig.tenantId;

    if (!clientId || !clientSecret) {
      // console.error('[EMBED-TOKEN] Missing Power BI credentials');
      return NextResponse.json(
        { error: 'Power BI credentials not configured' },
        { status: 500 }
      );
    }

    // Get access token directly
    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: powerBIConfig.scope,
    });

    const tokenResponse = await fetch(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      }
    );

    if (!tokenResponse.ok) {
      const tokenError = await tokenResponse.text();
      // console.error('[EMBED-TOKEN] Failed to get access token:', tokenError);
      return NextResponse.json(
        { error: 'Failed to authenticate with Power BI', details: tokenError },
        { status: 500 }
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Get report details
    
    const reportUrl = `${powerBIConfig.powerBIApiUrl}groups/${workspaceId}/reports/${reportId}`;

    const reportResponse = await fetch(reportUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!reportResponse.ok) {
      const error = await reportResponse.text();
      // console.error('Failed to get report details:', {
      //   status: reportResponse.status,
      //   statusText: reportResponse.statusText,
      //   error,
      //   workspaceId,
      //   reportId,
      // });
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
    
    const embedTokenUrl = `${powerBIConfig.powerBIApiUrl}groups/${workspaceId}/reports/${reportId}/GenerateToken`;

    const embedTokenResponse = await fetch(embedTokenUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessLevel: 'View',
        datasetId: report.datasetId,
      }),
    });

    if (!embedTokenResponse.ok) {
      const error = await embedTokenResponse.text();
      // console.error('[EMBED-TOKEN] Failed to generate embed token:', {
      //   status: embedTokenResponse.status,
      //   error,
      //   workspaceId,
      //   reportId,
      // });
      return NextResponse.json(
        { 
          error: 'Failed to generate embed token',
          details: {
            status: embedTokenResponse.status,
            message: error,
          }
        },
        { status: 500 }
      );
    }

    const embedToken = await embedTokenResponse.json();

    // Return embed configuration
    const embedConfig = {
      type: 'report',
      id: reportId,
      embedUrl: report.embedUrl,
      accessToken: embedToken.token,
      tokenType: 1, // Embed token
      expiry: embedToken.expiration,
    };

    return NextResponse.json(embedConfig);
  } catch (error) {
    // console.error('[EMBED-TOKEN] Error generating embed token:', error);
    // console.error('[EMBED-TOKEN] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}