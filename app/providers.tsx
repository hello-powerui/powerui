'use client';

import { ClerkProvider } from '@clerk/nextjs';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsPlacement: 'bottom',
          socialButtonsVariant: 'iconButton',
        },
        elements: {
          formButtonPrimary: {
            fontSize: '14px',
            textTransform: 'none',
            backgroundColor: '#2568E8',
            '&:hover': {
              backgroundColor: '#1e53c6',
            },
          },
        },
      }}
      afterSignOutUrl="/"
    >
      {children}
    </ClerkProvider>
  );
}