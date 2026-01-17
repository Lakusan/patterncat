import { Button } from "@/components/ui/button";
import PatternList from "@/src/components/PatternList";
import { useAuthContext } from "@/src/hooks/use-auth-context";
import { Text, View } from "react-native";

export default function Home() {
    const { isLoggedIn, signOut } = useAuthContext();

    return (
        <View>
            <Text>Main Home: home.tsx</Text>
            <Button onPress={() => {
                signOut()
                console.log("Sign out pressed from HOME screen")
            }}
                ></Button>

            <PatternList></PatternList>
        </View >
    );
}
