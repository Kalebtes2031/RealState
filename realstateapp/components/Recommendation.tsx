import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const Recommendation = () => {
  const [selected, setSelected] = useState("All");

  const texts = [
    { id: 1, text: "All" },
    { id: 2, text: "House" },
    { id: 3, text: "Villa" },
    { id: 4, text: "Apartments" },
    { id: 5, text: "Condominium" },
    { id: 6, text: "Open house" },
  ];
  const renderItem = ({ item }: { item: { id: number; text: string } }) => (
    <TouchableOpacity
      onPress={() => setSelected(item.text)}
      className={`mr-4  rounded-full px-6 py-3 ${selected === item.text ? " bg-secondary " : "bg-blue-100"}`}
    >
      <Text
        className={`font-semibold ${selected === item.text ? "text-white" : "text-gray-700"}`}
      >
        {item.text}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View className="my-5 ">
      <View className=" px-5 flex flex-row justify-between items-center">
        <Text>Our Recommendation</Text>
        <Text>See All</Text>
      </View>

      <FlatList
        data={texts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="flex gap-5 mt-5 px-5"
      />
    </View>
  );
};

export default Recommendation;
