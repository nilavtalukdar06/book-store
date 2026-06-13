import { SafeScreen } from "@/components/safe-screen";
import { queryClient } from "@/config/query-client";
import { AuthProvider } from "@/context/auth-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaProvider>
          <SafeScreen>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(auth)" />
            </Stack>
          </SafeScreen>
          <StatusBar style="dark" />
        </SafeAreaProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
