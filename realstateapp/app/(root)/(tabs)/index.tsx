import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { useProperties, prefetchPropertyDetail } from "@/hooks/useQueryHooks";

import Header from "@/components/Header";
import Search from "@/components/Search";
import Featured from "@/components/Featured";
import Recommendation from "@/components/Recommendation";
import { useState, useMemo } from "react";

export default function Index() {
  const {
    data: properties,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useProperties();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredProperties = useMemo(() => {
    if (!properties) return [];
    if (selectedFilter === "All") return properties;

    return properties.filter((p) => {
      const type = p.type?.toLowerCase() || "";
      return type === selectedFilter.toLowerCase();
    });
  }, [properties, selectedFilter]);

  // Pad data to keep even columns
  const paddedProperties = (list?: any[]) => {
  const safeList = Array.isArray(list) ? list : [];
  const padded = [...safeList];
  if (padded.length % 2 !== 0) padded.push({ id: -1, isPlaceholder: true });
  return padded;
};


  const handlePress = async (item: any) => {
    // Build a small preview to show instantly on navigation.
    // NOTE: keep field names consistent with the detail shape (use `bedrooms` not `beds`).
    const preview = {
      id: item.id,
      name: item.name,
      address: item.address,
      price: item.price,
      type: item.type,
      // include a few gallery images in the preview so the detail page can show a small gallery immediately
      galleries: item.galleries?.slice(0, 3),
      reviews: item.reviews?.slice(0, 1),
      bedrooms: item.bedrooms ?? item.beds ?? 0,
      bathrooms: item.bathrooms,
      area: item.area,
    };

    // Prefetch detail data in background before navigation
    prefetchPropertyDetail(queryClient, item.id, preview).catch(() => {});

    // Navigate immediately with preview
    router.push({
      pathname: "/properties/[id]",
      params: {
        id: item.id,
        preview: JSON.stringify(preview),
      },
    });
  };

  const renderItems = ({ item }: { item: any }) => {
    if (item.isPlaceholder) {
      return <View style={{ flex: 1, marginTop: 16 }} />;
    }

    const firstImage = item.galleries?.[0]?.image;
    const firstRating = item.reviews?.[0]?.rating;

    return (
      <TouchableOpacity
        onPress={() => handlePress(item)}
        activeOpacity={0.8}
        className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg relative"
      >
        {/* Rating badge */}
        <View className="absolute top-5 right-4 bg-white/90 px-2 py-1 rounded-full z-50 flex-row items-center">
          <Text className="text-xs font-rubik-bold text-primary-300">
            ⭐ {firstRating ?? "-"}
          </Text>
        </View>

        {/* Property Image */}
        {firstImage && (
          <Image
            source={{ uri: firstImage }}
            className="w-full h-40 rounded-lg"
            resizeMode="cover"
          />
        )}

        {/* Info */}
        <View className="flex flex-col mt-2">
          <Text className="text-base font-rubik-bold text-black-300">
            {item.name}
          </Text>
          <Text className="text-xs font-rubik text-black-100" numberOfLines={1}>
            {item.address}
          </Text>
          <View className="flex flex-row items-center justify-between mt-2">
            <Text className="text-base font-rubik-bold text-primary-300">
              ${item.price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Handle loading
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#007BFF" />
        <Text className="text-gray-400 mt-2">Loading properties...</Text>
      </SafeAreaView>
    );
  }

  // Handle error
  if (isError) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-red-500 font-rubik-medium mb-3">
          Failed to load properties.
        </Text>
        <TouchableOpacity
          onPress={() => refetch()}
          className="px-4 py-2 bg-primary-300 rounded-full"
        >
          <Text className="text-white font-rubik-medium">Try Again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={paddedProperties(filteredProperties)}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center mt-10">
            <Text className="text-gray-500 font-rubik-medium">
              No {selectedFilter.toLowerCase()} available.
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={renderItems}
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            colors={["#007BFF"]}
          />
        }
        contentContainerClassName="pb-12"
        ListHeaderComponent={() => (
          <View>
            <Header />
            <Search showFilter={false}/>
            <Featured />
            <Recommendation
              selected={selectedFilter}
              setSelected={setSelectedFilter}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
