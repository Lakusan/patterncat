import { Button, ButtonText } from "@/components/ui/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";

// -------------------------------
// Storage Helpers (Web + Native)
// -------------------------------

async function getAllStorageKeys(): Promise<readonly string[]> {
  if (Platform.OS === "web") {
    return Object.keys(localStorage);
  }
  return await AsyncStorage.getAllKeys();
}

async function getStorageValue(key: string): Promise<string | null> {
  if (Platform.OS === "web") {
    return localStorage.getItem(key);
  }

  const secure = await SecureStore.getItemAsync(key);
  if (secure !== null) return secure;

  return AsyncStorage.getItem(key);
}

async function getFullStorageDump(): Promise<Record<string, string | null>> {
  if (Platform.OS === "web") {
    return { ...localStorage };
  }

  const keys = await AsyncStorage.getAllKeys();
  const entries = await AsyncStorage.multiGet(keys);

  const result: Record<string, string | null> = {};
  entries.forEach(([key, value]) => {
    result[key] = value;
  });

  return result;
}

// -------------------------------
// Debug Storage Page Component
// -------------------------------

export default function StorageDebug() {
  const [keys, setKeys] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [fullDump, setFullDump] = useState<Record<string, string | null> | null>(null);

  useEffect(() => {
    loadKeys();
  }, []);

  const loadKeys = async () => {
    const k = await getAllStorageKeys();
    setKeys(k);
    console.log("Storage Keys:", k);
  };

  const loadValue = async () => {
    if (!selectedKey) return;
    const v = await getStorageValue(selectedKey);
    setSelectedValue(v);
    console.log(`Value for key "${selectedKey}":`, v);
  };

  const loadDump = async () => {
    const dump = await getFullStorageDump();
    setFullDump(dump);
    console.log("Full Storage Dump:", dump);
  };

  return (
    <ScrollView className="p-5">
      <Text className="text-2xl font-bold mb-4">Debug Storage Page</Text>

      {/* Print all keys */}
      <Button onPress={loadKeys}>
        <ButtonText>Print Keys</ButtonText>
      </Button>

      <Text className="mt-4 font-bold">Keys:</Text>

      {/* Render keys as pressable list */}
      <View className="mt-2">
        {keys.map((k) => (
          <Pressable
            key={k}
            onPress={() => setSelectedKey(k)}
            className={`p-3 my-1 rounded-md ${
              selectedKey === k ? "bg-green-400" : "bg-gray-200"
            }`}
          >
            <Text selectable>{k}</Text>
          </Pressable>
        ))}
      </View>

      {/* Print selected key */}
      <Button onPress={loadValue} className="mt-4">
        <ButtonText>Print Selected Key</ButtonText>
      </Button>

      <Text className="mt-4 font-bold">Selected Key:</Text>
      <Text selectable>{selectedKey ?? "None selected"}</Text>

      <Text className="mt-4 font-bold">Selected Value:</Text>
      <Text selectable>{JSON.stringify(selectedValue, null, 2)}</Text>

      {/* Print full dump */}
      <Button onPress={loadDump} className="mt-6">
        <ButtonText>Print Full Storage Dump</ButtonText>
      </Button>

      <Text className="mt-4 font-bold">Full Dump:</Text>
      <Text selectable>{JSON.stringify(fullDump, null, 2)}</Text>
    </ScrollView>
  );
}
