export interface Customer {
  email: string;
  name?: string;
  sources: string[];
  purchaseStatus: 'paid' | 'free' | 'incomplete' | 'email_only';
  plans: string[];
  firstSeenDate: Date;
  lastActivityDate: Date;
  totalSpent: number;
  stripeCustomerId?: string;
  memberstackId?: string;
  loopsUserId?: string;
}

export interface Transaction {
  id: string;
  customerEmail: string;
  platform: 'gumroad' | 'lemonsqueezy' | 'stripe';
  date: Date;
  grossAmount: number;
  refundAmount: number;
  taxAmount: number;
  platformFee: number;
  processorFee: number;
  netAmount: number;
  productName: string;
  status: 'completed' | 'refunded' | 'disputed' | 'partial_refund';
  metadata?: Record<string, any>;
}

export interface ParsedGumroadRow {
  purchaseId: string;
  itemName: string;
  buyerName: string;
  purchaseEmail: string;
  buyerEmail: string;
  purchaseDate: string;
  salePrice: number;
  fees: number;
  netTotal: number;
  refunded: boolean;
  partialRefund: number;
  fullyRefunded: boolean;
  variants: string;
  discountCode: string;
}

export interface ParsedLemonSqueezyRow {
  identifier: string;
  orderNumber: string;
  productName: string;
  variantName: string;
  userName: string;
  userEmail: string;
  country: string;
  subtotal: string;
  discountTotal: string;
  tax: string;
  total: string;
  dateUtc: string;
}

export interface LemonSqueezyPayoutRow {
  date: string;
  sale: string;
  total: number;
  refunds: number;
  tax: number;
  platformFee: number;
  netTotal: number;
}

export interface ParsedMemberstackRow {
  memberId: string;
  email: string;
  createdAt: string;
  verified: boolean;
  stripeCustomerId: string;
  freePlans: string;
  paidPlans: string;
  lastLogin: string;
  firstName: string;
  lastName: string;
}

export interface ParsedLoopsRow {
  createdAt: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  subscribed: boolean;
  source: string;
  userGroup: string;
  memberstackPlan: string;
}

export interface ConsolidatedData {
  customers: Map<string, Customer>;
  transactions: Transaction[];
}

export interface FinancialSummary {
  totalRevenue: number;
  totalRefunds: number;
  totalFees: number;
  netRevenue: number;
  byPlatform: {
    [platform: string]: {
      revenue: number;
      refunds: number;
      fees: number;
      netRevenue: number;
      transactionCount: number;
    };
  };
  customerStats: {
    total: number;
    paid: number;
    free: number;
    incomplete: number;
    emailOnly: number;
  };
}