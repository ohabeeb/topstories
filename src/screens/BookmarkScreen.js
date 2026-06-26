// src/screens/BookmarkScreen.js

import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArticleCard from '../components/ArticleCard';
import useBookmarks from '../hooks/useBookmarks';
import theme from '../constants/theme';

export default function BookmarkScreen({ navigation }) {
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();

  function renderEmpty() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: theme.spacing.xl * 2,
        }}>
        <Text style={{ fontSize: 40 }}>🔖</Text>
        <Text
          style={{
            ...theme.typography.h2,
            color: theme.colors.subtext,
            marginTop: theme.spacing.md,
          }}>
          No bookmarks yet
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text
        style={{
          ...theme.typography.h1,
          color: theme.colors.text,
          padding: theme.spacing.md,
        }}>
        Bookmarks
      </Text>

      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <ArticleCard
            article={item}
            onPress={() =>
              navigation.navigate('HomeTab', {
                screen: 'Detail',
                params: { article: item },
              })
            }
            isBookmarked={isBookmarked(item)}
            onBookmark={() => toggleBookmark(item)}
          />
        )}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
      />
    </SafeAreaView>
  );
}
