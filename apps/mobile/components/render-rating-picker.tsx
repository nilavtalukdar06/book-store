import { COLORS } from "@/colors/colors";
import styles from "@/styles/create";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

interface Props {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

export function RenderRatingPicker({ rating, setRating }: Props) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <TouchableOpacity
        style={styles.starButton}
        key={i}
        onPress={() => setRating(i)}
      >
        <Ionicons
          name={i <= rating ? "star" : "star-outline"}
          size={32}
          color={i <= rating ? "#f4b400" : COLORS.textSecondary}
        />
      </TouchableOpacity>,
    );
  }
  return <View style={styles.ratingContainer}>{stars}</View>;
}
