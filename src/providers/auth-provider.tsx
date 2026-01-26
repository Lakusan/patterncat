import { AuthContext } from "@/src/contexts/use-auth-context";
import { supabase } from "@/src/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { PropsWithChildren, useEffect, useState } from "react";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);

  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  const isLoading = isSessionLoading || isProfileLoading;

  // try to fetch session once while component loads -> []
  // if supabase doesnt return ression -> public route only 
  useEffect(() => {
    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setSession(data.session ?? null);
      if (error) {
        console.error("Error fetching session:", error);
      }
      
      console.log(`>>> Auth-Provider: loadSession -> SessionData: ${JSON.stringify(data)}`);
      setIsSessionLoading(false);
    };

    loadSession();
    // creates state listener for session with supabase -> if backend session state changes -> local session state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {

        console.log("Auth state changed:", { event: _event, session: newSession });
        // only app state changes -> storage ?
        setSession(newSession);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // No Session no Profile Fetch
    const loadProfile = async () => {
      setIsProfileLoading(true);
      if (!session?.user?.id) {
        setProfile(null);
        setIsProfileLoading(false);
        console.log(`>>> AuthProvider: Profile: NO PROFILE FOUND; Profile is: ${profile}`);
        return;
      }
      // If session -> Fetch from profiles table
      const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session?.user.id)
      .single();
      if(error) {
        console.error("Patterncat: Error loading profile");
      }
      console.log(`>>> AuthProvider: Profile ${data}`);
      setProfile(data ?? null);
      setIsProfileLoading(false)
    };

    loadProfile();
  }, [session]);

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

  return (
    <AuthContext.Provider
      value={{
        session,
        profile,
        isLoading,
        isLoggedIn: !!session,
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
