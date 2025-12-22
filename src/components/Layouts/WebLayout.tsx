// components/WebLayout.tsx
import { Drawer } from "expo-router/drawer";

export default function WebLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="home" options={{ title: "Home" }} />
      <Drawer.Screen name="profile" options={{ title: "Profile" }} />
      <Drawer.Screen name="settings" options={{ title: "Settings" }} />
    </Drawer>
  );
}
