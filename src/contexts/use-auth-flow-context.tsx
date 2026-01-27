import { createContext, useContext } from "react";

export type AuthFlowState = 
    | "closed"
    | "auth"
    | "login"
    | "register";

export interface AuthFlowContextValue {
    state: AuthFlowState;
    openAuth: () => void;
    openLogin: () => void;
    openRegister: () => void;
    close: () => void;
}

export const AuthFlowContext = createContext<AuthFlowContextValue | null>(null);

export const useAuthFlow = () => {
    const ctx = useContext(AuthFlowContext);
    if(!ctx) throw new Error("useAuthFLow must be used inside AuthFlowProvider");
    return ctx;
};