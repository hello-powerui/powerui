import { NextRequest, NextResponse } from 'next/server';
import { powerBIConfig } from '@/lib/powerbi/config';

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
      const error = await tokenResponse.text();
      console.error('Failed to get access token:', error);
      return NextResponse.json(
        { error: 'Failed to authenticate with Power BI' },
        { status: 500 }
      );
    }

    const tokenData = await tokenResponse.json();

    // Calculate token expiry time
    const expiresOn = new Date();
    expiresOn.setSeconds(expiresOn.getSeconds() + tokenData.expires_in);

    return NextResponse.json({
      accessToken: tokenData.access_token,
      tokenType: tokenData.token_type,
      expiresIn: tokenData.expires_in,
      expiresOn: expiresOn.toISOString(),
    });
  } catch (error) {
    console.error('Error getting Power BI access token:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}