import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useGlobalContext } from "@/contexts/GlobalProvider";

export default function Signin() {
  const router = useRouter();
  const { emailLogin, isLogged } = useGlobalContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isLogged) router.replace("/");
  }, [isLogged]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      await emailLogin(email, password); // sets user in context
      router.replace("/"); // redirect to home
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
      Alert.alert("Login Error", "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ height: "100%", justifyContent: "center" }}>
        <Image
          source={require("../assets/images/signin.png")}
          className="w-full h-4/6 mt-5"
          resizeMode="contain"
        />

        <View className="px-10 items-center">
          <Text className="text-[18px] text-center uppercase font-rubik text-black-200">
            Welcome To Real Scout
          </Text>
          {/* <Text className="text-[20px] font-rubik-bold text-black-300 text-center mt-2">
            Let&apos;s Get You Closer To {"\n"}
            <Text className="text-secondary">Your Ideal Home</Text>
          </Text> */}
          {/* <Text className="text-lg font-rubik text-black-200 text-center mt-6">
            Login with your email and password
          </Text> */}
        </View>

        <View className="px-10 mt-5 w-full">
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            className="border border-gray-300 rounded-full px-4 py-3 mb-4"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="border border-gray-300 rounded-full px-4 py-3 mb-4"
          />

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-secondary rounded-full py-4 items-center justify-center"
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-[16px] font-rubik-medium">Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
