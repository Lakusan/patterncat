import React, { useRef } from "react";
import { Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import {
  ICarouselInstance
} from "react-native-reanimated-carousel";

const PAGE_WIDTH = Dimensions.get("window").width;

type Item = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
};

export default function PatternImageGallery({ item }: { item: Item[] }) {
  const progress = useSharedValue(0);
  const ref = useRef<ICarouselInstance>(null);

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_WIDTH * 0.6,
  };

  const handlePaginationPress = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <></>
    // <View className="gap-3 w-full">
    //   {/* MAIN CAROUSEL */}
    //   <View className="mb-3">
    //     <Carousel
    //       ref={ref}
    //       {...baseOptions}
    //       loop
    //       onProgressChange={progress}
    //       style={{ width: PAGE_WIDTH }}
    //       data={item}
    //       renderItem={({ item }) => (
    //         <View className="flex-1 rounded-xl overflow-hidden bg-gray-100">
    //           <Image
    //             source={{ uri: item }}
    //             className="w-full h-full"
    //             resizeMode="cover"
    //           />
    //         </View>
    //       )}
    //     />
    //   </View>

    //   {/* PAGINATION DOTS */}
    //   <Pagination.Basic
    //     progress={progress}
    //     data={images}
    //     dotStyle={{ backgroundColor: "#262626" }}
    //     activeDotStyle={{ backgroundColor: "#f1f1f1" }}
    //     containerStyle={{ gap: 5, marginBottom: 10 }}
    //     onPress={handlePaginationPress}
    //   />
    // </View>
  );
}
