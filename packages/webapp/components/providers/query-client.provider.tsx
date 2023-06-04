"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export function AppQueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
