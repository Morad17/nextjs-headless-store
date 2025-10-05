import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
}

interface AuthState {
  user: User | null;
  jwt: string | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  guestName: string | null;
  login: (identifier: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  setGuestUser: (name: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      jwt: null,
      isAuthenticated: false,
      isGuest: false,
      guestName: null,

      login: async (identifier: string, password: string) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                identifier,
                password,
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            set({
              user: data.user,
              jwt: data.jwt,
              isAuthenticated: true,
            });
            return true;
          }
          return false;
        } catch (error) {
          console.error("Login error:", error);
          return false;
        }
      },

      register: async (username: string, email: string, password: string) => {
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

          if (response.ok) {
            const data = await response.json();
            set({
              user: data.user,
              jwt: data.jwt,
              isAuthenticated: true,
            });
            return true;
          }
          return false;
        } catch (error) {
          console.error("Registration error:", error);
          return false;
        }
      },

      setGuestUser: (name: string) => {
        set({
          user: null,
          jwt: null,
          isAuthenticated: false,
          isGuest: true,
          guestName: name,
        });
      },

      logout: () => {
        set({
          user: null,
          jwt: null,
          isAuthenticated: false,
          isGuest: false,
          guestName: null,
        });
      },

      checkAuth: async () => {
        const { jwt } = get();
        if (!jwt) return;

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );

          if (response.ok) {
            const user = await response.json();
            set({ user, isAuthenticated: true });
          } else {
            // Token is invalid
            set({ user: null, jwt: null, isAuthenticated: false });
          }
        } catch (error) {
          console.error("Auth check error:", error);
          set({ user: null, jwt: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
