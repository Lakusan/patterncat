import { AlertContext } from "@/src/contexts/use-alert-context";
import { useContext } from "react";

export function useAlert() {
  return useContext(AlertContext);
}
