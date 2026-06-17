import { ProfileHeader } from "@/components/profile-header";
import styles from "@/styles/profile";
import { Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ProfileHeader />
    </View>
  );
}
