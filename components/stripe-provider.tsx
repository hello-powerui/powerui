"use client";

import { loadStripe } from "@stripe/stripe-js";
import { createContext, useContext, useEffect, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const StripeContext = createContext<{
  stripe: typeof stripePromise;
}>({
  stripe: stripePromise,
});

export function StripeProvider({ children }: { children: React.ReactNode }) {
  return (
    <StripeContext.Provider value={{ stripe: stripePromise }}>
      {children}
    </StripeContext.Provider>
  );
}

export const useStripe = () => {
  const context = useContext(StripeContext);
  if (!context) {
    throw new Error("useStripe must be used within a StripeProvider");
  }
  return context;
};