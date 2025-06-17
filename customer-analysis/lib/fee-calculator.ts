export interface FeeBreakdown {
  platformFee: number;
  processorFee: number;
  totalFee: number;
}

export class FeeCalculator {
  // Stripe fees: 2.9% + $0.30 per transaction
  private static STRIPE_PERCENTAGE = 0.029;
  private static STRIPE_FIXED = 0.30;
  
  // Memberstack fees (need to confirm actual rates)
  private static MEMBERSTACK_PERCENTAGE = 0.03; // 3% assumption
  
  // Gumroad fees: varies by lifetime volume
  private static GUMROAD_PERCENTAGE = 0.10; // 10% for most sellers
  
  // LemonSqueezy fees are included in the payout CSVs
  
  static calculateStripeFees(amount: number): FeeBreakdown {
    const stripeFee = (amount * this.STRIPE_PERCENTAGE) + this.STRIPE_FIXED;
    const memberstackFee = amount * this.MEMBERSTACK_PERCENTAGE;
    
    return {
      platformFee: memberstackFee,
      processorFee: stripeFee,
      totalFee: stripeFee + memberstackFee
    };
  }
  
  static calculateGumroadFees(salePrice: number, netTotal: number): FeeBreakdown {
    // Gumroad fee is the difference between sale price and net total
    const totalFee = salePrice - netTotal;
    
    // Estimate processor fee (Stripe/PayPal) within Gumroad
    const estimatedProcessorFee = (salePrice * this.STRIPE_PERCENTAGE) + this.STRIPE_FIXED;
    const platformFee = totalFee - estimatedProcessorFee;
    
    return {
      platformFee: Math.max(0, platformFee),
      processorFee: estimatedProcessorFee,
      totalFee: totalFee
    };
  }
  
  static parseLemonSqueezyFees(platformFeeFromCSV: number, total: number): FeeBreakdown {
    // LemonSqueezy CSV already provides platform fee
    // Estimate processor fee within their total fee
    const estimatedProcessorFee = (total * this.STRIPE_PERCENTAGE) + this.STRIPE_FIXED;
    
    return {
      platformFee: Math.abs(platformFeeFromCSV) - estimatedProcessorFee,
      processorFee: estimatedProcessorFee,
      totalFee: Math.abs(platformFeeFromCSV)
    };
  }
  
  static calculateNetAmount(grossAmount: number, fees: FeeBreakdown, tax: number = 0, refunds: number = 0): number {
    return grossAmount - fees.totalFee - tax - refunds;
  }
}