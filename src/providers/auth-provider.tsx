import { AuthContext } from "@/src/contexts/use-auth-context";
import { authService } from "@/src/services/auth";
import { PropsWithChildren, useEffect, useState } from "react";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);

  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

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
    // if (!session?.user?.id) {
    //   setProfile(null);
    //   setIsProfileLoading(false);
    //   return;
    // }

    // loadProfile(session.user.id);
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        session,
        profile,
        isLoading,
        isLoggedIn: !!session,
        signIn: ({ email, password }) => authService.signIn(email, password),
        signUp: ({ email, password }) => authService.signUp(email, password),
        signOut: () => authService.signOut(),
        resetPassword: (email) => authService.resetPassword(email),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
