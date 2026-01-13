import { Session } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

export type AuthData = {
  session: Session | null;
  profile: any | null;
  isLoading: boolean;
  isLoggedIn: boolean;

  // Auth actions
  signIn: (payload: { email: string; password: string }) => Promise<void>;
  signUp: (payload: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

export const AuthContext = createContext<AuthData>({
  session: null,
  profile: null,
  isLoading: true,
  isLoggedIn: false,

  // Default no-op functions (so context always has valid shape)
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
});

export const useAuthContext = () => useContext(AuthContext);
