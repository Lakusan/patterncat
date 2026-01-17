import { Session } from "@supabase/supabase-js";

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
