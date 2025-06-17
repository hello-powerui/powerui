export interface Organization {
  id: string;
  clerkOrgId: string;
  name: string;
  seats: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrganizationMember {
  id: string;
  organizationId: string;
  userId: string;
  role: "ADMIN" | "MEMBER";
  createdAt: Date;
  organization?: Organization;
  user?: {
    id: string;
    email: string;
  };
}

export interface OrganizationWithMembers extends Organization {
  members: OrganizationMember[];
  _count?: {
    themes: number;
    members: number;
  };
}

export interface TeamPurchase {
  id: string;
  userId?: string;
  organizationId?: string;
  plan: "TEAM_5" | "TEAM_10";
  seats: number;
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  organization?: Organization;
}

export interface TeamSetupStatus {
  hasPendingTeamSetup: boolean;
  purchase?: {
    plan: string;
    seats: number;
    createdAt: Date;
  };
}