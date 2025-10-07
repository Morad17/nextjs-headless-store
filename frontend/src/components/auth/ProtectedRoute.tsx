"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean; // Optional: if true, requires full authentication (not guest)
}

export default function ProtectedRoute({
  children,
  requireAuth = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isGuest, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    // Allow access if user is authenticated OR is a guest (unless requireAuth is true)
    const hasAccess = isAuthenticated || (isGuest && !requireAuth);

    if (!hasAccess) {
      router.push("/");
    }
  }, [isAuthenticated, isGuest, requireAuth, router]);

  // Show loading while checking auth status
  const hasAccess = isAuthenticated || (isGuest && !requireAuth);

  if (!hasAccess) {
    return (
      <div className="auth-loading">
        <p>Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}
