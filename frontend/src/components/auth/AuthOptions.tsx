"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import "./auth-options.scss";

interface AuthOptionsProps {
  onAuthComplete?: () => void;
}

export default function AuthOptions({ onAuthComplete }: AuthOptionsProps) {
  const [mode, setMode] = useState<"choice" | "login" | "signup" | "guest">(
    "choice"
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    guestName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, register, setGuest } = useAuthStore(); // Remove unused authError
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password);

      setTimeout(() => {
        if (useAuthStore.getState().isAuthenticated) {
          router.push("/build-pc");
          onAuthComplete?.();
        } else {
          setError(
            useAuthStore.getState().error ||
              "Invalid credentials. Please try again."
          );
        }
        setLoading(false);
      }, 100);
    } catch (loginError) {
      console.error("Login failed:", loginError);
      setError("Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(formData.email, formData.password, formData.username);

      setTimeout(() => {
        if (useAuthStore.getState().isAuthenticated) {
          router.push("/build-pc");
          onAuthComplete?.();
        } else {
          setError(
            useAuthStore.getState().error ||
              "Registration failed. Email might already be in use."
          );
        }
        setLoading(false);
      }, 100);
    } catch (signupError) {
      console.error("Registration failed:", signupError);
      setError("Registration failed. Email might already be in use.");
      setLoading(false);
    }
  };

  const handleGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.guestName.trim()) {
      setGuest(formData.guestName);
      router.push("/build-pc");
      onAuthComplete?.();
    } else {
      setError("Please enter your name to continue as guest.");
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      username: "",
      guestName: "",
    });
    setError("");
  };

  const goBack = () => {
    setMode("choice");
    resetForm();
  };

  if (mode === "choice") {
    return (
      <div className="auth-options">
        <div className="auth-card">
          <h2 className="auth-title">Get Started</h2>
          <p className="auth-subtitle">
            Choose how you&apos;d like to continue
          </p>

          <div className="auth-buttons">
            <button
              className="auth-btn login-btn"
              onClick={() => setMode("login")}
            >
              <span className="btn-icon">👤</span>
              <span className="btn-text">
                <strong>Login</strong>
                <small>Access your saved builds</small>
              </span>
            </button>

            <button
              className="auth-btn signup-btn"
              onClick={() => setMode("signup")}
            >
              <span className="btn-icon">✨</span>
              <span className="btn-text">
                <strong>Sign Up</strong>
                <small>Create an account to save builds</small>
              </span>
            </button>

            <button
              className="auth-btn guest-btn"
              onClick={() => setMode("guest")}
            >
              <span className="btn-icon">🚀</span>
              <span className="btn-text">
                <strong>Continue as Guest</strong>
                <small>Start building right away</small>
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // When not in choice mode, show auth forms with homepage content still visible
  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <div className="auth-card">
          <button className="back-btn" onClick={goBack}>
            ← Back
          </button>

          {mode === "login" && (
            <div className="auth-card">
              <h2 className="auth-title">Welcome Back</h2>
              <p className="auth-subtitle">Login to your account</p>

              <form onSubmit={handleLogin} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {error && <div className="error-message">{error}</div>}
                <div className="submit-btn-group">
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>

                <p className="switch-mode">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="link-btn"
                  >
                    Sign up here
                  </button>
                </p>
              </form>
            </div>
          )}

          {mode === "signup" && (
            <div className="auth-card">
              <h2 className="auth-title">Create Account</h2>
              <p className="auth-subtitle">Sign up to save your builds</p>

              <form onSubmit={handleSignup} className="auth-form">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Choose a username"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password"
                    required
                    minLength={6}
                  />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Creating account..." : "Sign Up"}
                </button>

                <p className="switch-mode">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="link-btn"
                  >
                    Login here
                  </button>
                </p>
              </form>
            </div>
          )}

          {mode === "guest" && (
            <div className="auth-card">
              <h2 className="auth-title">Continue as Guest</h2>
              <p className="auth-subtitle">
                Just tell us your name to get started
              </p>

              <form onSubmit={handleGuest} className="auth-form">
                <div className="form-group">
                  <label htmlFor="guestName">Your Name</label>
                  <input
                    type="text"
                    id="guestName"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="submit-btn">
                  Start Building
                </button>

                <div className="guest-info">
                  <p>
                    ⚠️ Note: As a guest, your builds won&apos;t be saved
                    permanently.
                  </p>
                  <p>
                    Want to save your builds?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("signup")}
                      className="link-btn"
                    >
                      Create an account
                    </button>
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
