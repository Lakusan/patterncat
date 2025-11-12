import { Button, Text, View } from "react-native";
 
export default function LoginScreen() {

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-9xl font-bold text-blue-500">
        Welcome to Patterncat 🐱
      </Text>
      <Button title="LoginButton" onPress={() =>console.log("Pressed")}/>
    </View> 
  );
}