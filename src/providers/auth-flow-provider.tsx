import { AuthFlowContext, AuthFlowState } from "@/src/contexts/use-auth-flow-context";
import { useState } from "react";

import AuthRequestModal from "@/src/components/modals/AuthRequestModal";
import LoginModal from "@/src/components/modals/LoginModal";
import RegisterModal from "@/src/components/modals/RegisterModal";

export function AuthFlowProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthFlowState>("closed");

    const openAuth = () => setState("auth");
    const openLogin = () => setState("login");
    const openRegister = () => setState("register");
    const close = () => setState("closed");

    return (
        <AuthFlowContext.Provider
            value={{ state, openAuth, openLogin, openRegister, close }}
        >
            {children}

            <AuthRequestModal
                isOpen={state === "auth"}
                onClose={close}
                onLogin={() => setState("login")}
                onRegister={() => setState("register")}
            />

            <LoginModal
                isOpen={state === "login"}
                onClose={close}
                onBack={() => setState("auth")}
            />

            <RegisterModal
                isOpen={state === "register"}
                onClose={close}
                onBack={() => setState("auth")}
                onSuccess={() => setState("login")}
            />

        </AuthFlowContext.Provider>
    );
}
