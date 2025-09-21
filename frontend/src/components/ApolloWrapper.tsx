// src/components/ApolloWrapper.tsx
"use client";

import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";

interface ApolloWrapperProps {
  children: React.ReactNode;
}

export function ApolloWrapper({ children }: ApolloWrapperProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

// Also export as default in case there are import issues
export default ApolloWrapper;
