import { useAuth } from "@/context/auth-context";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { COLORS } from "../../colors/colors";

export default function AuthLayout() {
  const { isLoading, isAuthenticated } = useAuth();
  if (isLoading) {
    return (
      <View
        style={{
          backgroundColor: COLORS.background,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  if (isAuthenticated) {
    return <Redirect href="/" />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}
