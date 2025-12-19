import { Drawer } from "expo-router/drawer";

export default function PublicMobileLayout() {
    return (
        <Drawer screenOptions={{
            drawerType: "permanent",
            drawerStyle: { width: 260 },
            headerShown: false,
        }}>
        </Drawer>
    );
}