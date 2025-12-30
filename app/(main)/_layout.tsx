import { useTestContext } from "@/src/hooks/use-test-context";
import Feather from "@expo/vector-icons/Feather";
import { router, Tabs } from "expo-router";
import { useState } from "react";

export default function PublicLayout() {
    const [modalVisible, setModalVisible] = useState(false);
    const { isAuthenticated } = useTestContext();
    if (!isAuthenticated) {
        router.replace("/(public)")
    }
    return (
        <>
            <Tabs screenOptions={{ headerShown: false }}>
                <Tabs.Protected guard={isAuthenticated}>

                    <Tabs.Screen
                        name="main"
                        options={{
                            title: "Home",
                            tabBarIcon: ({ color }) => (
                                <Feather size={28} name="home" color={color} />
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name="search"
                        options={{
                            title: "Search",
                            tabBarIcon: ({ color }) => (
                                <Feather size={28} name="search" color={color} />
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name="add"
                        options={{
                            title: "Add",
                            tabBarIcon: ({ color }) => (
                                <Feather size={28} name="plus" color={color} />
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name="settings"
                        options={{
                            title: "Settings",
                            tabBarIcon: ({ color }) => (
                                <Feather size={28} name="user" color={color} />
                            ),
                        }}
                    />

                </Tabs.Protected>

            </Tabs>
        </>
    );
}
