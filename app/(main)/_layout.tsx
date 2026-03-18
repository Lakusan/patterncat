import { Button } from "@/components/ui/button";
import { BREAKPOINTS } from "@/src/constants/ui/breakpoints";
import { useAuthFlow } from '@/src/contexts/use-auth-flow-context';
import { useTheme } from "@/src/contexts/use-theme-context";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { Platform, useWindowDimensions } from "react-native";

export default function MainLayout() {
  const authFlow = useAuthFlow();

  const { width } = useWindowDimensions();

  const isWeb = Platform.OS === "web";
  const isDesktop = isWeb && width >= BREAKPOINTS.DESKTOP;
  const { colors, theme } = useTheme();

  // WEB / DESKTOP → Expo/React-Native Drawer mit JS
  if (isDesktop) {
    return (
      <Drawer 
       screenOptions={{
        /**
         * HEADER-BEREICH (oben)
         */

        // Hintergrundfarbe Headers
        headerStyle: {
          backgroundColor: colors.background,
        },

        // Farbe des Header-Titels und Icons
        headerTintColor: colors.text_primary,

        /**
         * DRAWER-HINTERGRUND
         */

        // Hintergrund des gesamten Drawer-Menüs
        drawerStyle: {
          backgroundColor: colors.background,
        },

        // Hintergrund des Scrollbereichs im Drawer
        drawerContentStyle: {
          backgroundColor: colors.background,
        },

        /**
         * DRAWER-TEXT & ICON-FARBEN
         */

        // Text- und Iconfarbe für das aktive Menü-Item
        drawerActiveTintColor: colors.text_secondary,

        // Text- und Iconfarbe für inaktive Menü-Items
        drawerInactiveTintColor: colors.text_primary,

        /**
         * DRAWER-AKTIV-STATUS
         */

        // Hintergrundfarbe des aktiven Menü-Items
        drawerActiveBackgroundColor: colors.primary,

        // Hintergrundfarbe für inaktive Items
        drawerInactiveBackgroundColor: "transparent",

        sceneStyle: {
          backgroundColor: colors.background
        }
      }}
        >
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
          }}
        />

        <Drawer.Screen
          name="search"
          options={{
            drawerLabel: 'Search',
            title: 'Search',
          }}
        />

        <Drawer.Screen
          name="add"
          options={{
            drawerLabel: 'Add',
            title: 'Add',
          }}
        />

        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: 'Settings',
            title: 'Settings',
          }}
        />

        <Drawer.Screen
          name='[id]'
          options={{ 
            drawerItemStyle: { display: 'none' },
          }}
        />

      </Drawer>
    );
  }

  // SMARTPHONE + TABLET Dimensions on Web → Expor/RN Tabs

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.accent,
      }}

    >
      <Tabs.Screen name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen name="add"
        options={{
          title: "Add",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="plus" color={color} />
          ),
        }}
      />
      <Tabs.Screen name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen name="[id]" options={{
        headerShown: false,
        tabBarButton: () => <Button></Button>, // Hides the tab bar button
        tabBarItemStyle: { display: 'none' }
      }} />
    </Tabs>
  );
}