import { Stack } from 'expo-router';
import '../global.css';


import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';


export default function RootLayout() {
  return (
    
    <GluestackUIProvider mode="dark">
      <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: 'Back', // iOS text under arrow
        headerBackVisible: true, // ensure it shows
      }}
    >
      <Stack.Screen name="index" options={{ title: "Main Index" }} />
      <Stack.Screen name="[id]" options={{ title: "Dummy Article"}} />
    </Stack>
    </GluestackUIProvider>
  
  );

}
