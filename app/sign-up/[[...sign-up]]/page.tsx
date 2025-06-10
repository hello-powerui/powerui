import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <SignUp 
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
        redirectUrl="/dashboard"
        afterSignUpUrl="/dashboard"
      />
    </div>
  );
}