import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, View } from "react-native";

// mobile 2 columns | web 4

type Item = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
};

interface FlatListConfig {
  numColumns: number
}

interface ViewConfig {
  className: string
}

interface PlatformConfig {
  view: ViewConfig
  flatlist: FlatListConfig
}


export default function PatternList(sytling: string) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const UI_CONFIG: { 
    web: PlatformConfig;
    mobile: PlatformConfig } = { web: { view: { className: "max-w-4xl mx-auto p-10 bg-gray-100 rounded-xl" }, flatlist: { numColumns: 5 } }, mobile: { view: { className: "p-4 bg-white" }, flatlist: { numColumns: 2 } } }


  // TODO: Beim Start der App dynamisch aus DB zeihen
  const categories = ["Kleider", "Hosen", "Oberteile", "Jacken"];
  // DEV
  function getRandomCategory(): string {
    const index = Math.floor(Math.random() * categories.length);
    return categories[index];
  }

  const items: Item[] = Array.from({ length: 200 }, (_, i) => ({
    id: `${i + 1}`,
    title: `Muster ${i + 1}`,
    description: `Das ist eine Beschreibung für Muster ${i + 1}.`,
    image: `https://picsum.photos/seed/pattern${i + 1}/300/200`,
    category: getRandomCategory(),
  }));
  // ------
  // Filter Logic
  const filteredItems =
    selectedCategory === null
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const renderItem = ({ item }: { item: Item }) => (
    <Card size="md" variant="ghost">
      <Link href="/details/[id]">
        <Image
          source={{ uri: item.image }}
          className="w-full h-[160px] rounded-md"
          alt="image"
        />
        <Text className="text-xs font-normal mt-2 text-typography-700">
          {item.description}
        </Text>
        <Heading size="sm" className="mt-2">
          {item.title}
        </Heading>
      </Link>
    </Card>
  );
  return (
    <View className="flex-1 justify-center items-center">
      {/* Category Chips */}
      <View className="flex-row w-full gap-4 p-2">
        {/* "All" chip */}
        <Pressable
          onPress={() => setSelectedCategory(null)}
          className={`flex-1 rounded ${selectedCategory === null
            ? "bg-purple-800"
            : "bg-gray-200"
            }`}
        >
          <Text
            className={`text-sm text-center ${selectedCategory === null
              ? "text-white font-semibold"
              : "text-gray-700"
              }`}
          >
            Alle
          </Text>
        </Pressable>

        {/* Category chips */}
        {categories.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            className={`flex-1 rounded ${selectedCategory === cat
              ? "bg-purple-800"
              : "bg-gray-200"
              }`}
          >
            <Text
              className={`text-sm text-center ${selectedCategory === cat
                ? "text-white font-semibold"
                : "text-gray-700"
                }`}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>
      {items && items.length > 0 ? (
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={5}
          className="flex-1 w-full"
          contentContainerClassName="flex-1"
          onRefresh={() => console.log("refreshing")}
          refreshing={false}
        />
      ) : (
        <Text className="text-center mt-4"> Keine Schnittmuster gefunden 😢</Text>
      )}
    </View>
  );
}




// Here you go — a clean, production‑ready full component example based on your exact requirement:

// ✅ ONE component✅ Holds platform‑specific config for

// View styling

// FlatList options✅ Selects the correct config based on platform✅ Uses NativeWind className✅ No modes, no unions, no complexity✅ Just a simple, elegant pattern

// This is the senior‑level solution you were aiming for.

// ✅ 1. Define your config types

// // config.types.ts
// export interface FlatListConfig {
//   numColumns: number
// }

// export interface ViewConfig {
//   className: string
// }

// export interface PlatformConfig {
//   view: ViewConfig
//   flatlist: FlatListConfig
// }

// ✅ 2. Define your platform config object

// // ui.config.ts
// import { PlatformConfig } from "./config.types"

// export const UI_CONFIG: { web: PlatformConfig; mobile: PlatformConfig } = {
//   web: {
//     view: {
//       className: "max-w-4xl mx-auto p-10 bg-gray-100 rounded-xl"
//     },
//     flatlist: {
//       numColumns: 5
//     }
//   },

//   mobile: {
//     view: {
//       className: "p-4 bg-white"
//     },
//     flatlist: {
//       numColumns: 2
//     }
//   }
// }

// ✅ 3. Select the correct config based on platform

// // useUIConfig.ts
// import { Platform } from "react-native"
// import { UI_CONFIG } from "./ui.config"

// export function useUIConfig() {
//   const isWeb = Platform.OS === "web"
//   return isWeb ? UI_CONFIG.web : UI_CONFIG.mobile
// }

// ✅ Clean✅ Reusable✅ No branching inside your component

// ✅ 4. Full component example (View + FlatList)

// // SmartContainer.tsx
// import React from "react"
// import { View, FlatList } from "react-native"
// import { useUIConfig } from "./useUIConfig"

// interface SmartContainerProps<T> {
//   children?: React.ReactNode
//   data?: T[]
//   renderItem?: ({ item }: { item: T }) => JSX.Element
// }

// export function SmartContainer<T>(props: SmartContainerProps<T>) {
//   const config = useUIConfig()

//   // If data is provided → render FlatList
//   if (props.data && props.renderItem) {
//     return (
//       <FlatList
//         data={props.data}
//         renderItem={props.renderItem}
//         numColumns={config.flatlist.numColumns}
//         className="flex-1"
//       />
//     )
//   }

//   // Otherwise → render View
//   return (
//     <View className={config.view.className}>
//       {props.children}
//     </View>
//   )
// }

// ✅ If you pass data → FlatList✅ If not → View✅ Both use platform‑specific config✅ No modes, no unions, no complexity

// ✅ 5. Usage examples

// ✅ Mobile result

// View: p-4 bg-white

// FlatList: numColumns = 2

// ✅ Web result

// View: centered, max width, padding

// FlatList: numColumns = 5

// ✅ Example: View usage

// <SmartContainer>
//   <Text>Hello World</Text>
// </SmartContainer>

// ✅ Example: FlatList usage

// <SmartContainer
//   data={items}
//   renderItem={({ item }) => (
//     <Text className="p-4 border-b">{item.title}</Text>
//   )}
// />

// ✅ Why this is the best pattern

// No modes

// No complex unions

// No duplicated components

// All platform differences live in one config object

// Component stays clean and readable

// Easy to extend (add image, scrollview, etc.)

// Perfect for cross‑platform Expo apps

// If you want, I can extend this to:

// ✅ Add Image config✅ Add ScrollView config✅ Add Pressable config✅ Add theme support (light/dark)✅ Add responsive breakpoints for web

// Just tell me what you want next.