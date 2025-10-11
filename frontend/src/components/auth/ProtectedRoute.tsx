"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean; // Optional: if true, requires full authentication
}

export default function ProtectedRoute({
  children,
  requireAuth = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isGuest } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Small delay to ensure hydration from localStorage
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Check if user has any form of access (authenticated or guest)
      const hasAccess = isAuthenticated || isGuest;

      // If requiring full auth, only authenticated users can access
      if (requireAuth && !isAuthenticated) {
        router.push("/");
        return;
      }

      // If no access at all (not authenticated and not guest), redirect
      if (!hasAccess) {
        router.push("/");
        return;
      }
    }
  }, [isAuthenticated, isGuest, requireAuth, router, isLoading]);

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div
        className="auth-loading"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #764ba2",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <p>Checking authentication...</p>
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  // Check access after loading is complete
  const hasAccess = isAuthenticated || isGuest;
  const hasRequiredAuth = requireAuth ? isAuthenticated : hasAccess;

  if (!hasRequiredAuth) {
    return null; // Will redirect, so don't show anything
  }

  return <>{children}</>;
}
