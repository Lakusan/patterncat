import { BREAKPOINTS } from "@/src/constants/ui/breakpoints";
import { useAuthFlow } from '@/src/contexts/use-auth-flow-context';
import { Tabs } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Platform, useWindowDimensions } from "react-native";

export default function PublicLayout() {
 const authFlow = useAuthFlow();

  const { width } = useWindowDimensions(); 

  const isWeb = Platform.OS === "web";
  const isDesktop = isWeb && width >= BREAKPOINTS.DESKTOP;
  const isTablet = !isWeb && width >= BREAKPOINTS.TABLET;
  // WEB / DESKTOP → Drawer
  if (isDesktop) {
    console.log("Rendering Drawer Navigation (Desktop/Web)");
    return (
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
            authFlow.openAuth();
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
            authFlow.openAuth();
          },
        }}
      />

      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Settings',
          title: 'Settings',
        }}
        listeners={{
          drawerItemPress: (e) => {
            e.preventDefault();
            authFlow.openAuth();
          },
        }}
      />

      <Drawer.Screen
        name='[id]'
        options={{ drawerItemStyle: { display: 'none' } }}
      />

      <Drawer.Screen
        name='login'
        options={{ drawerItemStyle: { display: 'none' } }}
      />
    </Drawer>
  );
  }

  // SMARTPHONE + TABLET → Tabs
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="add" />
      <Tabs.Screen name="login" />
    </Tabs>
  );
}
