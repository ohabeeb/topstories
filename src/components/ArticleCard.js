import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import theme from '../constants/theme';

export default function ArticleCard({
  article,
  onPress,
  isBookmarked,
  onBookmark,
}) {
  const formattedDate = new Date(article.publishedAt).toDateString();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.md,
        marginHorizontal: theme.spacing.md,
        marginBottom: theme.spacing.md,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: theme.colors.border,
      }}>
      {/* Thumbnail */}
      <Image
        source={{
          uri: article.image || 'https://picsum.photos/seed/fallback/800/400',
        }}
        style={{ width: '100%', height: 180 }}
        resizeMode="cover"
      />

      {/* Content */}
      <View style={{ padding: theme.spacing.md }}>
        {/* Source + Date row */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: theme.spacing.xs,
          }}>
          <Text
            style={{
              ...theme.typography.caption,
              color: theme.colors.primary,
              fontWeight: '600',
            }}>
            {article.source.name}
          </Text>

          <TouchableOpacity onPress={onBookmark}>
            <Text style={{ fontSize: 18 }}> {isBookmarked ? '🔖' : '🏷️'}</Text>
          </TouchableOpacity>
          <Text
            style={{
              ...theme.typography.caption,
              color: theme.colors.subtext,
            }}>
            {formattedDate}
          </Text>
        </View>

        {/* Title */}
        <Text
          numberOfLines={2}
          style={{
            ...theme.typography.h2,
            color: theme.colors.text,
            marginBottom: theme.spacing.xs,
          }}>
          {article.title}
        </Text>

        {/* Description */}
        <Text
          numberOfLines={3}
          style={{
            ...theme.typography.body,
            color: theme.colors.subtext,
            lineHeight: 20,
          }}>
          {article.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
