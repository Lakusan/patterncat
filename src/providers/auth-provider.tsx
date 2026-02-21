import { AuthContext } from "@/src/contexts/use-auth-context";
import { authService } from "@/src/services/auth";
import { AuthSession } from "@/src/types/auth";
import { PropsWithChildren, useEffect, useState } from "react";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [profile, setProfile] = useState<any | null>(null);

  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  const isLoading = isSessionLoading || isProfileLoading;

  useEffect(() => {
    authService.getSession().then((s) => {
      setSession(s);
      setIsSessionLoading(false);
    });

    const unsubscribe = authService.onAuthStateChanged((s) => {
      setSession(s);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!session?.user?.id) {
      setProfile(null);
      return;
    }
  }, [session]);

  const userId = session?.user?.id ?? null;

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        userId,
        isLoggedIn: !!session,
        signIn: (email, password) => authService.signIn(email, password),
        signUp: (email, password) => authService.signUp(email, password),
        signOut: () => authService.signOut(),
        resendConfirmation: (email) => authService.resendPasswordConfirmation(email),
        resetPassword: (email) => authService.resetPassword(email),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

