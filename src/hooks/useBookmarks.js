import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'bookmarks';

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  async function loadBookmarks() {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) setBookmarks(JSON.parse(stored));
    } catch (e) {
      console.log('Failed to load bookmarks', e);
    }
  }

  async function toggleBookmark(article) {
    try {
      const exists = bookmarks.some((b) => b.url === article.url);
      const updated = exists
        ? bookmarks.filter((b) => b.url !== article.url)
        : [...bookmarks, article];
      setBookmarks(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.log('Failed to toggle bookmark');
    }
  }

  function isBookmarked(article) {
    return bookmarks.some((b) => b.url === article.url);
  }

  return { bookmarks, toggleBookmark, isBookmarked };
}
