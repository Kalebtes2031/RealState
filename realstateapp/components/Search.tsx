import { View, TextInput, TouchableOpacity, Text } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import BottomModal from "@/components/BottomModal";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const Search = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [values, setValues] = useState([100, 1000]);

  const openBottomModal = () => setModalVisible(true);
  const closeBottomModal = () => setModalVisible(false);

  const onReset = () => {
    setValues([100, 1000]);
  };

  interface MultiSliderValuesChangeProps {
    (changedValues: number[]): void;
  }

  const onValueChange: MultiSliderValuesChangeProps = (changedValues) => {
    setValues(changedValues);
  };
  return (
    <View className="px-5">
      <View className="mt-5  bg-gray-50  rounded-full px-4 flex flex-row items-center justify-between">
        <View className="flex flex-row items-center justify-center gap-x-4">
          <Ionicons name="search" size={20} color="gray" />
          <TextInput placeholder="Search something" />
        </View>
        <TouchableOpacity onPress={openBottomModal}>
          <Ionicons name="filter" size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <BottomModal visible={isModalVisible} onClose={closeBottomModal}>
        <View className="mb-6 flex flex-row justify-between items-center">
          <TouchableOpacity
            onPress={closeBottomModal}
            className="bg-blue-100 rounded-full p-3"
          >
            <Ionicons name="arrow-back" size={20} color="black" />
          </TouchableOpacity>
          <Text className="font-bold text-[16px]">Filter</Text>
          <TouchableOpacity onPress={onReset}>
            <Text className="text-secondary font-semibold ">Reset</Text>
          </TouchableOpacity>
        </View>
        <Text className="font-bold text-[17px]">Price Range</Text>
        <View className="flex flex-col justify-center items-center">
          <View className="flex flex-row justify-between w-[289px]">
            <Text className="font-bold text-[16px] text-secondary">
              ${values[0]}
            </Text>
            <Text className="font-bold text-[16px] text-secondary">
              ${values[1]}
            </Text>
          </View>
          <MultiSlider
            values={values}
            sliderLength={280}
            onValuesChange={onValueChange}
            min={0}
            max={5000}
            step={50}
            allowOverlap={false}
            snapped
            selectedStyle={{
              backgroundColor: "#8B5DFF", // active range bar color
            }}
            markerStyle={{
              backgroundColor: "#8B5DFF",
              height: 24,
              width: 24,
              borderRadius: 12,
              borderColor: "#fff",
              borderWidth: 2,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 2,
              elevation: 3,
            }}
            trackStyle={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "#d0d0d0",
            }}
          />
        </View>
        <Text className="font-bold text-[17px]">Property Type</Text>
        <View className="flex flex-row mt-4">
          <View className="mr-4 rounded-full bg-secondary px-4 py-3">
            <Text className="text-white font-semibold">Apartments</Text>
          </View>
          <View className="mr-4 rounded-full bg-secondary px-4 py-3">
            <Text className="text-white font-semibold">Townhomes</Text>
          </View>
          <View className="mr-4  rounded-full bg-blue-100 px-4 py-3">
            <Text className="text -gray-600 font-semibold">Homes</Text>
          </View>
        </View>
        <View className="flex flex-row mt-4">
          <View className="mr-4  rounded-full bg-blue-100 px-4 py-3">
            <Text className="text -gray-600 font-semibold">Condos</Text>
          </View>
          <View className="mr-4  rounded-full bg-blue-100 px-4 py-3">
            <Text className="text -gray-600 font-semibold">Duplexes</Text>
          </View>
          <View className="mr-4  rounded-full bg-blue-100 px-4 py-3">
            <Text className="text -gray-600 font-semibold">Studios</Text>
          </View>
        </View>
        <Text className="font-bold text-[17px] mt-6 mb-4 ">Home Details</Text>
        <View className="flex flex-row justify-between items-center">
          <Text className="text-gray-600 text-md font-semibold">Bedrooms</Text>
          <View className="flex flex-row justify-center items-center gap-x-4">
            <Text className="bg-blue-50 px-4 py-1 text-secondary rounded-full text-[20px] font-bold">
              -
            </Text>
            <Text className=" text-[18px] font-bold">2</Text>
            <Text className="bg-blue-50 px-4 py-1 text-secondary rounded-full text-[20px] font-bold">
              +
            </Text>
          </View>
        </View>
        <View className="mt-5 flex flex-row justify-between items-center">
          <Text className="text-gray-600 text-md font-semibold">Bathrooms</Text>
          <View className="flex flex-row justify-center items-center gap-x-4">
            <Text className="bg-blue-50 px-4 py-1 text-secondary rounded-full text-[20px] font-bold">
              -
            </Text>
            <Text className=" text-[18px] font-bold">1</Text>
            <Text className="bg-blue-50 px-4 py-1 text-secondary rounded-full text-[20px] font-bold">
              +
            </Text>
          </View>
        </View>
        <Text className="font-bold text-[17px] mt-6 mb- ">Building Size</Text>
        <View className="flex flex-col justify-center items-center">
          <MultiSlider
            values={values}
            sliderLength={280}
            onValuesChange={onValueChange}
            min={0}
            max={5000}
            step={50}
            allowOverlap={false}
            snapped
            selectedStyle={{
              backgroundColor: "#8B5DFF", // active range bar color
            }}
            markerStyle={{
              backgroundColor: "#8B5DFF",
              height: 24,
              width: 24,
              borderRadius: 12,
              borderColor: "#fff",
              borderWidth: 2,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 2,
              elevation: 3,
            }}
            trackStyle={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "#d0d0d0",
            }}
          />
          <View className="flex flex-row justify-between w-[289px]">
            <Text className="font-bold text-[16px] text-secondary">
              ${values[0]}
            </Text>
            <Text className="font-bold text-[16px] text-secondary">
              ${values[1]}
            </Text>
          </View>
        </View>
        <TouchableOpacity className="bg-secondary w-full flex flex-row items-center justify-center py-3 mt-6 rounded-full">
          <Text className="text-white font-bold text-lg">Set Filter</Text>
        </TouchableOpacity>
      </BottomModal>
    </View>
  );
};

export default Search;
