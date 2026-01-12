import AuthRequestModal from '@/src/components/AuthRequestModal';
import { Drawer } from 'expo-router/drawer';
import React, { useState } from "react";

export default function PublicLayout() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <AuthRequestModal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
      />

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
              e.preventDefault();       // stop drawer navigation
              setModalVisible(true);    // show login modal
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
              setModalVisible(true);
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
              setModalVisible(true);
            },
          }}
        />

        {/* Hidden dynamic route */}
        <Drawer.Screen
          name='[id]'
          options={{ drawerItemStyle: { display: 'none' } }}
        />
        <Drawer.Screen
          name='login'
          options={{ drawerItemStyle: { display: 'none' } }}
        />
      </Drawer>
    </>
  );
}
