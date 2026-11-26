import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppState } from '../context/AppStateContext';

/**
 * Espacio reservado para Banner de Google AdMob.
 * En compilación nativa con `react-native-google-mobile-ads`, aquí se renderiza <BannerAd />.
 * En Expo Go / desarrollo muestra un marcador visual con acceso directo a "Quitar anuncios ($2.99)".
 */
export function AdBanner() {
  const { isAdFree, setPaywallVisible } = useAppState();

  if (isAdFree) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>ANUNCIO</Text>
        </View>
        <Text style={styles.text} numberOfLines={1}>
          Espacio AdMob (Banner 320x50)
        </Text>
      </View>
      <TouchableOpacity
        style={styles.removeBtn}
        onPress={() => setPaywallVisible(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="sparkles" size={12} color="#120E08" />
        <Text style={styles.removeBtnText}>Quitar $2.99</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 54,
    backgroundColor: '#16141C',
    borderTopWidth: 1,
    borderTopColor: '#2A2533',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  badge: {
    backgroundColor: '#2D2938',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: '#A79EB8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  text: {
    color: '#8B839B',
    fontSize: 12,
    flex: 1,
  },
  removeBtn: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  removeBtnText: {
    color: '#120E08',
    fontSize: 11,
    fontWeight: '800',
  },
});
