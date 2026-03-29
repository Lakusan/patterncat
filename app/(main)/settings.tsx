import { Button, ButtonText } from "@/components/ui/button";
import { Text } from '@/components/ui/text';
import { useAuthContext } from "@/src/contexts/use-auth-context";
import { View } from 'react-native';

export default function Settings(){
    const { signOut } = useAuthContext();

    return(
        <View className="bg-background flex-1 items-center justify-center">
            <Text>MAIN: settings</Text>
            <Button 
            className="bg-primary"
            variant="solid"
            onPress={() => {
                    signOut()
            }}>
                <ButtonText>SignOut</ButtonText>
            </Button>
            
        </View >
    );
}