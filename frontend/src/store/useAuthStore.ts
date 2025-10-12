import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthState {
  // Auth state
  isAuthenticated: boolean;
  isGuest: boolean;
  user: User | null;
  token: string | null;
  guestName: string | null;

  // Loading states
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    username: string
  ) => Promise<void>;
  logout: () => void;
  setGuest: (name?: string) => void;
  clearError: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        isAuthenticated: false,
        isGuest: false,
        user: null,
        token: null,
        guestName: null,
        isLoading: false,
        error: null,

        // Actions
        login: async (email: string, password: string) => {
          set({ isLoading: true, error: null });

          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  identifier: email,
                  password,
                }),
              }
            );

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error?.message || "Login failed");
            }

            const data = await response.json();

            set({
              isAuthenticated: true,
              isGuest: false,
              user: data.user,
              token: data.jwt,
              guestName: null, // Clear guest name on login
              isLoading: false,
              error: null,
            });
          } catch (error) {
            set({
              isLoading: false,
              error: error instanceof Error ? error.message : "Login failed",
            });
            throw error;
          }
        },

        register: async (email: string, password: string, username: string) => {
          set({ isLoading: true, error: null });

          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username,
                  email,
                  password,
                }),
              }
            );

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(
                errorData.error?.message || "Registration failed"
              );
            }

            const data = await response.json();

            set({
              isAuthenticated: true,
              isGuest: false,
              user: data.user,
              token: data.jwt,
              guestName: null, // Clear guest name on registration
              isLoading: false,
              error: null,
            });
          } catch (error) {
            set({
              isLoading: false,
              error:
                error instanceof Error ? error.message : "Registration failed",
            });
            throw error;
          }
        },

        logout: () => {
          // Clear all auth state
          set({
            isAuthenticated: false,
            isGuest: false,
            user: null,
            token: null,
            guestName: null,
            error: null,
          });

          // Force redirect to homepage after state is cleared
          window.location.href = "/";
        },

        setGuest: (name?: string) => {
          set({
            isGuest: true,
            isAuthenticated: false,
            user: null,
            token: null,
            guestName: name || "Guest",
            error: null,
          });
        },

        clearError: () => {
          set({ error: null });
        },

        checkAuth: () => {
          const { token, isAuthenticated, isGuest } = get();

          if (token && !isAuthenticated) {
            set({ isAuthenticated: true });
          }

          if (!token && !isGuest && isAuthenticated) {
            set({
              isAuthenticated: false,
              user: null,
              token: null,
            });
          }
        },
      }),
      {
        name: "auth-store",
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          isGuest: state.isGuest,
          user: state.user,
          token: state.token,
          guestName: state.guestName,
        }),
      }
    ),
    { name: "auth-store" }
  )
);
