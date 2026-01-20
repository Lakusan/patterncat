import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from '@/components/ui/vstack';
import { useAlert } from "@/src/hooks/useAlert";
import { View } from "react-native";

export default function LoginPage() {
    const alert = useAlert();


    return (
        <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
            <VStack space="md">

                <Button onPress={() => alert.info("Dies ist ein Info-Alert")}>
                    <ButtonText>Info Alert</ButtonText>
                </Button>

                <Button onPress={() => alert.success("Aktion erfolgreich!")}>
                    <ButtonText>Success Alert</ButtonText>
                </Button>

                <Button onPress={() => alert.error("Etwas ist schiefgelaufen!")}>
                    <ButtonText>Error Alert</ButtonText>
                </Button>

                <Button
                    onPress={() =>
                        alert.confirm("Willst du das wirklich tun?", () => {
                            console.log("Bestätigt");
                        })
                    }
                >
                    <ButtonText>Confirm Alert</ButtonText>
                </Button>

                <Button
                    onPress={() =>
                        alert.show({
                            title: "Custom Alert",
                            message: "Dies ist ein komplett benutzerdefinierter Alert.",
                            actions: [
                                {
                                    label: "Abbrechen",
                                    variant: "outline",
                                    onPress: () => alert.hide(),
                                },
                                {
                                    label: "OK",
                                    variant: "solid",
                                    onPress: () => console.log("OK gedrückt"),
                                },
                            ],
                        })
                    }
                >
                    <ButtonText>Custom Alert</ButtonText>
                </Button>

            </VStack>
        </View>
    );
}