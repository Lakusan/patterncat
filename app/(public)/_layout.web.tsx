import AuthRequestModal from '@/src/components/modals/AuthRequestModal';
import LoginModal from '@/src/components/modals/LoginModal';
import RegisterModal from '@/src/components/modals/RegisterModal';
import { Drawer } from 'expo-router/drawer';
import React, { useState } from "react";

export default function PublicLayout() {
  const [authModal, setAuthModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  // Helper: open auth modal from drawer
  const openAuthFlow = () => {
    setAuthModal(true);
    setLoginModal(false);
    setRegisterModal(false);
  };

  return (
    <>
      {/* AUTH REQUEST MODAL */}
      <AuthRequestModal
        isOpen={authModal}
        onClose={() => setAuthModal(false)}
        onLogin={() => {
          setAuthModal(false);
          setLoginModal(true);
        }}
        onRegister={() => {
          setAuthModal(false);
          setRegisterModal(true);
        }}
      />

      {/* LOGIN MODAL */}
      <LoginModal
        isOpen={loginModal}
        onClose={() => setLoginModal(false)}
        onBack={() => {
          setLoginModal(false);
          setAuthModal(true);
        }}
      />

      {/* REGISTER MODAL */}
      <RegisterModal
        isOpen={registerModal}
        onClose={() => setRegisterModal(false)}
        onBack={() => {
          setRegisterModal(false);
          setAuthModal(true);
        }}
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
              e.preventDefault();
              openAuthFlow();
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
              openAuthFlow();
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
              openAuthFlow();
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
