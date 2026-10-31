import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { Platform } from 'react-native';

// Configuração pública do aplicativo cliente; não contém chave administrativa.
const app = getApps().length ? getApp() : initializeApp({
  apiKey: 'AIzaSyBQVtr75S4gFr9YeIBhTXjm7qesEFNcDhY',
  authDomain: 'investia-86c02.firebaseapp.com',
  projectId: 'investia-86c02',
  storageBucket: 'investia-86c02.firebasestorage.app',
  messagingSenderId: '914598189308',
  appId: '1:914598189308:web:19684bf254f1a5f0da9f79',
});

function createAuth() {
  if (Platform.OS === 'web') return getAuth(app);
  try {
    return initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
  } catch (error) {
    if ((error as { code?: string }).code === 'auth/already-initialized') return getAuth(app);
    throw error;
  }
}

export const auth = createAuth();
