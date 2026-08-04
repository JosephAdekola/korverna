// app/providers.tsx
"use client";

import { ReactNode } from "react";
import { RootContextProvider } from "@/src/contexts/rootContext";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <RootContextProvider>
      {children}
    </RootContextProvider>
  );
}