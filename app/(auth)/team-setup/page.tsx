"use client";

import { useRouter } from "next/navigation";
import { CreateOrganization } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export default function TeamSetupPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Set Up Your Team</h1>
          <p className="text-muted-foreground mt-2">
            Create your organization to manage team members and licenses
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>What happens next?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>You&apos;ll be the organization admin</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>You can invite team members via email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Team members will have access to all PowerUI features</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>You can manage licenses and permissions</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <CreateOrganization 
              skipInvitationScreen={false}
              afterCreateOrganizationUrl="/dashboard"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-0 w-full",
                  cardBox: "w-full",
                  scrollBox: "w-full px-8 py-8",
                  form: "w-full space-y-6",
                  formContainer: "w-full",
                  formFieldRow: "w-full",
                  formFieldLabelRow: "mb-2",
                  formFieldLabel: "text-sm font-medium text-gray-700 dark:text-gray-300",
                  formFieldInput: "w-full rounded-md border-gray-300",
                  formButtonPrimary: "w-full bg-primary hover:bg-primary/90 text-primary-foreground",
                  headerTitle: "text-xl font-semibold text-center",
                  headerSubtitle: "text-sm text-muted-foreground text-center mt-2",
                  socialButtonsBlockButton: "w-full",
                  footerActionLink: "text-primary hover:underline",
                  identityPreviewEditButton: "text-primary hover:underline",
                  fileDropAreaBox: "w-full",
                  fileDropAreaOuterBox: "w-full",
                },
                layout: {
                  socialButtonsPlacement: "bottom",
                  shimmer: false,
                },
              }}
            />
          </CardContent>
        </Card>

        <div className="mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard")}
            className="w-full"
          >
            Skip for Now
          </Button>
        </div>
      </div>
    </div>
  );
}