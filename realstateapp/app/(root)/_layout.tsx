import { useGlobalContext } from "@/contexts/GlobalProvider";
import { Redirect, Slot } from "expo-router";
import { SafeAreaView, ActivityIndicator } from "react-native";

export default function AppLayout() {
  const { isLogged, loading } = useGlobalContext();

  // Show loading until session restored
  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  // Redirect to signin if not logged
  if (!isLogged) {
    return <Redirect href="/signin" />;
  }

  return <Slot />;
}
