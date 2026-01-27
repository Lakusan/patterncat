import { useAuthContext } from '@/src/contexts/use-auth-context';
import { Drawer } from 'expo-router/drawer';
import React, { useState } from "react";

export default function PublicLayout() {
    const [modalVisible, setModalVisible] = useState(false);
    const { isLoggedIn } = useAuthContext();
    return (
        <>
            <Drawer screenOptions={{ drawerType: "slide" }}>

                <Drawer.Protected guard={isLoggedIn}>
                    <Drawer.Screen
                        name="home"
                        options={{
                            drawerLabel: 'Home',
                            title: 'MAIN Home',
                        }}
                    />
                </Drawer.Protected>

                <Drawer.Protected guard={isLoggedIn}>

                    <Drawer.Screen
                        name="search"
                        options={{
                            drawerLabel: 'Search',
                            title: 'Search',
                        }}
                    />
                </Drawer.Protected>

                <Drawer.Protected guard={isLoggedIn}>

                    <Drawer.Screen
                        name="add"
                        options={{
                            drawerLabel: 'Add',
                            title: 'Add',
                        }}
                    />
                </Drawer.Protected>

                <Drawer.Protected guard={isLoggedIn}>

                    <Drawer.Screen
                        name="settings"
                        options={{
                            drawerLabel: 'Settings',
                            title: 'settings',
                        }}
                    />
                </Drawer.Protected>
                <Drawer.Screen
                    name='[id]'
                    options={{ drawerItemStyle: { display: 'none' } }}
                />

            </Drawer>
        </>
    );
}