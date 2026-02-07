import { AuthContext } from "@/src/contexts/use-auth-context";
import { authService } from "@/src/services/auth";
import { AuthSession } from "@/src/types/auth";
import { PropsWithChildren, useEffect, useState } from "react";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [profile, setProfile] = useState<any | null>(null);

  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isHydratingAuth, setIsHydratingAuth] = useState(true);

  const isLoading = isSessionLoading || isProfileLoading || isHydratingAuth;

  // Appstart: Session laden & Subscription auf Session-Änderungen
  useEffect(() => {
    authService.getSession().then((s) => {
      setSession(s);
      setIsSessionLoading(false);
      setIsHydratingAuth(false);
    });

    const unsubscribe = authService.onAuthStateChanged((s) => {
      setSession(s);
    });

    return unsubscribe;
  }, []);
  // Setzt das user Profile auf null wenn sich die Session ändert und kein user mehr da ist (z.B. nach Logout) -> Verhindert stale Profile Daten
  useEffect(() => {
    if (!session?.user?.id) {
      setProfile(null);
      return;
    }
    // TODO: UserService nutzen um Profil zu laden -> Kann sich unabhängig von Auth ändern, wuerde aber zum AuthFlow passen, eigener Provider zu viel 
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        session,
        profile,
        isLoading,
        isLoggedIn: !!session,
        signIn: (email, password) => authService.signIn(email, password),
        signUp: (email, password) => authService.signUp(email, password),
        signOut: () => authService.signOut(),
        resetPassword: (email) => authService.resetPassword(email),
      }}
    >
      {children}
    </AuthContext.Provider>

  );
}
