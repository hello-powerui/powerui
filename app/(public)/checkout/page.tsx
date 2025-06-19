"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const planDetails = {
  pro: {
    name: "PowerUI Pro",
    price: "$119",
    description: "One-time purchase for individual professionals",
    features: [
      "Complete theme generator access",
      "15+ example reports with source files",
      "100+ page design guide (PDF)",
      "Figma design system",
      "1,500+ professional icons",
      "All future updates included",
    ],
  },
  "team-5": {
    name: "PowerUI Team (5 seats)",
    price: "$399",
    description: "Perfect for small teams",
    features: [
      "Everything in Pro",
      "5 transferable licenses",
      "Team member management portal",
      "Priority email support",
      "Team training resources",
    ],
  },
  "team-10": {
    name: "PowerUI Team (10 seats)",
    price: "$699",
    description: "For larger teams and organizations",
    features: [
      "Everything in Team (5 seats)",
      "10 transferable licenses",
      "Priority support with 24hr response",
      "Custom theme consultation",
      "Volume licensing available",
    ],
  },
};

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isLoaded, isSignedIn, userId } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const plan = searchParams.get("plan") as keyof typeof planDetails;
  const returnUrl = searchParams.get("returnUrl");
  
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // Redirect to sign-in page with return URL
      router.push(`/sign-in?redirect_url=/checkout?plan=${plan}`);
    }
  }, [isLoaded, isSignedIn, plan, router]);

  if (!plan || !planDetails[plan]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Invalid Plan</CardTitle>
            <CardDescription>
              The selected plan is not available.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/pricing")} className="w-full">
              View Pricing Plans
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const details = planDetails[plan];

  const handleCheckout = async () => {
    if (!isSignedIn) {
      toast.error("Please sign in to continue");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan, returnUrl }),
      });

      if (!response.ok) {
        let errorMessage = "Checkout failed";
        try {
          const errorText = await response.text();
          errorMessage = errorText || `HTTP ${response.status} error`;
        } catch (e) {
          errorMessage = `HTTP ${response.status} error`;
        }
        // console.error("Checkout API error:", errorMessage);
        throw new Error(errorMessage);
      }

      const { url } = await response.json();
      
      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      // console.error("Checkout error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to start checkout");
      setIsProcessing(false);
    }
  };

  if (!isLoaded || (isLoaded && !isSignedIn)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
          <p className="text-muted-foreground">
            One-time payment. Lifetime access. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{details.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {details.description}
                </p>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg">Total</span>
                  <span className="text-2xl font-bold">{details.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  One-time payment (USD)
                </p>
              </div>

              <Button 
                onClick={handleCheckout} 
                disabled={isProcessing}
                size="lg"
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Proceed to Payment"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Secure payment powered by Stripe. 30-day money-back guarantee.
              </p>
            </CardContent>
          </Card>

          {/* What's Included */}
          <Card>
            <CardHeader>
              <CardTitle>What&apos;s Included</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {details.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}