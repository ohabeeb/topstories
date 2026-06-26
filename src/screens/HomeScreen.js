import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ArticleCard from '../components/ArticleCard';
import CategoryTabs, { CATEGORIES } from '../components/CategoryTabs';
import mockArticles from '../data/mockArticles';
import theme from '../constants/theme';
import useBookmarks from '../hooks/useBookmarks';
import config from '../constants/config';

export default function HomeScreen({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const { toggleBookmark, isBookmarked } = useBookmarks();

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  async function fetchArticles() {
    setLoading(true);
    setError(null);

    try {
      const category = selectedCategory.toLowerCase();
      const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&max=10&apikey=${config.GNEWS_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      setError('Failed to load articles. Please try again.');
      setArticles(mockArticles);
    } finally {
      setLoading(false);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    await fetchArticles();
    setRefreshing(false);
  }

  function handleCategorySelect(category) {
    setSelectedCategory(category);
  }

  function handleArticlePress(article) {
    navigation.navigate('Detail', { article });
  }

  // ── Render states ──────────────────────────────

  function renderHeader() {
    return (
      <View>
        <View
          style={{
            paddingHorizontal: theme.spacing.md,
            paddingTop: theme.spacing.md,
            paddingBottom: theme.spacing.sm,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              ...theme.typography.h1,
              color: theme.colors.text,
            }}>
            Top Stories
          </Text>
          <Text
            style={{
              ...theme.typography.caption,
              color: theme.colors.subtext,
            }}>
            {selectedCategory}
          </Text>
        </View>

        <CategoryTabs
          selected={selectedCategory}
          onSelect={handleCategorySelect}
        />
      </View>
    );
  }

  function renderEmpty() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: theme.spacing.xl * 2,
        }}>
        <Text style={{ fontSize: 40 }}>📭</Text>
        <Text
          style={{
            ...theme.typography.h2,
            color: theme.colors.subtext,
            marginTop: theme.spacing.md,
          }}>
          No articles found
        </Text>
      </View>
    );
  }

  function renderError() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: theme.spacing.xl * 2,
          paddingHorizontal: theme.spacing.lg,
        }}>
        <Text style={{ fontSize: 40 }}>⚠️</Text>
        <Text
          style={{
            ...theme.typography.h2,
            color: theme.colors.error,
            marginTop: theme.spacing.md,
            textAlign: 'center',
          }}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      {loading ? (
        <View style={{ flex: 1 }}>
          {renderHeader()}
          <ActivityIndicator
            size="large"
            color={theme.colors.primary}
            style={{ marginTop: theme.spacing.xl * 2 }}
          />
        </View>
      ) : error ? (
        <View style={{ flex: 1 }}>
          {renderHeader()}
          {renderError()}
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ArticleCard
              article={item}
              onPress={() => handleArticlePress(item)}
              isBookmarked={isBookmarked(item)}
              onBookmark={() => toggleBookmark(item)}
            />
          )}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmpty}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          contentContainerStyle={{
            paddingBottom: theme.spacing.xl,
          }}
        />
      )}
    </SafeAreaView>
  );
}
