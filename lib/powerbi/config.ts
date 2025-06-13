// Power BI Embedded configuration
// NOTE: In production, these values should be stored in environment variables
// and secrets should use a secure vault like Azure Key Vault

export const powerBIConfig = {
  // Workspace and report details (can be overridden via env vars)
  workspaceId: process.env.POWER_BI_EMBEDDED_WORKSPACE_ID || 'C8456667-05B9-4A77-838D-5EA89DC3F083',
  reportId: process.env.POWER_BI_EMBEDDED_REPORT_ID || 'd2f6a004-6932-417c-a6c3-2467738fe03e',
  
  // Azure AD details
  tenantId: process.env.POWERBI_TENANT_ID || '96860899-aa83-4db7-a71b-2aa296c28235',
  
  // These should be configured in environment variables
  clientId: process.env.POWERBI_CLIENT_ID || '',
  clientSecret: process.env.POWERBI_CLIENT_SECRET || '',
  
  // Power BI REST API endpoints
  authorityUri: `https://login.microsoftonline.com/${process.env.POWERBI_TENANT_ID || '96860899-aa83-4db7-a71b-2aa296c28235'}/`,
  scope: 'https://analysis.windows.net/powerbi/api/.default',
  powerBIApiUrl: 'https://api.powerbi.com/v1.0/myorg/',
  
  // Embed configuration
  embedUrl: '',
  embedToken: '',
  tokenExpiry: '',
};

export type PowerBIConfig = typeof powerBIConfig;