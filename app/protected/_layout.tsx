
import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerPosition: "right",
        headerShown: true
      }}>
      <Drawer.Screen
        name="index"
        options={{ title: "Home" }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="userprofile"
        options={{ title: "Profile" }}
      ></Drawer.Screen>
    </Drawer>
  );
}
