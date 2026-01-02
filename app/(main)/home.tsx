import { Button } from "@/components/ui/button";
import PatternList from "@/src/components/PatternList";
import { useTestContext } from "@/src/hooks/use-test-context";
import { Text, View } from "react-native";

export default function Home() {
      const { isAuthenticated, setIsAuthenticated } = useTestContext();
    
    return (
        <View>
            <Text>Main Home: home.tsx</Text>
            <PatternList></PatternList>
            <Button onPress={() => setIsAuthenticated(false)}></Button>
        </View>
    );
}