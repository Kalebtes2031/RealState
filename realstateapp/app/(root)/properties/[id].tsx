import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { usePropertyDetail } from "@/hooks/useQueryHooks"; // Your hook
import ImageGrid from "@/components/ImageGrid";

const DetailInfo = () => {
  const [showAllReview, setShowAllReview] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id, preview } = params;

  // Parse preview data if passed
  let previewData = null;
  if (typeof preview === "string") {
    try {
      previewData = JSON.parse(preview);
    } catch (e) {
      previewData = null;
    }
  } else if (
    Array.isArray(preview) &&
    preview.length > 0 &&
    typeof preview[0] === "string"
  ) {
    try {
      previewData = JSON.parse(preview[0]);
    } catch (e) {
      previewData = null;
    }
  }

  // Fetch full detail (with cache / memoization)
  const {
    data: property,
    isLoading,
    isError,
  } = usePropertyDetail(id as string, {
    initialData: previewData,
  });

  const displayData = property || previewData;

  console.log("Display data: ", displayData);

  if (isError || !displayData) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Failed to load property details.</Text>
      </View>
    );
  }

  // Only show ActivityIndicator if loading AND no preview
  if (isLoading && !previewData) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Amenities fallback
  const amenities = displayData?.amenities || [
    { icon: "car", title: "Car Parking" },
    { icon: "wifi", title: "Wi-Fi & Net" },
    { icon: "rest", title: "Restaurant" },
    { icon: "apartment", title: "Gym & Fit" },
    { icon: "github", title: "Swimming" },
    { icon: "baidu", title: "Pet Center" },
    { icon: "Trophy", title: "Sport Center" },
    { icon: "book", title: "Laundry" },
  ];

  function chunkArray<T>(array: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    );
  }
  const amenitiesChunks = chunkArray(amenities, 4);

  // Galleries (dynamic or fallback)
  const images = displayData?.galleries?.map((g) => ({
    image: { uri: g.image },
  })) || [
    require("../../../assets/images/detailone.png"),
    require("../../../assets/images/detail2.png"),
    require("../../../assets/images/detail3.png"),
  ];

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, value] of Object.entries(intervals)) {
      const count = Math.floor(seconds / value);
      if (count >= 1) {
        return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
      }
    }
    return "Just now";
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1 relative"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Image
          source={images[0]?.image}
          className="w-full h-[380px]"
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 absolute top-3 left-3 bg-white rounded-full "
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View className="px-5 pt-5 pb-16">
          {/* Title & Type */}
          <Text className="font-rubik-bold text-2xl mb-2">
            {displayData?.name || "Property Name"}
          </Text>
          <View className="flex flex-row gap-x-4 my-2 items-center">
            <Text className="rounded-full bg-gray-200 text-secondary font-rubik-semibold px-3 text-sm py-1 uppercase">
              {displayData?.type || "Type"}
            </Text>
            <View className="flex flex-row items-center gap-x-1">
              <AntDesign name="star" size={18} color="orange" />
              <Text className="text-gray-500 font-bold font-rubik-bold">
                {displayData?.reviews?.[0]?.rating ?? "-"} (
                {displayData?.reviews?.length ?? 0} reviews)
              </Text>
            </View>
          </View>

          {/* Beds / Baths / Size */}
          <View className="mt-3 flex flex-row justify-between items-center">
            <View className="flex flex-row items-center gap-x-2">
              <View className="bg-gray-200 p-2 rounded-full">
                <FontAwesome name="bed" size={16} color="#8B5DFF" />
              </View>
              <Text className="text-[15px] font-rubik-semibold">
                {displayData?.bedrooms ?? 0} Beds
              </Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <View className="bg-gray-200 p-2 rounded-full">
                <FontAwesome name="bathtub" size={16} color="#8B5DFF" />
              </View>
              <Text className="text-[15px] font-rubik-semibold">
                {displayData?.bathrooms ?? 0} Bath
              </Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <View className="bg-gray-200 p-2 rounded-full">
                <AntDesign name="fullscreen" size={16} color="#8B5DFF" />
              </View>
              <Text className="text-[15px] font-rubik-semibold">2000 sqft</Text>
            </View>
          </View>

          <View className="mt-6 pt-[1px] bg-gray-200" />

          {/* Agent Info */}
          <View className="mt-8">
            <Text className="font-bold text-[18px]">Agent</Text>
          </View>
          <View className="flex flex-row justify-between items-center mt-5">
            <View className="flex flex-row items-center">
              <Image
                source={{
                  uri:
                    displayData?.agent?.avatar ||
                    "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
                }}
                className="size-12 rounded-full"
              />
              <View className="flex flex-col items-start ml-4 justify-center">
                <Text>
                  {displayData?.agent?.display_name ||
                    displayData?.agent?.email.split("@")[0] ||
                    "Agent Name"}
                </Text>
                <Text>Owner</Text>
              </View>
            </View>
            <View className="flex flex-row items-center gap-x-5">
              <AntDesign name="message" size={24} color="gray" />
              <Feather name="phone" size={24} color="gray" />
            </View>
          </View>

          {/* Overview / Description */}
          <Text className="font-bold text-[18px] mt-6 mb-2">Overview</Text>
          <Text className="text-gray-400 font-rubik-bold leading-6">
            {displayData?.description ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
          </Text>

          {/* Facilities / Amenities */}
          <Text className="font-bold text-[18px] mt-6 mb-2">Facilities</Text>
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
                        name={item.icon.toLowerCase() as any}
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

          {/* Gallery */}
          <Text className="font-rubik-bold text-[18px] mb-2">Gallery</Text>
          <ImageGrid images={images as any} />

          {/* Location */}
          <Text className="font-rubik-bold text-[18px] mt-6 mb-2">
            Location
          </Text>
          <View className="flex flex-row items-center">
            <Entypo name="location-pin" size={24} color="#8B5DFF" />
            <Text className="text-gray-400 font-rubik-medium">
              {displayData?.address || "Unknown Location"}
            </Text>
          </View>
          <View>
            <Image
              source={require("../../../assets/images/map.png")}
              className="w-full h-40 rounded-lg mt-4"
              resizeMode="cover"
            />
          </View>

          {/* Reviews */}
          <View className="mt-6 flex flex-col gap-6">
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row items-center gap-x-1">
                <AntDesign name="star" size={18} color="orange" />
                <Text className="text-2xl font-rubik-bold">
                  {displayData?.reviews?.[0]?.rating ?? "-"} (
                  {displayData?.reviews?.length ?? 0} reviews)
                </Text>
              </View>

              {displayData?.reviews?.length > 1 && (
                <TouchableOpacity
                  onPress={() => setShowAllReview(!showAllReview)}
                >
                  <Text className="text-secondary text-xl font-rubik-semibold">
                    {showAllReview ? "Show Less" : "See All"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View>
              {displayData?.reviews?.length > 0 ? (
                (showAllReview
                  ? displayData.reviews
                  : displayData.reviews.slice(0, 1)
                ).map((review, idx) => (
                  <View key={idx} className="mb-4">
                    <View className="flex flex-row items-center gap-x-3">
                      <Image
                        source={{
                          uri:
                            review.user.avatar ||
                            "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
                        }}
                        className="w-10 h-10 rounded-full"
                      />
                      <View>
                        <Text className="font-bold">
                          {review.user.display_name || review.user.username}
                        </Text>
                        <View className="flex flex-row items-center gap-x-1">
                          <AntDesign name="star" size={16} color="orange" />
                          <Text>{review.rating}</Text>
                        </View>
                      </View>
                    </View>
                    <Text className="mt-1 text-gray-600">{review.comment}</Text>
                    <View className="flex flex-row justify-end mt-2">
                      <Text className="text-gray-400 text-end text-sm">
                        {timeAgo(review.created_at)}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text className="text-gray-400">No reviews yet.</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer / Booking */}
      <View className="bg-white w-full px-6 py-5 rounded-t-3xl shadow-xl border-t border-r border-l border-gray-200 absolute bottom-0">
        <View className="flex flex-row justify-between items-center">
          {/* Price Section */}
          <View className="flex-1">
            <Text className="font-rubik-semibold text-gray-500 uppercase text-xs tracking-widest">
              Price
            </Text>
            <Text className="font-rubik-bold text-secondary text-xl mt-1">
              ${displayData?.price ?? 0}
            </Text>
          </View>

          {/* Booking Button */}
          <TouchableOpacity className="bg-secondary px-8 py-3 rounded-full shadow-md">
            <Text className="font-rubik-bold text-white text-base">
              Booking Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailInfo;
