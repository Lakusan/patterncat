import { AuthData } from "@/src/types/authTypes";
import { createContext, useContext } from "react";


export const AuthContext = createContext<AuthData>({
  session: null,
  profile: null,
  isLoading: true,
  isLoggedIn: false,

  // Default no-op functions (so context always has valid shape)
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
});

export const useAuthContext = () => useContext(AuthContext);
