import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const profile = () => {
  return (
    <View className="flex-1 px-5 bg-white">
      <View className="mt-4 flex flex-row justify-between items-center">
        <Text className="font-bold text-lg">Profile</Text>
        <Image
          source={{
            uri: "data:image/jpeg;base64,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",
          }}
          className="size-6"
        />
      </View>
      <View className="m-3 flex flex-col justify-center items-center">
        <Image
          source={{
            uri: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
          }}
          className="size-28  rounded-full"
          resizeMode="cover"
        />
        <Text className="mt-2 font-bold text-lg">Adrian Hajdin</Text>
      </View>
      <View className="mt-6 flex flex-row justify-between items-center">
        <View className="flex flex-row items-center gap-x-2">
          <Fontisto name="calendar" size={24} color="black" />
          <Text className="font-bold text-lg">My Booking</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="black" />
      </View>
      <View className="mt-5 flex flex-row justify-between items-center">
        <View className="flex flex-row items-center gap-x-2">
          <MaterialIcons name="payment" size={24} color="black" />
          <Text className="font-bold text-lg">Payments</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="black" />
      </View>
      <View className="mt-12 flex flex-row justify-between items-center">
        <View className="flex flex-row items-center gap-x-2">
<Ionicons name="person" size={24} color="black" />
          <Text className="font-bold text-lg">Profile</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="black" />
      </View>
      <View className="mt-5 flex flex-row justify-between items-center">
        <View className="flex flex-row items-center gap-x-2">
<MaterialIcons name="notifications-none" size={24} color="black" />
          <Text className="font-bold text-lg">Notification</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="black" />
      </View>
      <View className="mt-5 flex flex-row justify-between items-center">
        <View className="flex flex-row items-center gap-x-2">
<MaterialCommunityIcons name="security" size={24} color="black" />
          <Text className="font-bold text-lg">Security</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="black" />
      </View>
      <View className="mt-5 flex flex-row justify-between items-center">
        <View className="flex flex-row items-center gap-x-2">
          <FontAwesome6 name="language" size={24} color="black" />
          <Text className="font-bold text-lg">Language</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="black" />
      </View>
      <View className="mt-5 flex flex-row justify-between items-center">
        <View className="flex flex-row items-center gap-x-2">
          <Feather name="help-circle" size={24} color="black" />
          <Text className="font-bold text-lg">Help Center</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="black" />
      </View>
      <View className="mt-5 flex flex-row justify-between items-center">
        <View className="flex flex-row items-center gap-x-2">
          <FontAwesome5 name="user-friends" size={24} color="black" />
          <Text className="font-bold text-lg">Invite Friends</Text>
        </View>
        <Entypo name="chevron-right" size={24} color="black" />
      </View>
      <View className="mt-5 flex flex-row justify-between items-center">
        <View className="flex flex-row items-center gap-x-2">
          <MaterialIcons name="logout" size={24} color="red" />
          <Text className="font-bold text-red-600 text-lg">Logout</Text>
        </View>
        {/* <Entypo name="chevron-right" size={24} color="black" /> */}
      </View>
    </View>
  );
};

export default profile;
