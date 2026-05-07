import { useTheme } from "@/src/contexts/use-theme-context";
import Feather from "@expo/vector-icons/Feather";
import { Text, TouchableOpacity, View } from "react-native";

export default function PatternEditor(){
    const { colors } = useTheme();
    return (
    <View className="bg-red-500">
        <View className="m-1 bg-secondary h-96 items-center justify-center">
           <TouchableOpacity className="flex-row bg-background rounded-3xl p-2 w-[150px] justify-evenly shadow">
            <Feather size={18} name="plus-circle" color={colors.text_primary}/>
            <Text>Bilder hochladen</Text>
           </TouchableOpacity>
        </View>
    </View>
    )
}