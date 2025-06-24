'use client'

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative">
      <Link
        href="/"
        className="absolute top-8 left-8 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>
      <SignIn 
        appearance={{
          baseTheme: undefined,
          elements: {
            rootBox: "mx-auto",
            card: "shadow-xl",
          },
          variables: {
            colorPrimary: "#4F46E5",
            colorTextOnPrimaryBackground: "#FFFFFF",
            colorBackground: "#FFFFFF",
            colorInputBackground: "#FAFAFA",
            colorInputText: "#18181B",
            colorText: "#18181B",
            colorTextSecondary: "#71717A",
            colorDanger: "#DC2626",
            borderRadius: "0.5rem",
          }
        }}
        fallbackRedirectUrl="/dashboard"
      />
    </div>
  );
}