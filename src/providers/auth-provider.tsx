import { AuthContext } from "@/src/hooks/use-auth-context";
import { supabase } from "@/src/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { PropsWithChildren, useEffect, useState } from "react";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);

  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  const isLoading = isSessionLoading || isProfileLoading;

  //
  // 1. Load session on app start + subscribe to changes
  //
  useEffect(() => {
    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setSession(data.session ?? null);
      if (error) {
        console.error("Error fetching session:", error);
      }
      setIsSessionLoading(false);
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        console.log("Auth state changed:", { event: _event, session: newSession });
        setSession(newSession);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  //
  // 2. Fetch profile when session changes
  //
  useEffect(() => {
    // No Session no Profile Fetch
    const loadProfile = async () => {
      setIsProfileLoading(true);
      if (!session?.user?.id) {
        setProfile(null);
        setIsProfileLoading(false);
        return;
     }
    // If session -> Fetch
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session?.user.id)
      .single();
     if(error) {
      console.error("Patterncat: Error loading profile");
     }
      setProfile(data ?? null);
      setIsProfileLoading(false)
    };

    loadProfile();
  }, [session]);

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
        isLoggedIn: !!session,

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
