import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const DetailInfo = () => {
  const params = useLocalSearchParams();
  const { id, title, imgUrl, rating } = params;
  console.log(id);

  const datas = [
    { icon: "car", title: "Car Parking" },
    { icon: "wifi", title: "Wi-Fi & Net" },
    { icon: "rest", title: "Restaurant" },
    { icon: "apartment", title: "Gym & Fit" },
    { icon: "github", title: "Swimming" }, // Placeholder icon
    { icon: "baidu", title: "Pet Center" }, // Placeholder icon
    { icon: "Trophy", title: "Sport Center" }, // Placeholder icon
    { icon: "book", title: "Laundry" }, // Placeholder icon
  ];

  const image1 = require("../../../assets/images/detailone.png");
  const image2 = require("../../../assets/images/detail2.png");
  const image3 = require("../../../assets/images/detail3.png");
  const images = [{ image: image1 }, { image: image2 }, { image: image3 }];

  const chunkArray = (array, size) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    );
  };

  const amenitiesChunks = chunkArray(datas, 4);

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 relative">
        <Image
          source={require("../../../assets/images/detailone.png")}
          className="w-full h-[380px]"
        />
        <View className="px-5 pt-5 pb-16">
          <Text className="font-bold text-lg">Modernica Apartment</Text>
          <View className="flex flex-row gap-x-4 mt-2 items-center">
            <Text className="rounded-full bg-gray-200 text-gray-500 font-semibold px-3 text-sm py-1 uppercase">
              Apartment
            </Text>
            <View className="flex flex-row items-center gap-x-1">
              <AntDesign name="star" size={18} color="orange" />
              <Text>4.8 (1,275 reviews)</Text>
            </View>
          </View>
          <View className="mt-3 flex flex-row justify-between items-center">
            <View className="flex flex-row items-center gap-x-2">
              <View className="bg-gray-200 p-2 rounded-full ">
                <FontAwesome name="bed" size={16} color="gray" />
              </View>
              <Text className="text-[15px] font-semibold">8 Beds</Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <View className="bg-gray-200 p-2 rounded-full ">
                <FontAwesome name="bathtub" size={16} color="gray" />
              </View>
              <Text className="text-[15px] font-semibold">3 bath</Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <View className="bg-gray-200 p-2 rounded-full ">
                <AntDesign name="fullscreen" size={16} color="gray" />
              </View>
              <Text className="text-[15px] font-semibold">2000 sqft</Text>
            </View>
          </View>
          <View className="mt-8">
            <Text className="font-bold text-[18px]">Agent</Text>
          </View>
          <View className="flex flex-row justify-between items-center mt-5">
            <View className="flex flex-row items-center">
              <Image
                source={{
                  uri: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
                }}
                className="size-12 rounded-full"
              />
              <View className="flex flex-col items-start ml-4 justify-center">
                <Text>Natasya Wilodra</Text>
                <Text>Owner</Text>
              </View>
            </View>
            <View className="flex flex-row items-center gap-x-5">
              <AntDesign name="message" size={24} color="gray" />
              <Feather name="phone" size={24} color="gray" />
            </View>
          </View>
          <Text className="font-bold text-[18px] mt-6 mb-2 ">Overview</Text>
          <Text className="text-gray-400 font-rubik-bold leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            minus, doloremque laboriosam laborum quod molestias nam recusandae
            modi totam fugiat dicta assumenda consectetur soluta dolor non
            provident exercitationem! Natus, minus.
          </Text>
          <Text className="font-bold text-[18px] mt-6 mb-2 ">Facilities</Text>
          <View className="py-5 space-y-5">
            {amenitiesChunks.map((chunk, rowIndex) => (
              <View
                key={rowIndex}
                className="flex flex-row justify-between mb-4"
              >
                {chunk.map((item, index) => (
                  <View
                    key={index}
                    className="flex flex-col justify-center items-center w-[22%]"
                  >
                    <View className="bg-gray-200 p-2 rounded-full w-12 items-center justify-center">
                      <AntDesign
                        name={item.icon.toLowerCase()}
                        size={24}
                        color="#8B5DFF"
                      />
                    </View>
                    <Text className="text-xs text-center mt-1">
                      {item.title}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
          <Text className="font-bold text-[18px] mb-2 ">Gallery</Text>
          <View className="w-full flex flex-row justify-between gap-x-4 items-center">
            {images.map((image, idx) => (
              <Image
                key={idx}
                source={image.image}
                className="w-[30%] h-[100px]  rounded-2xl"
              />
            ))}
          </View>

          <Text className="font-bold text-[18px] mb-2 mt-4 ">Location</Text>
          <View className="flex flex-row items-center">
            <MaterialIcons name="location-on" size={24} color="#8B5DFF" />
            <Text className="font-semibold text-gray-400">
              Grand City St. 100, New York, United States
            </Text>
          </View>
          <View className="mt-3 flex flex-row justify-center items-center w-full">
            <Image
              source={require("../../../assets/images/map.png")}
              className="w-[95%] rounded-3xl"
            />
          </View>
          <View className="mt-4 mb-6 flex flex-row justify-between items-center">
            <View className="flex flex-row items-center gap-x-2">
              <AntDesign name="star" size={18} color="orange" />
              <Text className="font-bold text-md">4.8 (1,275 reviews)</Text>
            </View>
            <Text className="text-secondary font-bold text-md">See All</Text>
          </View>
          <View className="flex flex-row items-center">
            <Image
              source={{
                uri: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
              }}
              className="size-10 rounded-full"
            />
            <Text className="ml-2 font-bold">Charolette Hanlin</Text>
          </View>
          <Text className="mt-4 text-gray-600 leading-5 ">
            The apartment is very clean and modern. I really like the interior
            design. Looks like I'll feel at home 😍
          </Text>
          <View className=" mt-4 mb-12 flex flex-row justify-between">
            <View className="flex flex-row items-center gap-x-2">
              <Feather name="heart" size={20} color="gray" />
              <Text className="font-bold">938</Text>
            </View>
            <Text className="text-gray-500">6 days ago</Text>
          </View>
        </View>
      </ScrollView>
      <View className="bg-white w-full absolute bottom-0 px-6 py-5 rounded-t-3xl shadow-xl border-t border-r border-l border-gray-200">
        <View className="flex flex-row justify-between items-center">
          <View>
            <Text className="uppercase text-gray-500 tracking-widest font-semibold">
              {" "}
              Price
            </Text>
            <Text className="uppercase text-secondary tracking-widest text-[20px] font-bold">
              $17821
            </Text>
          </View>
          <TouchableOpacity className="bg-secondary px-16 py-4 rounded-full">
            <Text className="text-white font-bold">Booking Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailInfo;
