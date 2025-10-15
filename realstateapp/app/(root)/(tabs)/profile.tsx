import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, {ReactNode} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type Props = {
  icon: ReactNode;
  label: string;
  color?: string;
  showArrow?: boolean;
}

// Reusable component
const ProfileItem = ({ icon, label, color = "black", showArrow = true }: Props) => (
  <View className="mt-5 flex flex-row justify-between items-center">
    <View className="flex flex-row items-center gap-x-2">
      {icon}
      <Text className={`font-bold text-lg ${color === "red" ? "text-red-600" : "text-black"}`}>{label}</Text>
    </View>
    {showArrow && <Entypo name="chevron-right" size={24} color="black" />}
  </View>
);

const Profile = () => {
  return (
    <ScrollView className="flex-1 px-5 bg-white">
      {/* Header */}
      <View className="mt-4 flex flex-row justify-between items-center">
        <Text className="font-bold text-lg">Profile</Text>
        <Image
          source={{ uri: "data:image/jpeg;base64,/9j/4AAQSk..." }} // truncated for brevity
          className="size-6"
        />
      </View>

      {/* Avatar & Name */}
      <View className="m-3 flex flex-col justify-center items-center">
        <Image
          source={{
            uri: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
          }}
          className="size-28 rounded-full"
          resizeMode="cover"
        />
        <Text className="mt-2 font-bold text-lg">Adrian Hajdin</Text>
      </View>

      {/* Profile Items */}
      <ProfileItem icon={<Fontisto name="calendar" size={24} color="black" />} label="My Booking" />
      <ProfileItem icon={<MaterialIcons name="payment" size={24} color="black" />} label="Payments" />
      <ProfileItem icon={<Ionicons name="person" size={24} color="black" />} label="Profile" />
      <ProfileItem icon={<MaterialIcons name="notifications-none" size={24} color="black" />} label="Notification" />
      <ProfileItem icon={<MaterialCommunityIcons name="security" size={24} color="black" />} label="Security" />
      <ProfileItem icon={<FontAwesome6 name="language" size={24} color="black" />} label="Language" />
      <ProfileItem icon={<Feather name="help-circle" size={24} color="black" />} label="Help Center" />
      <ProfileItem icon={<FontAwesome5 name="user-friends" size={24} color="black" />} label="Invite Friends" />

      {/* Logout Item */}
      <ProfileItem icon={<MaterialIcons name="logout" size={24} color="red" />} label="Logout" color="red" showArrow={false} />
    </ScrollView>
  );
};

export default Profile;
