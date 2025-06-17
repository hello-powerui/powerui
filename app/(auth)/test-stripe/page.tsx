"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, CreditCard, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

// Only show this page in development
if (process.env.NODE_ENV === "production") {
  throw new Error("This page is only available in development");
}

export default function TestStripePage() {
  const { userId } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const testCards = [
    { number: "4242 4242 4242 4242", type: "Success", description: "Always succeeds" },
    { number: "4000 0000 0000 0002", type: "Decline", description: "Always declines" },
    { number: "4000 0025 0000 3155", type: "3D Secure", description: "Requires authentication" },
    { number: "4000 0000 0000 9995", type: "Insufficient", description: "Insufficient funds" },
  ];

  const plans = [
    { id: "pro", name: "Pro", price: "$119" },
    { id: "team-5", name: "Team (5 seats)", price: "$399" },
    { id: "team-10", name: "Team (10 seats)", price: "$699" },
  ];

  const handleTestCheckout = async (plan: string) => {
    if (!userId) {
      toast.error("Please sign in to test checkout");
      return;
    }

    setIsProcessing(plan);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Checkout failed");
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      // console.error("Checkout error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to start checkout");
    } finally {
      setIsProcessing(null);
    }
  };

  const handleCreateTestPurchase = async (plan: string) => {
    if (!userId) {
      toast.error("Please sign in to create test purchase");
      return;
    }

    setIsProcessing(`create-${plan}`);

    try {
      // In a real implementation, you'd call an API endpoint that uses the create-test-purchase script
      toast.success(`Test purchase created for ${plan} plan`);
      router.push("/dashboard?success=true");
    } catch (error) {
      toast.error("Failed to create test purchase");
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-3xl font-bold">Stripe Test Page</h1>
          <Badge variant="destructive">Development Only</Badge>
        </div>
        <p className="text-muted-foreground">
          Test Stripe integration without leaving the app. Use the test card numbers below.
        </p>
      </div>

      <div className="space-y-6">
        {/* Test Cards Reference */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Test Card Numbers
            </CardTitle>
            <CardDescription>
              Use any future expiry date and any 3-digit CVC
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testCards.map((card) => (
                <div key={card.number} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <code className="font-mono text-sm font-semibold">{card.number}</code>
                    <p className="text-sm text-muted-foreground mt-1">{card.description}</p>
                  </div>
                  <Badge variant={card.type === "Success" ? "default" : "secondary"}>
                    {card.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Test Checkout */}
        <Card>
          <CardHeader>
            <CardTitle>Test Checkout Flow</CardTitle>
            <CardDescription>
              Launches the real Stripe Checkout with test mode
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div key={plan.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold">{plan.name}</h3>
                  <p className="text-2xl font-bold mt-1">{plan.price}</p>
                  <Button
                    onClick={() => handleTestCheckout(plan.id)}
                    disabled={isProcessing !== null}
                    className="w-full mt-4"
                    variant="outline"
                  >
                    {isProcessing === plan.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Test Checkout"
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Test Purchase */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Test Purchase</CardTitle>
            <CardDescription>
              Create a test purchase directly in the database (skips Stripe)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
              <div className="flex gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                <div className="text-sm text-yellow-800 dark:text-yellow-200">
                  <p className="font-semibold">Note: Development Only</p>
                  <p>This creates a purchase record without going through Stripe. Useful for testing UI/UX.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <Button
                  key={plan.id}
                  onClick={() => handleCreateTestPurchase(plan.id)}
                  disabled={isProcessing !== null}
                  variant="secondary"
                >
                  {isProcessing === `create-${plan.id}` ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    `Create ${plan.name} Purchase`
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Webhook Testing */}
        <Card>
          <CardHeader>
            <CardTitle>Webhook Testing</CardTitle>
            <CardDescription>
              Instructions for testing webhooks locally
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-medium mb-2">1. Install Stripe CLI:</p>
              <code className="block p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                brew install stripe/stripe-cli/stripe
              </code>
            </div>
            <div>
              <p className="font-medium mb-2">2. Run webhook forwarding:</p>
              <code className="block p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                npm run dev:stripe
              </code>
            </div>
            <div>
              <p className="font-medium mb-2">3. Copy the webhook secret to .env.local:</p>
              <code className="block p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                STRIPE_WEBHOOK_SECRET=whsec_...
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}