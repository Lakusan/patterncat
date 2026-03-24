import { Timestamp } from "react-native-reanimated/lib/typescript/commonTypes";

// interfaces für AuthUser -> Vorlage für VendorAuthUser => Bspw. Supabase | Firebase etc.
export interface AuthUser {
  id: string;
  email: string;
}

// AuthData: zentrale Schnittstelle für alle Auth-bezogenen Daten und Funktionen
export interface AuthSession {
  user: AuthUser | null;
  accessToken?: string;
}

// Type AuthData: als type, da essentiell für App-Logik
export type AuthData = {
  session: AuthSession | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  userId: string | null;

  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resendConfirmation: (email: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

// UserProfile Type
export type UserProfile = {
  id: string;
  updates_at: Timestamp;
  username: string;
  full_name: string;
  avatar_url: string;
  website: string;
  dsgvo_accepted_at: Date;
  gtc_accepted_at: Date;
}
