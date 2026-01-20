import { useAuthContext } from '@/src/contexts/use-auth-context'
import { SplashScreen } from 'expo-router'

SplashScreen.preventAutoHideAsync()

export function SplashScreenController() {
  const { isLoading } = useAuthContext()
  // if (!isloading) :> Hide Splash Screen until loading is done
  if (isLoading) {
    SplashScreen.hideAsync()
  }

  return null
}