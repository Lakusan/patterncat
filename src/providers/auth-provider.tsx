import { AuthContext } from "@/src/hooks/use-auth-context";
import { supabase } from "@/src/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { PropsWithChildren, useEffect, useState } from "react";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //
  // 1. Load session on app start + subscribe to changes
  //
  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      setIsLoading(true);

      const { data, error } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error("Error fetching session:", error);
      }

      setSession(data.session ?? null);
      setIsLoading(false);
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        console.log("Auth state changed:", { event: _event, session: newSession });
        setSession(newSession);
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  //
  // 2. Fetch profile when session changes
  //
  // useEffect(() => {
  //   const loadProfile = async () => {
  //     setIsLoading(true);

  //     if (session?.user?.id) {
  //       const { data, error } = await supabase
  //         .from("profiles")
  //         .select("*")
  //         .eq("id", session.user.id)
  //         .single();

  //       if (error) {
  //         console.error("Error loading profile:", error);
  //       }

  //       setProfile(data ?? null);
  //     } else {
  //       setProfile(null);
  //     }

  //     setIsLoading(false);
  //   };

  //   loadProfile();
  // }, [session]);

  //
  // 3. Auth actions
  //
  const signIn = async ({ email, password }: { email: string; password: string }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  };

  const signUp = async ({ email, password }: { email: string; password: string }) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Signup error:", error.message);
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "/(public)",
    });

    if (error) {
      console.error("Password reset error:", error.message);
      throw error;
    }
  };

  //
  // 4. Provide everything to the app
  //
  return (
    <AuthContext.Provider
      value={{
        session,
        profile,
        isLoading,
        isLoggedIn: session !== null,

        // actions
        signIn,
        signUp,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
