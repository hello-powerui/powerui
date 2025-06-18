import { NextRequest, NextResponse } from 'next/server';
import { powerBIConfig } from '@/lib/powerbi/config';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// This endpoint gets an access token using client credentials flow
export async function POST(request: NextRequest) {

  try {
    const clientId = process.env.POWERBI_CLIENT_ID;
    const clientSecret = process.env.POWERBI_CLIENT_SECRET;
    const tenantId = process.env.POWERBI_TENANT_ID || powerBIConfig.tenantId;

    if (!clientId || !clientSecret) {
      
      return NextResponse.json(
        { error: 'Power BI credentials not configured' },
        { status: 500 }
      );
    }

    // Prepare the request body for client credentials flow
    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: powerBIConfig.scope,
    });

    // Get access token from Azure AD
    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    
    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error('[TOKEN] Failed to get access token:', {
        status: tokenResponse.status,
        error,
        tenantId,
      });
      return NextResponse.json(
        { 
          error: 'Failed to authenticate with Power BI',
          details: {
            status: tokenResponse.status,
            message: error,
          }
        },
        { status: 500 }
      );
    }

    const tokenData = await tokenResponse.json();

    // Calculate token expiry time
    const expiresOn = new Date();
    expiresOn.setSeconds(expiresOn.getSeconds() + tokenData.expires_in);
    
    const response = {
      accessToken: tokenData.access_token,
      tokenType: tokenData.token_type,
      expiresIn: tokenData.expires_in,
      expiresOn: expiresOn.toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    // console.error('[TOKEN] Error getting Power BI access token:', error);
    // console.error('[TOKEN] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
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