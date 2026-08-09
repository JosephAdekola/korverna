// app/providers.tsx
"use client";

import { ReactNode } from "react";
import { RootContextProvider } from "@/src/contexts/rootContext";
import { InfrastructuresContextProvider } from "@/src/contexts/infrastructureContext";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <RootContextProvider>
      <InfrastructuresContextProvider>
        {children}
      </InfrastructuresContextProvider>
    </RootContextProvider>
  );
}