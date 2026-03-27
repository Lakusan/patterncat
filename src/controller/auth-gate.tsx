import { useAuthContext } from "@/src/contexts/use-auth-context";
import { ReactNode } from "react";

interface AuthGateProps {
  children: ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const { isLoading } = useAuthContext();
  console.log(`AuthGate => isLoading: ${isLoading}`)

  // Blockiere nur während Auth lädt
  if (isLoading) return null;

  console.log(`AuthGate => return {children}`)
  // Wenn Auth fertig ist → Router übernehmen lassen
  console.log(`AuthGate => isLoading: ${isLoading}`)
  return children;
}
