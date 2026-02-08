import { Button } from "@/components/ui/button";
import { BREAKPOINTS } from "@/src/constants/ui/breakpoints";
import { useAuthFlow } from '@/src/contexts/use-auth-flow-context';
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import React from "react";
import { Platform, useWindowDimensions } from "react-native";

export default function PublicLayout() {
  const authFlow = useAuthFlow();

  const { width } = useWindowDimensions();

  const isWeb = Platform.OS === "web";
  const isAndroid = Platform.OS === "android";
  const isIOS = Platform.OS === "ios";
  const isDesktop = isWeb && width >= BREAKPOINTS.DESKTOP;
  // WEB / DESKTOP → Expo/React-Native Drawer mit JS
  if (isDesktop) {
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

  // SMARTPHONE + TABLET Dimensions on Web → Expor/RN Tabs
  if (isWeb) {

    return (
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="index"
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
          listeners={{
            tabPress: (e) => {
              authFlow.openAuth();
              e.preventDefault();
            },
          }}
        />
        <Tabs.Screen name="add"
          options={{
            title: "Add",
            tabBarIcon: ({ color }) => (
              <Feather size={28} name="plus" color={color} />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              authFlow.openAuth();
              e.preventDefault();
            },
          }}
        />
        <Tabs.Screen name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <Feather size={28} name="user" color={color} />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              authFlow.openAuth();
              e.preventDefault();
            },
          }}
        />
        <Tabs.Screen name="[id]" options={{
          headerShown: true,
          title: "",
          tabBarButton: () => <Button></Button>, // Hides the tab bar button
          tabBarItemStyle: { display: 'none' }
        }} />
        <Tabs.Screen name="login" options={{ tabBarItemStyle: { display: 'none' } }} />
      </Tabs>
    );
  }
  // Sollte IOS native stuff zurueck geben, aber IOS Glass icons muessen wohl betachtet werden
  if (isIOS) {

    return (
      <></>
      // <NativeTabs
      // labelStyle={{
      //   // For the text color
      //   color: DynamicColorIOS({
      //     dark: 'white',
      //     light: 'black',
      //   }),
      // }}
      // // For the selected icon color
      // tintColor={DynamicColorIOS({
      //   dark: 'white',
      //   light: 'black',
      // })}>
      //   <NativeTabs.Trigger name="index">
      //     <Icon sf={{ default: 'house', selected: 'house.fill' }} drawable="custom_home_drawable" />
      //   </NativeTabs.Trigger>
      //   <NativeTabs.Trigger name="settings">
      //     <Icon sf={{ default: 'gearshape', selected: 'gearshape.fill' }} drawable="custom_settings_drawable" />
      //   </NativeTabs.Trigger>
      // </NativeTabs>
    );
  }
  // Native TabBar fuer Android
  // sf IOS Icons direkt vom iOS 
  // drawable Android Icons aus android/app/src/res/drawable
  // Von googles Material Design Icons -> Selbst ablegen, daher android/app/src/res/drawable/<MaterialIconName>*.xml -> Github
  // liegen aktuell in assets/android -> kopieren in android/app/src/res/drawable nach repbuild --clean
  // Nur angelegte Routen werden angezeigt und gerendert; keine danebenliegenden wie mit RN Tabs
  return (
    <NativeTabs >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
           <Icon drawable="home_24px" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="add">
        <Icon drawable="add_24px" />
        <Label>Add</Label>
      </NativeTabs.Trigger>
            <NativeTabs.Trigger name="search">
        <Icon drawable="search_24px" />
        <Label>Search</Label>
      </NativeTabs.Trigger>
            <NativeTabs.Trigger name="settings">
        <Icon drawable="settings_account_box_24px" />
        <Label>Settings</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}