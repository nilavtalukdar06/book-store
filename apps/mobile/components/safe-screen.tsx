import { COLORS } from "@/colors/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function SafeScreen({ children }: { children: React.ReactNode }) {
  const inset = useSafeAreaInsets();
  return (
    <View style={[{ paddingTop: inset.top }, styles.container]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
