"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import "./navigation.scss";

export default function Navigation() {
  const { isAuthenticated, isGuest, user, guestName, logout } = useAuthStore();

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link href="/">PC Builder</Link>
      </div>

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/build-pc">Build PC</Link>

        {(isAuthenticated || isGuest) && (
          <Link href="/order-summary">My Build</Link>
        )}
      </div>

      <div className="nav-auth">
        {isAuthenticated ? (
          <div className="user-info">
            <span>Welcome, {user?.username}</span>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : isGuest ? (
          <div className="guest-info">
            <span>👤 {guestName}</span>
            <button onClick={logout} className="logout-btn">
              End Session
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link href="/login" className="login-link">
              Login
            </Link>
            <Link href="/register" className="signup-link">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
