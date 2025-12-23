// app/(public)/(tabs)/_layout.native.tsx
import AuthRequestModal from "@/src/components/AuthRequestModal";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { useState } from "react";

export default function TabsLayout() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <AuthRequestModal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Feather size={28} name="home" color={color} />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setModalVisible(true);
            },
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
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setModalVisible(true);
            },
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
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setModalVisible(true);
            },
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
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setModalVisible(true);
            },
          }}
        />
      </Tabs>
    </>
  );
}
