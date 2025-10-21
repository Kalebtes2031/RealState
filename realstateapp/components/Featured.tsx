import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import Card from "./Card";
import { useFeaturedProperties } from "@/hooks/useQueryHooks";

const Featured = () => {
  const { data: homes, isLoading, error } = useFeaturedProperties();

  if (isLoading) {
    return (
      <View className="flex items-center justify-center py-10">
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading featured homes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="p-4">
        <Text className="text-red-500">
          Failed to load featured properties.
        </Text>
      </View>
    );
  }

  return (
    <View className="my-5">
      <View className="px-5 flex flex-row justify-between items-center">
        <Text className="text-lg font-semibold">Featured</Text>
        <Text className="text-primary">See All</Text>
      </View>

      <FlatList
        data={homes || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card {...item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="flex gap-5 mt-5 px-5"
      />
    </View>
  );
};

export default Featured;
