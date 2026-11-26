import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaywallModal } from '../components/PaywallModal';
import { AppStateProvider } from '../context/AppStateContext';
import { initializeAds } from '../services/adsService';
import { widgetTaskHandler } from '../widgets/widgetTaskHandler';

export default function RootLayout() {
  useEffect(() => {
    initializeAds();
    if (Platform.OS !== 'android') return;
    import('react-native-android-widget')
      .then(({ registerWidgetTaskHandler }) => {
        registerWidgetTaskHandler(widgetTaskHandler);
      })
      .catch(() => {
        // En Expo Go el módulo nativo del widget no está disponible.
      });
  }, []);

  return (
    <SafeAreaProvider>
      <AppStateProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#0B0910' },
          }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
        <PaywallModal />
      </AppStateProvider>
    </SafeAreaProvider>
  );
}
