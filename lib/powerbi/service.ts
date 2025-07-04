import { powerBIConfig } from './config';

export interface EmbedConfig {
  type: 'report' | 'visual';
  id: string;
  embedUrl: string;
  accessToken: string;
  tokenType: number;
  pageName?: string;
  visualName?: string;
  theme?: any;
  settings?: {
    panes?: {
      filters?: {
        visible?: boolean;
      };
      pageNavigation?: {
        visible?: boolean;
      };
    };
    background?: string;
    filterPaneEnabled?: boolean;
    navContentPaneEnabled?: boolean;
  };
}

export interface PowerBIReport {
  id: string;
  name: string;
  embedUrl: string;
  webUrl: string;
  datasetId: string;
}

export class PowerBIService {
  private static instance: PowerBIService;
  private accessToken: string | null = null;
  private tokenExpiry: Date | null = null;

  private constructor() {}

  static getInstance(): PowerBIService {
    if (!PowerBIService.instance) {
      PowerBIService.instance = new PowerBIService();
    }
    return PowerBIService.instance;
  }

  // Get access token using client credentials flow
  async getAccessToken(): Promise<string> {
    // Check if we have a valid cached token
    if (this.accessToken && this.tokenExpiry && new Date() < this.tokenExpiry) {
      return this.accessToken;
    }

    // Get new token from our API endpoint
    const response = await fetch('/api/powerbi/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.statusText}`);
    }

    const data = await response.json();
    this.accessToken = data.accessToken;
    this.tokenExpiry = new Date(data.expiresOn);

    if (!this.accessToken) {
      throw new Error('Failed to obtain access token');
    }

    return this.accessToken;
  }

  // Get embed token for a specific report
  async getEmbedToken(reportId: string, workspaceId: string): Promise<EmbedConfig> {
    const response = await fetch('/api/powerbi/embed-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reportId,
        workspaceId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get embed token: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }

  // Get report details
  async getReport(reportId: string, workspaceId: string): Promise<PowerBIReport> {
    const accessToken = await this.getAccessToken();
    
    const response = await fetch(
      `${powerBIConfig.powerBIApiUrl}groups/${workspaceId}/reports/${reportId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get report: ${response.statusText}`);
    }

    return response.json();
  }

  // Generate embed configuration with theme
  async getEmbedConfigWithTheme(
    reportId: string,
    workspaceId: string,
    theme?: any
  ): Promise<EmbedConfig> {
    const embedConfig = await this.getEmbedToken(reportId, workspaceId);

    // Don't wrap theme here - it will be wrapped by the caller
    if (theme) {
      embedConfig.theme = theme;
    }

    // Add default settings
    embedConfig.settings = {
      panes: {
        filters: { visible: false },
        pageNavigation: { visible: false },
      },
      background: 'transparent',
    };

    return embedConfig;
  }

  // Generate visual embed configuration with theme
  async getVisualEmbedConfigWithTheme(
    reportId: string,
    workspaceId: string,
    pageName: string,
    visualName: string,
    theme?: any
  ): Promise<EmbedConfig> {
    const embedConfig = await this.getEmbedToken(reportId, workspaceId);

    // Convert to visual embed config
    embedConfig.type = 'visual';
    embedConfig.pageName = pageName;
    embedConfig.visualName = visualName;

    // Don't wrap theme here - it will be wrapped by the caller
    if (theme) {
      embedConfig.theme = theme;
    }

    // Add default settings for visual embedding
    embedConfig.settings = {
      filterPaneEnabled: false,
      navContentPaneEnabled: false,
      background: 'transparent',
    };

    return embedConfig;
  }
}