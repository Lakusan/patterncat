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
  profile: any;
  isLoading: boolean;
  isLoggedIn: boolean;

  // Auth-Funktionen -> Mapping dann auf Service Level
  // -> /src/services/authService.ts als Interfaces und Implementierung in /src/services/supabaseAuthService.ts
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resendConfirmation: (email: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};
