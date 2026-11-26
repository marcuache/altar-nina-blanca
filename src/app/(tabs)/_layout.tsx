import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { AdBanner } from '../../components/AdBanner';

export default function TabsLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0B0910' }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#120F18',
            borderTopColor: '#252030',
            height: 62,
            paddingBottom: 8,
            paddingTop: 6,
          },
          tabBarActiveTintColor: '#D4AF37',
          tabBarInactiveTintColor: '#7E768E',
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '700',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Altar',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="sparkles" size={size} color={color as string} />
            ),
          }}
        />
        <Tabs.Screen
          name="veladora"
          options={{
            title: 'Veladora',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="flame" size={size} color={color as string} />
            ),
          }}
        />
        <Tabs.Screen
          name="oraciones"
          options={{
            title: 'Oraciones',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book" size={size} color={color as string} />
            ),
          }}
        />
        <Tabs.Screen
          name="suerte"
          options={{
            title: 'Suerte',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="compass" size={size} color={color as string} />
            ),
          }}
        />
        <Tabs.Screen
          name="fondos"
          options={{
            title: 'Fondos',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="images" size={size} color={color as string} />
            ),
          }}
        />
      </Tabs>
      <AdBanner />
    </View>
  );
}
