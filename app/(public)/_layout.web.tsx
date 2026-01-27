import { useAuthFlow } from '@/src/contexts/use-auth-flow-context';
import { Drawer } from 'expo-router/drawer';
import React from "react";

export default function PublicLayout() {
  const authFlow = useAuthFlow();

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
