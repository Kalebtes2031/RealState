//realstateapp/app/_layout.tsx
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "./global.css";
import GlobalProvider from "@/contexts/GlobalProvider";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import AsyncStorage from "@react-native-async-storage/async-storage";


// Create the query client with sensible defaults
  const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,            // 1 min = consider data fresh
      gcTime: 1000 * 60 * 60 * 24,  // 24h in cache before GC
      refetchOnWindowFocus: true,      // refetch when returning to app
      refetchOnReconnect: true,        // refetch if user reconnects to network
      retry: 1,                        // retry once on failure
    },
  },
});


  // Create a persistor for AsyncStorage
  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }


  return (
    <GlobalProvider>
      {/* PersistQueryClientProvider will persist the React Query cache to AsyncStorage */}
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}
        onSuccess={() => {
          // Refetch in background when cache is restored
          queryClient.resumePausedMutations();
          queryClient.invalidateQueries();
        }}
      >
        <Stack screenOptions={{ headerShown: false }} />
      </PersistQueryClientProvider>
    </GlobalProvider>
  );
}
