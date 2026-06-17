import { COLORS } from "@/colors/colors";
import { useLogout } from "@/hooks/auth-hooks";
import styles from "@/styles/profile";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Text } from "react-native";

export function LogoutButton() {
  const logout = useLogout();
  return (
    <TouchableOpacity style={styles.logoutButton} onPress={logout}>
      <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
}
