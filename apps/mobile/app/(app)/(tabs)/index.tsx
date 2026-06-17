import { useAuth } from "@/context/auth-context";
import styles from "@/styles/home";
import { Book } from "@/types/book";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/colors/colors";
import { formatPublishDate } from "@/utils/time";

export default function Index() {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    ></View>
  );
}

export const RenderItem = ({ item }: { item: Book }) => {
  return (
    <View style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: item.user.profileImageUrl }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{item.user.name}</Text>
        </View>
      </View>
      <View style={styles.bookImageContainer}>
        <Image
          source={item.imageUrl}
          style={styles.bookImage}
          contentFit="cover"
        />
      </View>
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          <RenderRatings rating={item.rating} />
        </View>
        <Text style={styles.caption}>{item.caption}</Text>
        <Text style={styles.date}>
          Shared on {formatPublishDate(item.createdAt)}
        </Text>
      </View>
    </View>
  );
};

export const RenderRatings = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Ionicons
        key={i}
        name={i <= rating ? "star" : "star-outline"}
        size={16}
        color={i <= rating ? "#f4b400" : COLORS.textSecondary}
        style={{ marginRight: 2 }}
      />,
    );
  }
  return stars;
};
