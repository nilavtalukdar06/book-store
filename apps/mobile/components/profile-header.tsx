import { useUser } from "@/hooks/auth-hooks";
import styles from "@/styles/profile";
import { formatMemberSince } from "@/utils/time";
import { Image } from "expo-image";
import { View, Text } from "react-native";

export function ProfileHeader() {
  const { data: user, isLoading } = useUser();
  if (!user && !isLoading) return null;

  return (
    <View style={styles.profileHeader}>
      <Image
        source={{ uri: user?.data?.user.profileImageUrl }}
        style={styles.profileImage}
      />
      <View style={styles.profileInfo}>
        <Text style={styles.username}>{user?.data?.user.name}</Text>
        <Text style={styles.email}>{user?.data?.user.email}</Text>
        <Text style={styles.memberSince}>
          🗓️ Joined{" "}
          {formatMemberSince(
            user?.data?.user?.createdAt ?? new Date(Date.now()).toString(),
          )}
        </Text>
      </View>
    </View>
  );
}
