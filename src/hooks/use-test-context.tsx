import { createContext, useContext } from "react";

export type TestContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

export const TestContext = createContext<TestContextType | null>(null);

export function useTestContext() {
    const ctx = useContext(TestContext);
    console.log("!==> TESTCONTEXT CHANGE")
    console.log(ctx)

  if (!ctx) throw new Error("useTestContext must be used inside TestProvider");
  return ctx;
}
