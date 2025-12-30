import { useTestContext } from '@/src/hooks/use-test-context';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useState } from "react";

export default function PublicLayout() {
    const [modalVisible, setModalVisible] = useState(false);
    const { isAuthenticated } = useTestContext();
    if (!isAuthenticated) {
        console.log(`(main)/_layout.web.tsx: Redirect to Public, because of AuthState =>  ${isAuthenticated }`);
        router.replace("/(public)")
    }
    return (
        <>
            <Drawer screenOptions={{ drawerType: "slide" }}>

                <Drawer.Protected guard={isAuthenticated}>
                    <Drawer.Screen
                        name="home"
                        options={{
                            drawerLabel: 'Home',
                            title: 'MAIN Home',
                        }}
                    />
                </Drawer.Protected>

                <Drawer.Protected guard={isAuthenticated}>

                    <Drawer.Screen
                        name="search"
                        options={{
                            drawerLabel: 'Search',
                            title: 'Search',
                        }}
                    />
                </Drawer.Protected>

                <Drawer.Protected guard={isAuthenticated}>

                    <Drawer.Screen
                        name="add"
                        options={{
                            drawerLabel: 'Add',
                            title: 'Add',
                        }}
                    />
                </Drawer.Protected>

                <Drawer.Protected guard={isAuthenticated}>

                    <Drawer.Screen
                        name="settings"
                        options={{
                            drawerLabel: 'Settings',
                            title: 'settings',
                        }}
                    />
                </Drawer.Protected>

            </Drawer>
        </>
    );
}