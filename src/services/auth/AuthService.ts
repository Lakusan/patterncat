export interface AuthService {
  getSession(): Promise<any | null>;
  onAuthStateChanged(cb: (session: any | null) => void): () => void;

  signIn(email: string, password: string): Promise<void>;
  signUp(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  resendPasswordConfirmation(email: string): Promise<void>;
  resetPassword(email: string): Promise<void>;
}
