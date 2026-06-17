import { SafeScreen } from "@/components/safe-screen";
import { queryClient } from "@/config/query-client";
import { AuthProvider } from "@/context/auth-context";
import { QueryClientProvider, focusManager } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  useEffect(() => {
    const onAppStateChange = (status: AppStateStatus) => {
      if (Platform.OS !== "web") {
        focusManager.setFocused(status === "active");
      }
    };

    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaProvider>
          <SafeScreen>
            <Slot />
          </SafeScreen>
          <StatusBar style="dark" />
        </SafeAreaProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
