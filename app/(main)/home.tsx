import { Button } from "@/components/ui/button";
import PatternList from "@/src/components/PatternList";
import { useAuthContext } from "@/src/hooks/use-auth-context";
import { Text, View } from "react-native";

export default function Home() {
      const { isLoggedIn } = useAuthContext();
    
    return (
        <View>
            <Text>Main Home: home.tsx</Text>
            <Button onPress={() => console.log("Login Button Pressed from MAIN")}></Button>
            <PatternList></PatternList>
        </View>
    );
}