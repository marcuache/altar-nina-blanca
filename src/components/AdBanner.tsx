import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppState } from '../context/AppStateContext';
import { getAdsModule, getBannerUnitId } from '../services/adsService';

export function AdBanner() {
  const { isAdFree, setPaywallVisible } = useAppState();
  const [adFailed, setAdFailed] = useState(false);

  if (isAdFree) {
    return null;
  }

  const adsMod = getAdsModule();

  if (adsMod && !adFailed) {
    const { BannerAd, BannerAdSize } = adsMod;
    return (
      <View style={styles.nativeContainer}>
        <BannerAd
          unitId={getBannerUnitId()}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          onAdFailedToLoad={() => setAdFailed(true)}
        />
        <TouchableOpacity
          style={styles.floatingRemoveBtn}
          onPress={() => setPaywallVisible(true)}
          activeOpacity={0.85}
        >
          <Text style={styles.removeBtnText}>Quitar $2.99</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>ANUNCIO</Text>
        </View>
        <Text style={styles.text} numberOfLines={1}>
          AdMob conectado (activo en APK/Play)
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
  nativeContainer: {
    backgroundColor: '#120F18',
    borderTopWidth: 1,
    borderTopColor: '#252030',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingRemoveBtn: {
    position: 'absolute',
    right: 6,
    top: -12,
    backgroundColor: '#D4AF37',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
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
