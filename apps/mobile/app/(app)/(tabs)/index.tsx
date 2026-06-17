import styles from "@/styles/home";
import { Book } from "@/types/book";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  RefreshControl,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/colors/colors";
import { formatPublishDate } from "@/utils/time";
import { useBooks } from "@/hooks/book-hooks";
import { useRefreshOnFocus } from "@/hooks/use-refresh-on-focus";

export default function Index() {
  const {
    data,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useBooks();

  useRefreshOnFocus(refetch);

  const books = Array.from(
    new Map(
      (data?.pages.flatMap((page) => page.data?.books ?? []) ?? [])
        .filter((book): book is Book => book != null)
        .map((book) => [book.id, book]),
    ).values(),
  );

  if (isPending) {
    return (
      <View
        style={[
          { flex: 1, justifyContent: "center", alignItems: "center" },
          styles.container,
        ]}
      >
        <ActivityIndicator size={40} color={COLORS.primary} />
      </View>
    );
  }
  if (data && !isPending) {
    return (
      <View style={styles.container}>
        <FlatList
          data={books}
          keyExtractor={(item, index) => item?.id ?? (index + 1).toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <RenderItem item={item} />}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator size={24} color={COLORS.primary} />
            ) : null
          }
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.headerTitle}>BookWorm 🐛</Text>
              <Text style={styles.headerSubtitle}>
                Discover great reads from the community👇
              </Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="book-outline"
                size={60}
                color={COLORS.textSecondary}
              />
              <Text style={styles.emptyText}>No recommendations yet</Text>
              <Text style={styles.emptySubtext}>
                Be the first to share a book!
              </Text>
            </View>
          }
        />
      </View>
    );
  }
}

export const RenderItem = ({ item }: { item: Book | undefined }) => {
  return (
    <View style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: item?.user.profileImageUrl }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{item?.user.name}</Text>
        </View>
      </View>
      <View style={styles.bookImageContainer}>
        <Image
          source={item?.imageUrl}
          style={styles.bookImage}
          contentFit="cover"
        />
      </View>
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item?.title}</Text>
        <View style={styles.ratingContainer}>
          <RenderRatings rating={item?.rating ?? 0} />
        </View>
        <Text style={styles.caption}>{item?.caption}</Text>
        <Text style={styles.date}>
          Shared on{" "}
          {formatPublishDate(
            item?.createdAt ?? new Date(Date.now()).toString(),
          )}
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
