import { useAuth } from "@/context/auth-context";
import styles from "@/styles/profile";
import { Text, TouchableOpacity, View } from "react-native";

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
    >
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text
          style={{
            color: "white",
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
