import type { AlertOptions } from "@/src/providers/alert-provider";
import { createContext } from "react";

export interface AlertContextValue {
    show: (options: AlertOptions) => void;
    hide: () => void;

    info: (message: string, title?: string) => void;
    success: (message: string, title?: string) => void;
    error: (message: string, title?: string) => void;
    warning: (
        message: string,
        onConfirm: () => void | Promise<void>,
        title?: string
    ) => void;
    confirm: (
        message: string,
        onConfirm: () => void | Promise<void>,
        title?: string
    ) => void;
}

export const AlertContext = createContext<AlertContextValue>({
    show: () => { },
    hide: () => { },
    info: () => { },
    success: () => { },
    error: () => { },
    warning: () => { },
    confirm: () => { },
});
