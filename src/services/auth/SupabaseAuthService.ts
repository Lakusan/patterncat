import { supabase } from "@/src/lib/supabase";
import { AuthService } from "./AuthService";

export const supabaseAuthService: AuthService = {
  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session ?? null;
  },

  onAuthStateChanged(cb) {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      cb(session ?? null);
    });
    return () => data.subscription.unsubscribe();
  },

  async signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  },

  async signUp(email, password) {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "/(public)",
    });
    if (error) throw error;
  },
};
