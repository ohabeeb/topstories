import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import theme from '../constants/theme';

export const CATEGORIES = [
  'General',
  'Technology',
  'Business',
  'Sports',
  'Entertainment',
  'Health',
  'Science',
];

export default function CategoryTabs({ selected, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        gap: theme.spacing.sm,
      }}>
      {CATEGORIES.map((category) => {
        const isActive = selected === category;

        return (
          <TouchableOpacity
            key={category}
            onPress={() => onSelect(category)}
            style={{
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.xs + 2,
              borderRadius: theme.radius.lg,
              backgroundColor: isActive
                ? theme.colors.primary
                : theme.colors.accent,
            }}>
            <Text
              style={{
                ...theme.typography.body,
                fontWeight: '600',
                color: isActive ? theme.colors.white : theme.colors.primary,
              }}>
              {category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
