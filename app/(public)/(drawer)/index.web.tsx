// app/(public)/(drawer)/_layout.web.tsx
import Drawer from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerType: "slide",
        drawerStyle: { width: 260 },
        headerShown: true,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Home",
          title: "Overview",
        }}
      />
    </Drawer>
  );
}
