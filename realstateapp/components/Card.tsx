import { View, Image, TouchableOpacity, Text } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import type { Property } from "@/types/Property";

const Card = (property: Property) => {
  const router = useRouter();

  const imgUrl =
    property.galleries && property.galleries.length > 0
      ? property.galleries[0].image
      : null;

  const avgRating =
    property.reviews?.length > 0
      ? property.reviews.reduce((acc, r) => acc + r.rating, 0) / property.reviews.length
      : 0;

      const handlePress = () => {
    // Directly navigate and send the full property as preview data
    router.push({
      pathname: "/properties/[id]",
      params: {
        id: property.id.toString(),
        preview: JSON.stringify(property),
      },
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex flex-col items-start w-60 h-80 relative"
    >
      <Image
        source={{ uri: imgUrl as string }}
        className="size-full rounded-2xl"
      />

      <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
        <AntDesign name="star" size={18} color="orange" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-1">
          {avgRating.toFixed(1)}
        </Text>
      </View>

      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        <Text
          className="text-xl font-rubik-extrabold text-white"
          numberOfLines={1}
        >
          {property.name}
        </Text>

        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-xl font-rubik-extrabold text-white">
            ${property.price}
          </Text>
          <AntDesign name="heart" size={24} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
