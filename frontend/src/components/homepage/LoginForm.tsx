import React from "react";

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

interface LoginFormProps {
  mode: AuthMode;
  formData: {
    email: string;
    password: string;
    username: string;
    guestName: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  onSwitchMode: (mode: string) => void;
  loading: boolean;
  error: string;
}

export default function LoginForm({
  mode,
  formData,
  onInputChange,
  onSubmit,
  onBack,
  onSwitchMode,
  loading,
  error,
}: LoginFormProps) {
  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <div className="auth-card">
          <button className="back-btn" onClick={onBack}>
            ← Back
          </button>

          <h2 className="auth-title">{mode.title}</h2>
          <p className="auth-subtitle">{mode.subtitle}</p>

          <form onSubmit={onSubmit} className="auth-form">
            {mode.fields.map((field) => (
              <div key={field.name} className="form-group">
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={onInputChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  minLength={field.minLength}
                />
              </div>
            ))}

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? mode.loadingText : mode.submitText}
            </button>

            {mode.switchModeText && mode.switchModeAction && (
              <p className="switch-mode">
                {mode.switchModeText.split("?")[0]}?{" "}
                <button
                  type="button"
                  onClick={() => onSwitchMode(mode.switchModeAction!)}
                  className="link-btn"
                >
                  {mode.switchModeAction === "signup"
                    ? "Sign up here"
                    : "Login here"}
                </button>
              </p>
            )}

            {mode.showGuestInfo && (
              <div className="guest-info">
                <p>
                  ⚠️ Note: As a guest, your builds won&apos;t be saved
                  permanently.
                </p>
                <p>
                  Want to save your builds?{" "}
                  <button
                    type="button"
                    onClick={() => onSwitchMode("signup")}
                    className="link-btn"
                  >
                    Create an account
                  </button>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
