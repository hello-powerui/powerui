import { AppError } from '@/lib/errors';

interface PowerBIToken {
  accessToken: string;
  expiresAt: number;
}

interface PowerBIEmbedConfig {
  accessToken: string;
  embedUrl: string;
  reportId: string;
  tokenExpiry?: string;
}

export class PowerBIService {
  private static instance: PowerBIService;
  private static tokenCache: PowerBIToken | null = null;

  private constructor() {}

  public static getInstance(): PowerBIService {
    if (!PowerBIService.instance) {
      PowerBIService.instance = new PowerBIService();
    }
    return PowerBIService.instance;
  }

  async getAccessToken(): Promise<string> {
    // Check cache first
    if (this.isTokenValid()) {
      return PowerBIService.tokenCache!.accessToken;
    }

    const token = await this.fetchNewToken();
    this.cacheToken(token);
    return token.accessToken;
  }

  async getEmbedToken(reportId?: string): Promise<PowerBIEmbedConfig> {
    const accessToken = await this.getAccessToken();
    
    // Use the config file for defaults
    const { powerBIConfig } = await import('@/lib/powerbi/config');
    const workspaceId = powerBIConfig.workspaceId;
    const defaultReportId = powerBIConfig.reportId;
    const targetReportId = reportId || defaultReportId;

    if (!workspaceId || !targetReportId) {
      throw new AppError(
        'PowerBI configuration missing',
        'POWERBI_CONFIG_ERROR',
        500
      );
    }

    // Always try to generate a proper embed token
    try {
      const embedToken = await this.generateEmbedToken(
        accessToken,
        workspaceId,
        targetReportId
      );
      
      console.log('[PowerBI] Generated embed token successfully');
      
      return {
        accessToken: embedToken.token,
        embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${targetReportId}&groupId=${workspaceId}`,
        reportId: targetReportId,
        tokenExpiry: embedToken.expiration,
      };
    } catch (error) {
      console.error('Failed to generate embed token, falling back to access token:', error);
      
      // Fall back to returning the access token if embed token generation fails
      // This might work if the service principal has direct access to the report
      return {
        accessToken,
        embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${targetReportId}&groupId=${workspaceId}`,
        reportId: targetReportId,
      };
    }
  }

  private async fetchNewToken(): Promise<PowerBIToken> {
    // Import config for consistent variable names
    const { powerBIConfig } = await import('@/lib/powerbi/config');
    const tenantId = powerBIConfig.tenantId;
    const clientId = powerBIConfig.clientId;
    const clientSecret = powerBIConfig.clientSecret;

    if (!tenantId || !clientId || !clientSecret) {
      console.error('Azure AD configuration missing:', {
        hasTenantId: !!tenantId,
        hasClientId: !!clientId,
        hasClientSecret: !!clientSecret
      });
      throw new AppError(
        'Azure AD configuration missing. Please set POWERBI_CLIENT_ID and POWERBI_CLIENT_SECRET environment variables.',
        'AZURE_CONFIG_ERROR',
        500
      );
    }

    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    
    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'https://analysis.windows.net/powerbi/api/.default',
    });

    console.log('[PowerBI] Fetching access token from Azure AD');
    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('[PowerBI] Azure AD token fetch failed:', { status: response.status, error });
        throw new Error(`Token fetch failed: ${error}`);
      }

      const data = await response.json();
      console.log('[PowerBI] Successfully obtained access token');
      
      return {
        accessToken: data.access_token,
        expiresAt: Date.now() + (data.expires_in * 1000) - 60000, // Subtract 1 minute for safety
      };
    } catch (error) {
      console.error('Azure AD token fetch error:', error);
      throw new AppError(
        'Failed to authenticate with Azure AD',
        'AZURE_AUTH_ERROR',
        500
      );
    }
  }

  private async generateEmbedToken(
    accessToken: string,
    workspaceId: string,
    reportId: string
  ): Promise<{ token: string; expiration: string }> {
    const embedUrl = `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}/GenerateToken`;
    
    console.log('[PowerBI] Generating embed token for:', { workspaceId, reportId });
    
    // Only include datasetId if it's provided
    const body: any = {
      accessLevel: 'View',
    };
    
    if (process.env.POWERBI_DATASET_ID) {
      body.datasetId = process.env.POWERBI_DATASET_ID;
    }

    const response = await fetch(embedUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('[PowerBI] Embed token generation failed:', { status: response.status, error });
      throw new Error(`Embed token generation failed: ${error}`);
    }

    const result = await response.json();
    console.log('[PowerBI] Embed token generated successfully');
    return result;
  }

  private isTokenValid(): boolean {
    if (!PowerBIService.tokenCache) {
      return false;
    }
    
    // Check if token expires in more than 5 minutes
    return PowerBIService.tokenCache.expiresAt > Date.now() + 300000;
  }

  private cacheToken(token: PowerBIToken): void {
    PowerBIService.tokenCache = token;
  }

  clearCache(): void {
    PowerBIService.tokenCache = null;
  }
}