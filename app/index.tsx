import { Redirect } from "expo-router";
import { Platform } from "react-native";

export default function Index() {
  const isWeb = Platform.OS === "web";
  return isWeb ? <Redirect href="/(web)" /> : <Redirect href="/(mobile)" />;
}