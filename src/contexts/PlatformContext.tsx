import { createContext, useMemo } from "react";
import { Platform } from "react-native";

export type PlatformContextType = {
    os: "ios" | "android" | "web";
    isWeb: boolean;
    isIOS: boolean;
    isAndroid: boolean;
    isNative: boolean;
    isMobile: boolean;
}

export const PlatformContext = createContext<PlatformContextType | null>(null);

export function PlatformProvider({ children }: { children: React.ReactNode }) {
    const os = Platform.OS as PlatformContextType["os"];
    console.log(os)
    const value: PlatformContextType = useMemo(() => {
        return {
            os, isWeb: os === "web",
            isIOS: os === "ios",
            isAndroid: os === "android",
            isNative: os === "ios" || os === "android", isMobile: os === "ios" || os === "android",
        };
    }, [os]);

    return (
        <PlatformContext.Provider value={value}>
            {children}
        </PlatformContext.Provider>
    );
}