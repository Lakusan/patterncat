import { Stack } from 'expo-router';
import '../global.css';


export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: 'Back', // iOS text under arrow
        headerBackVisible: true, // ensure it shows
      }}
    >
      <Stack.Screen name="index" options={{ title: "Main Index" }} />
      <Stack.Screen name="[dummy]" options={{ title: "Dummy Article" }} />
    </Stack>
  );

}
