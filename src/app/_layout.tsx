import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useUserStore } from "@/entities/user/model/userStore";
import { authApi } from "@/features/auth/api/authApi";
import { useColorScheme } from "@/shared/lib/hooks/use-color-scheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { setMe, clearMe } = useUserStore();

  useEffect(() => {
    const initializeUser = async () => {
      console.log("[RootLayout] Initializing user...");
      try {
        const token = await SecureStore.getItemAsync("accessToken");
        console.log("[RootLayout] Token found:", !!token);
        if (token) {
          const userData = await authApi.getMe();
          console.log("[RootLayout] User data fetched:", userData.email);
          setMe(userData);
        }
      } catch (error) {
        console.error("[RootLayout] Failed to initialize user:", error);
        clearMe();
      } finally {
        console.log("[RootLayout] Initialization complete.");
        useUserStore.getState().setInitialized(true);
        SplashScreen.hideAsync();
      }
    };
    initializeUser();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
