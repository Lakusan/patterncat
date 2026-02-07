import { useAuthContext } from "@/src/contexts/use-auth-context";
import { ReactNode } from "react";

interface AuthGateProps {
  children: ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const { isLoading } = useAuthContext();

  // Blockiere nur während Auth lädt
  if (isLoading) return null;

  // Wenn Auth fertig ist → Router übernehmen lassen
  return children;
}
