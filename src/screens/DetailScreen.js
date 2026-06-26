import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import theme from '../constants/theme';
import * as WebBrowser from 'expo-web-browser';

export default function DetailScreen({ navigation, route }) {
  const { article } = route.params;

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: theme.spacing.md,
          paddingTop: theme.spacing.lg + theme.spacing.md,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              fontSize: 22,
              color: theme.colors.primary,
            }}>
            ←
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            ...theme.typography.body,
            color: theme.colors.subtext,
            fontWeight: '600',
            marginLeft: theme.spacing.md,
          }}>
          {article.source.name}
        </Text>
      </View>
    );
  }

  function renderHeroImage() {
    return (
      <Image
        source={{ uri: article.image }}
        style={{ width: '100%', height: 220 }}
        resizeMode={'cover'}
      />
    );
  }

  function renderTitleAndDate() {
    return (
      <View style={{ padding: theme.spacing.md }}>
        <Text
          style={{
            ...theme.typography.h1,
            color: theme.colors.text,
            marginBottom: theme.spacing.sm,
          }}>
          {article.title}
        </Text>
        <Text
          style={{ ...theme.typography.caption, color: theme.colors.subtext }}>
          {new Date(article.publishedAt).toDateString()}
        </Text>
        <Text
          style={{
            ...theme.typography.body,
            color: theme.colors.text,
            lineHeight: 24,
            marginTop: theme.spacing.md,
          }}>
          {article.content}
        </Text>
        <TouchableOpacity
          onPress={() =>
            WebBrowser.openBrowserAsync(article.url, {
              toolbarColor: theme.colors.primary,
              controlsColor: theme.colors.white,
              showTitle: true,
            })
          }
          style={{
            backgroundColor: theme.colors.primary,
            padding: theme.spacing.md,
            borderRadius: theme.spacing.md,
            alignItems: 'center',
            marginTop: theme.spacing.lg,
          }}>
          <Text
            style={{
              ...theme.typography.body,
              color: theme.colors.white,
              fontWeight: '600',
            }}>
            Read Full Article
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {renderHeader()}
      {renderHeroImage()}
      {renderTitleAndDate()}
    </ScrollView>
  );
}
