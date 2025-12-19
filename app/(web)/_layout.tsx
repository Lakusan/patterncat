import { Drawer } from "expo-router/drawer";

export default function PublicWebLayout() {
    return (
        <Drawer screenOptions={{
            drawerType: "slide",
            drawerStyle: { width: 260 },
            headerShown: true,
        }}>
            <Drawer.Screen
        name="index" 
        options={{
          drawerLabel: 'Home',
          title: 'overview',
        }}
      />
        </Drawer>
    );
}