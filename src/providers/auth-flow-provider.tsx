import { AuthFlowContext, AuthFlowState } from "@/src/contexts/use-auth-flow-context";
import { useState } from "react";

import AuthRequestModal from "@/src/components/modals/AuthRequestModal";
import LoginModal from "@/src/components/modals/LoginModal";
import RegisterModal from "@/src/components/modals/RegisterModal";
import PasswordResetModal from "../components/modals/PasswordResetModal";

export function AuthFlowProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthFlowState>("closed");

    const openAuth = () => setState("auth");
    const openLogin = () => setState("login");
    const openRegister = () => setState("register");
    const openPasswordReset = () => setState("reset");
    const close = () => setState("closed");

    return (
        <AuthFlowContext.Provider
            value={{ state, openAuth, openLogin, openRegister, openPasswordReset, close }}
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
                onPasswordReset={() => setState("reset")}
            />

            <RegisterModal
                isOpen={state === "register"}
                onClose={close}
                onBack={() => setState("auth")}
                onSuccess={() => setState("login")}
            />

            <PasswordResetModal
                isOpen={state === "reset"}
                onClose={close}
                onBack={()=> setState("login")}
                onConfirm={() => {console.log("confirm authflowcontroller")}}
            />

        </AuthFlowContext.Provider>
    );
}
