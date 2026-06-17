import { COLORS } from "@/colors/colors";
import { LogoutButton } from "@/components/logout-button";
import { ProfileHeader } from "@/components/profile-header";
import { useDelete, useUserBooks } from "@/hooks/book-hooks";
import { useRefreshOnFocus } from "@/hooks/use-refresh-on-focus";
import styles from "@/styles/profile";
import { UserBook } from "@/types/book";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const mutation = useDelete();

  const { data: book, isLoading, isRefetching, refetch } = useUserBooks();

  useRefreshOnFocus(refetch);

  const confirmDelete = (bookId: string) => {
    Alert.alert(
      "Delete Recommendation",
      "Are you sure you want to delete this recommendation?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => mutation.mutateAsync(bookId),
        },
      ],
    );
  };
  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={14}
          color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          style={{ marginRight: 2 }}
        />,
      );
    }
    return stars;
  };

  const BookItem = ({ item }: { item: UserBook }) => {
    return (
      <View style={styles.bookItem}>
        <Image source={item.imageUrl} style={styles.bookImage} />
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <View style={styles.ratingContainer}>
            {renderRatingStars(item.rating)}
          </View>
          <Text style={styles.bookCaption} numberOfLines={2}>
            {item.caption}
          </Text>
          <Text style={styles.bookDate}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => confirmDelete(item.id)}
          style={styles.deleteButton}
        >
          {mutation.isPending ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <Ionicons name="trash-outline" size={20} color={COLORS.primary} />
          )}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ProfileHeader />
      <LogoutButton />
      {book && !isLoading && (
        <View style={styles.booksHeader}>
          <Text style={styles.booksTitle}>Your Recommendations 📚</Text>
          <Text style={styles.booksCount}>{book.data?.length} books</Text>
        </View>
      )}
      {book && !isLoading && (
        <FlatList
          data={book.data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BookItem item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.booksList}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="book-outline"
                size={50}
                color={COLORS.textSecondary}
              />
              <Text style={styles.emptyText}>No recommendations yet</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push("/create")}
              >
                <Text style={styles.addButtonText}>Add Your First Book</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </View>
  );
}
