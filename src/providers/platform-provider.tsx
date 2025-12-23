import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { createContext, useMemo } from 'react';
import { Dimensions, Platform } from 'react-native';

type PlatformInfo = {
    os: string;
    isAndroid: boolean;
    isIOS: boolean;
    deviceName: string | null;
    deviceType: Device.DeviceType | null;
    screenWidth: number;
    screenHeight: number;
    appVersion: string;
}


export const PlatformContext = createContext<PlatformInfo | null>(null);

export const PlatformProvider = ({children}: {children: React.ReactNode}) => {
    const { width, height } = Dimensions.get('window');
    
    const value = useMemo<PlatformInfo>(() => {
        return {
            os: Platform.OS,
            isAndroid: Platform.OS === 'android',
            isIOS: Platform.OS === 'ios',
            deviceName: Device.deviceName ?? null,
            deviceType: Device.deviceType ?? null,
            screenWidth: width,
            screenHeight: height,
            appVersion: Constants.expoConfig?.version ?? "unknown",
        }
    }, [ width, height]);

    return(
        <PlatformContext.Provider value={value}>
            {children}
        </PlatformContext.Provider>
    );
};