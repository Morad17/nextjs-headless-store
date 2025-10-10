"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";
import "../auth/auth-options.scss";
import "./homepage.scss";
import Image from "next/image";
import BannerSlideshow from "../banner-slideshow/page";

interface AuthMode {
  title: string;
  subtitle: string;
  fields: Array<{
    name: string;
    type: string;
    label: string;
    placeholder: string;
    required: boolean;
    minLength?: number;
  }>;
  submitText: string;
  loadingText: string;
  switchModeText?: string;
  switchModeAction?: string;
  showGuestInfo?: boolean;
}

interface AuthOptionsProps {
  onAuthComplete?: () => void;
}

export default function Homepage({ onAuthComplete }: AuthOptionsProps) {
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

  const { login, register, setGuestUser } = useAuthStore();
  const router = useRouter();

  // Auth mode configurations
  const authModes: Record<string, AuthMode> = {
    login: {
      title: "Welcome Back",
      subtitle: "Login to your account",
      fields: [
        {
          name: "email",
          type: "email",
          label: "Email",
          placeholder: "Enter your email",
          required: true,
        },
        {
          name: "password",
          type: "password",
          label: "Password",
          placeholder: "Enter your password",
          required: true,
        },
      ],
      submitText: "Login",
      loadingText: "Logging in...",
      switchModeText: "Don't have an account? Sign up here",
      switchModeAction: "signup",
    },
    signup: {
      title: "Create Account",
      subtitle: "Sign up to save your builds",
      fields: [
        {
          name: "username",
          type: "text",
          label: "Username",
          placeholder: "Choose a username",
          required: true,
        },
        {
          name: "email",
          type: "email",
          label: "Email",
          placeholder: "Enter your email",
          required: true,
        },
        {
          name: "password",
          type: "password",
          label: "Password",
          placeholder: "Create a password",
          required: true,
          minLength: 6,
        },
      ],
      submitText: "Sign Up",
      loadingText: "Creating account...",
      switchModeText: "Already have an account? Login here",
      switchModeAction: "login",
    },
    guest: {
      title: "Continue as Guest",
      subtitle: "Just tell us your name to get started",
      fields: [
        {
          name: "guestName",
          type: "text",
          label: "Your Name",
          placeholder: "Enter your name",
          required: true,
        },
      ],
      submitText: "Start Building",
      loadingText: "Starting...",
      showGuestInfo: true,
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    let success = false;

    try {
      switch (mode) {
        case "login":
          success = await login(formData.email, formData.password);
          if (!success) {
            setError("Invalid credentials. Please try again.");
          }
          break;
        case "signup":
          success = await register(
            formData.username,
            formData.email,
            formData.password
          );
          if (!success) {
            setError("Registration failed. Email might already be in use.");
          }
          break;
        case "guest":
          if (formData.guestName.trim()) {
            setGuestUser(formData.guestName.trim());
            success = true;
          } else {
            setError("Please enter your name to continue as guest.");
          }
          break;
      }

      if (success) {
        router.push("/build-pc");
        onAuthComplete?.();
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }

    setLoading(false);
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

  const handleSwitchMode = (newMode: string) => {
    setMode(newMode as "login" | "signup" | "guest");
    resetForm();
  };

  return (
    <div className="homepage">
      <div className="top-row">
        {/* Homepage content - always visible */}
        <BannerSlideshow />

        {/* Conditional auth section */}
        {mode === "choice" ? (
          <div className="auth-options">
            <div className="auth-card">
              <h2 className="auth-title">Get Started</h2>
              <p className="auth-subtitle">Choose how you'd like to continue</p>

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
        ) : (
          <LoginForm
            mode={authModes[mode]}
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onBack={goBack}
            onSwitchMode={handleSwitchMode}
            loading={loading}
            error={error}
          />
        )}
      </div>
      <div className="bottom-row"></div>
    </div>
  );
}
