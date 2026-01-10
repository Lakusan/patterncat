import AuthRequestModal from '@/src/components/AuthRequestModal';
import { Drawer } from 'expo-router/drawer';
import React, { useState } from "react";

export default function PublicLayout() {
    const [modalVisible, setModalVisible] = useState(false);
    console.log(`=> PublicLayout Web`);

    return (
        <>
            <AuthRequestModal
                isOpen={modalVisible}
                onClose={() => setModalVisible(false)}
            />

            <Drawer screenOptions={{ drawerType: "slide" }}>

                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: 'Home',
                        title: 'Public Home',
                    }}
                />

                <Drawer.Screen
                    name="search"
                    options={{
                        drawerLabel: 'Search',
                        title: 'Search',
                    }}
                    listeners={{
                        drawerItemPress: (e) => {
                            e.preventDefault();
                            setModalVisible(true);
                        },
                    }}
                />

                <Drawer.Screen
                    name="add"
                    options={{
                        drawerLabel: 'Add',
                        title: 'Add',
                    }}
                    listeners={{
                        drawerItemPress: (e) => {
                            e.preventDefault();
                            setModalVisible(true);
                        },
                    }}
                />

                <Drawer.Screen
                    name="settings"
                    options={{
                        drawerLabel: 'Settings',
                        title: 'settings',
                    }}
                    listeners={{
                        drawerItemPress: (e) => {
                            e.preventDefault();
                            setModalVisible(true);
                        },
                    }}
                />

                <Drawer.Screen
                    name='login'
                    options={{ drawerItemStyle: { display: 'none' } }}
                />
                       <Drawer.Screen
                    name='[id]'
                    options={{ drawerItemStyle: { display: 'none' } }}
                />
            </Drawer>
        </>
    );
}