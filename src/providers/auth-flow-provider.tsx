import { AuthFlowContext, AuthFlowState } from "@/src/contexts/use-auth-flow-context";
import { useState } from "react";

import AuthRequestModal from "@/src/components/modals/AuthRequestModal";
import LoginModal from "@/src/components/modals/LoginModal";
import RegisterModal from "@/src/components/modals/RegisterModal";
import { useAlert } from "@/src/hooks/useAlert";
import { router } from "expo-router";
import PasswordResetModal from "../components/modals/PasswordResetModal";
import { useAuthContext } from "../contexts/use-auth-context";

// UI Flow State Machine AuthFlow
// error handling -> useAlerts

export function AuthFlowProvider({ children }: { children: React.ReactNode }) {

    // Auth Context
    const { signIn, signOut, signUp, resetPassword } = useAuthContext();
    const alert = useAlert();

    const [state, setState] = useState<AuthFlowState>("closed");

    const openAuth = () => setState("auth");
    const openLogin = () => setState("login");
    const openRegister = () => setState("register");
    const openPasswordReset = () => setState("reset");
    const close = () => setState("closed");
    // Native Varianten
    const openAuthNative = () => setState("auth");
    const closeAuthNative = () => setState("closed");

    return (
        <AuthFlowContext.Provider
            value={{ state, openAuth, openLogin, openRegister, openPasswordReset, close, openAuthNative, closeAuthNative }}
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
                onConfirm={async (email: string, password: string) => {
                    try {
                        await signIn(email, password)
                        close()
                        router.replace("/(main)/home")
                    } catch (err: any) {
                        if (err?.status === 400 && err?.message === "Invalid login credentials") {
                            alert.warning("E-Mail oder Passwort ist falsch.", alert.hide);
                            return;
                        }

                        if (err?.status === 429) {
                            alert.warning("Zu viele Versuche. Bitte warte einen Moment.", alert.hide);
                            return;
                        }
                        alert.warning("Ein unbekannter Fehler ist aufgetreten.", alert.hide);
                    } 
                }
                }
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
                onBack={() => setState("login")}
                onConfirm={() => {
                    setState("auth");
                }}
            />

        </AuthFlowContext.Provider>
    );
}


