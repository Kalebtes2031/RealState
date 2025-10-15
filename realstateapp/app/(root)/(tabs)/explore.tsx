import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Search from "@/components/Search";

const Explore = () => {
  const router = useRouter();
  const [selected, setSelected] = useState("All");

  const texts = [
    { id: 1, text: "All" },
    { id: 2, text: "House" },
    { id: 3, text: "Villa" },
    { id: 4, text: "Apartments" },
    { id: 5, text: "Condominium" },
    { id: 6, text: "Open house" },
  ];
  const image1 = require("../../../assets/images/detailone.png");
  const image2 = require("../../../assets/images/detail2.png");
  const apartments = [
    {
      id: 1,
      imgUrl: image1,
      rating: 4.8,
      title: "Lucky Lake Apartments",
      location: "Beijing, China",
      price: 1234,
    },
    {
      id: 2,
      imgUrl: image2,
      rating: 4.8,
      title: "Home Away From Home",
      location: "Beijing, China",
      price: 1234,
    },
    {
      id: 3,
      imgUrl: image1,
      rating: 4.8,
      title: "Tranquil Tavern Apartments",
      location: "Beijing, China",
      price: 1234,
    },
    {
      id: 4,
      imgUrl: image2,
      rating: 4.8,
      title: "Tropicana Del Norte De Forte",
      location: "Beijing, China",
      price: 1234,
    },
  ];
  return (
    <View className="flex-1">
      <ScrollView className="flex-1  pb-12 bg-white">
        <View className="flex px-5 flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-blue-100 rounded-full p-3"
          >
            <Ionicons name="arrow-back" size={20} color="black" />
          </TouchableOpacity>
          <Text className="font-bold text-[16px]">
            Search for Your Ideal Home
          </Text>
          <Image
            source={{
              uri: "data:image/jpeg;base64,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",
            }}
            className="size-6"
          />
        </View>

        <Search />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-6 pl-5"
        >
          {texts.map((text) => (
            <TouchableOpacity
              key={text.id}
              onPress={() => setSelected(text.text)}
              className={`mr-4  rounded-full px-6 py-3 ${selected === text.text ? " bg-secondary " : "bg-blue-100"}`}
            >
              <Text
                className={`font-semibold ${selected === text.text ? "text-white" : "text-gray-700"}`}
              >
                {text.text}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text className="font-bold text-xl px-5 pt-7 pb-2">
          Found 182 Apartments
        </Text>
        <View className="bg-blue-50 p-4">
          {apartments.map((apartment) => (
            <TouchableOpacity
              key={apartment.id}
              onPress={() => router.push(`/properties/${apartment.id}`)}
              className="bg-white flex flex-row mb-4 justify-between items-center p-4 border-1 border-gray-200 shadow-2xl rounded-2xl"
            >
              <View className="flex flex-row items-center gap-x-4">
                <View className="relative">
                  <View className="w-32 h-32 rounded-2xl">
                    <Image
                      source={apartment.imgUrl}
                      className="w-full h-full rounded-2xl "
                      resizeMode="contain"
                    />
                  </View>
                  <View className="absolute top-3 right-2 bg-white rounded-full px-2 py-[2px]">
                    <View className="flex flex-row items-center gap-x-1">
                      <Image
                        className="w-3 h-3 "
                        resizeMode="contain"
                        source={require("../../../assets/images/star.png")}
                      />
                      <Text className="text-sm">{apartment.rating}</Text>
                    </View>
                  </View>
                </View>
                <View className="flex flex-col gap-y-2">
                  <Text className="w-[130px] leading-6 font-bold text-[18px]">
                    {apartment.title}
                  </Text>
                  <Text className="text-gray-500">{apartment.location}</Text>
                </View>
              </View>
              <View className="flex flex-col justify-between gap-y-8 items-end">
                <Feather name="heart" size={20} color="gray" />
                <Text className="text-secondary font-bold text-md">
                  ${apartment.price}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Explore;
