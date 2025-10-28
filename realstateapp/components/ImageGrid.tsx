import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, Modal, FlatList } from "react-native";

const ImageGrid = ({ images = [] }: { images: any[] }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Get up to 3 preview images
  const previewImages = images.slice(0, 3);
  const remainingCount = Math.max(images.length - 3, 0);

  return (
    <View className="w-full">
      {/* Grid of first 3 images */}
      <View className="flex flex-row flex-wrap">
        {previewImages.map((img, idx) => {
          const isLastWithOverlay = idx === 2 && remainingCount > 0;

          return (
            <TouchableOpacity
              key={idx}
              activeOpacity={isLastWithOverlay ? 0.8 : 1}
              onPress={() => isLastWithOverlay && setModalVisible(true)}
              style={{
                width: "33.33%",
                aspectRatio: 1, // ensures square shape
                padding: 5,
              }}
            >
              <View className="w-full h-full rounded-2xl overflow-hidden relative">
                <Image
                  source={img.image}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                {isLastWithOverlay && (
                  <View className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Text className="text-white text-xl font-semibold">
                      +{remainingCount}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Modal with full gallery */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/90 justify-center items-center">
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            className="absolute top-10 right-6 z-10"
          >
            <Text className="text-white text-lg">✕</Text>
          </TouchableOpacity>

          <FlatList
            data={images}
            keyExtractor={(_, i) => i.toString()}
            numColumns={2}
            contentContainerStyle={{ padding: 10 }}
            renderItem={({ item }) => (
              <Image
                source={item.image}
                className="w-[45%] h-[150px] m-2 rounded-xl"
                resizeMode="cover"
              />
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ImageGrid;
