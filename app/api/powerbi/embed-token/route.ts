import { NextRequest, NextResponse } from 'next/server';
import { powerBIConfig } from '@/lib/powerbi/config';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  console.log('[EMBED-TOKEN] POST request received');
  console.log('[EMBED-TOKEN] URL:', request.url);
  console.log('[EMBED-TOKEN] Headers:', Object.fromEntries(request.headers.entries()));
  
  try {
    console.log('[EMBED-TOKEN] Parsing request body...');
    const { reportId, workspaceId } = await request.json();
    console.log('[EMBED-TOKEN] Request body:', { reportId, workspaceId });

    if (!reportId || !workspaceId) {
      console.log('[EMBED-TOKEN] Missing required parameters');
      return NextResponse.json(
        { error: 'Report ID and Workspace ID are required' },
        { status: 400 }
      );
    }

    // Get credentials
    const clientId = process.env.POWERBI_CLIENT_ID;
    const clientSecret = process.env.POWERBI_CLIENT_SECRET;
    const tenantId = process.env.POWERBI_TENANT_ID || powerBIConfig.tenantId;

    console.log('[EMBED-TOKEN] Environment check:', {
      hasClientId: !!clientId,
      hasClientSecret: !!clientSecret,
      tenantId: tenantId
    });

    if (!clientId || !clientSecret) {
      console.error('[EMBED-TOKEN] Missing Power BI credentials');
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

    console.log('[EMBED-TOKEN] Getting access token from Azure AD...');
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
      console.error('[EMBED-TOKEN] Failed to get access token:', tokenError);
      return NextResponse.json(
        { error: 'Failed to authenticate with Power BI', details: tokenError },
        { status: 500 }
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    console.log('[EMBED-TOKEN] Successfully got access token');

    // Get report details
    console.log('[EMBED-TOKEN] Fetching report details...');
    const reportUrl = `${powerBIConfig.powerBIApiUrl}groups/${workspaceId}/reports/${reportId}`;
    console.log('[EMBED-TOKEN] Report URL:', reportUrl);
    
    const reportResponse = await fetch(reportUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('[EMBED-TOKEN] Report response status:', reportResponse.status);

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
    console.log('[EMBED-TOKEN] Report details received:', {
      id: report.id,
      name: report.name,
      datasetId: report.datasetId,
      embedUrl: report.embedUrl,
    });

    // Generate embed token
    console.log('[EMBED-TOKEN] Generating embed token...');
    const embedTokenUrl = `${powerBIConfig.powerBIApiUrl}groups/${workspaceId}/reports/${reportId}/GenerateToken`;
    console.log('[EMBED-TOKEN] Embed token URL:', embedTokenUrl);
    
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
    console.log('[EMBED-TOKEN] Embed token response status:', embedTokenResponse.status);

    if (!embedTokenResponse.ok) {
      const error = await embedTokenResponse.text();
      console.error('[EMBED-TOKEN] Failed to generate embed token:', {
        status: embedTokenResponse.status,
        error,
        workspaceId,
        reportId,
      });
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
    console.log('[EMBED-TOKEN] Embed token generated successfully');

    // Return embed configuration
    const embedConfig = {
      type: 'report',
      id: reportId,
      embedUrl: report.embedUrl,
      accessToken: embedToken.token,
      tokenType: 1, // Embed token
      expiry: embedToken.expiration,
    };
    
    console.log('[EMBED-TOKEN] Returning embed configuration:', {
      ...embedConfig,
      accessToken: '[REDACTED]',
    });
    
    return NextResponse.json(embedConfig);
  } catch (error) {
    console.error('[EMBED-TOKEN] Error generating embed token:', error);
    console.error('[EMBED-TOKEN] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
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