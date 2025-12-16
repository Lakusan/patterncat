import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import AuthRequest from "@/src/components/AuthModal";
import SafeAreaContainer from "@/src/components/SafeAreaContainer";
import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';
import { useState } from 'react';



export default function AnonLayout() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaContainer>
      <GluestackUIProvider mode="light">
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "purple",
            tabBarInactiveTintColor: "gray",
            headerShown: false
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <Feather size={28} name="home" color={color} />
              ),
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
                setModalVisible(true)
              }
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
                setModalVisible(true)
              }
            }}

          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color }) => (
                <Feather size={28} name="user" color={color} />
              ),
            }} listeners={{
              tabPress: (e) => {
                e.preventDefault();
                setModalVisible(true)
              }
            }}
          />
        </Tabs>
        <AuthRequest isOpen={modalVisible} onClose={() => setModalVisible(false)} />
      </GluestackUIProvider>
    </SafeAreaContainer>

  );

}
