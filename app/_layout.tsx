import { Stack } from "expo-router";
import '../global.css';

export default function RootLayout() {
  
  // const user = true; 

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* {user ? (
        <Stack.Screen name="(auth)" />
      ) : (
        <Stack.Screen name="(anon)" />
      )} */}
    </Stack>
  );
}
