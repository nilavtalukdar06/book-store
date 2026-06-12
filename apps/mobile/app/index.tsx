import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(
        "https://book-store-api-cyan.vercel.app/health",
      );
      const result = await response.json();
      console.log(result);
    };
    fetchApi();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
