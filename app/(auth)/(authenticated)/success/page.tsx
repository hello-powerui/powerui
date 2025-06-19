"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, Download, Users } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [purchaseDetails, setPurchaseDetails] = useState<any>(null);
  const [isTeamPurchase, setIsTeamPurchase] = useState(false);
  const returnUrl = searchParams.get("returnUrl");

  useEffect(() => {
    const success = searchParams.get("success");
    const sessionId = searchParams.get("session_id");

    if (success === "true") {
      // Check if this is a team purchase
      checkPurchaseType();
    } else {
      // Redirect if not coming from a successful payment
      router.push("/dashboard");
    }
  }, [searchParams, router]);

  const checkPurchaseType = async () => {
    try {
      const response = await fetch("/api/user/purchase");
      if (response.ok) {
        const data = await response.json();
        if (data.plan === "TEAM_5" || data.plan === "TEAM_10") {
          setIsTeamPurchase(true);
        }
        setPurchaseDetails(data);
      }
    } catch (error) {
      // console.error("Error checking purchase:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Processing your purchase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="text-center">
          <CardHeader className="pb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-3xl">Purchase Successful!</CardTitle>
            <CardDescription className="text-lg mt-2">
              Welcome to PowerUI Pro. Your account has been upgraded.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-lg">What&apos;s next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Access the Theme Studio</p>
                    <p className="text-sm text-muted-foreground">
                      Create unlimited custom themes for your Power BI reports
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-primary">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Download Resources</p>
                    <p className="text-sm text-muted-foreground">
                      Get example reports, design guide, and icon library
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-primary">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Join the Community</p>
                    <p className="text-sm text-muted-foreground">
                      Connect with other PowerUI users and share themes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isTeamPurchase ? (
                <>
                  <Button asChild size="lg">
                    <Link href="/team-setup">
                      <Users className="mr-2 h-4 w-4" />
                      Set Up Your Team
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href={returnUrl || "/themes/studio"}>
                      {returnUrl ? "Continue to Your Page" : "Open Theme Studio"}
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg">
                    <Link href={returnUrl || "/themes/studio"}>
                      {returnUrl ? "Continue" : "Open Theme Studio"}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/dashboard">
                      <Download className="mr-2 h-4 w-4" />
                      Download Resources
                    </Link>
                  </Button>
                </>
              )}
            </div>

            <p className="text-sm text-muted-foreground pt-4">
              A confirmation email has been sent to your registered email address.
              If you have any questions, please{" "}
              <Link href="/contact-sales" className="text-primary hover:underline">
                contact our support team
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}