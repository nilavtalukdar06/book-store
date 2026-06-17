import { useUser } from "@/hooks/auth-hooks";
import styles from "@/styles/profile";
import { Image } from "expo-image";
import { View, Text } from "react-native";

export function ProfileHeader() {
  const { data: user, isLoading } = useUser();
  if (!user && !isLoading) return null;

  return (
    <View style={styles.profileHeader}>
      <Image
        source={{ uri: user?.data?.imageUrl }}
        style={styles.profileImage}
      />
      <View style={styles.profileInfo}>
        <Text style={styles.username}>{user?.data?.name}</Text>
        <Text style={styles.email}>{user?.data?.email}</Text>
        <Text style={styles.memberSince}>
          🗓️ Joined {formatMemberSince(user?.data?.createdAt)}
        </Text>
      </View>
    </View>
  );
}
