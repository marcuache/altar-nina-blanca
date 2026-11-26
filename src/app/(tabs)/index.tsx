import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppState } from '../../context/AppStateContext';
import { ALTAR_HERO_IMAGE } from '../../data/localWallpapers';
import { CANDLE_COLORS } from '../../data/seedContent';
import {
  isDailyReminderEnabled,
  setDailyPrayerReminder,
} from '../../services/notificationsService';

function formatRemaining(ms: number): string {
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return `${hours}h ${mins.toString().padStart(2, '0')}m`;
}

export default function AltarScreen() {
  const {
    dailyPhrase,
    isAdFree,
    setPaywallVisible,
    candle,
    candleRemainingMs,
    todayReading,
    refreshRemoteContent,
  } = useAppState();
  const [refreshing, setRefreshing] = useState(false);
  const [notifEnabled, setNotifEnabled] = useState(false);

  useEffect(() => {
    isDailyReminderEnabled().then(setNotifEnabled);
  }, []);

  const activeCandle = CANDLE_COLORS.find((c) => c.id === candle.colorId);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `🕯️ *Altar de la Niña Blanca*\n\n"${dailyPhrase.phrase}"\n\n🙏 *Oración del día:*\n${dailyPhrase.prayer}`,
      });
    } catch {
      // Cancelado por el usuario
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshRemoteContent();
    setRefreshing(false);
  };

  const handleToggleNotif = async (value: boolean) => {
    const result = await setDailyPrayerReminder(value);
    setNotifEnabled(result);
    if (value && !result) {
      Alert.alert(
        'Permiso requerido',
        'Activa las notificaciones para recibir tu frase diaria a las 8:30 AM.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.kicker}>SANTUARIO DIARIO</Text>
            <Text style={styles.headerTitle}>Altar de la Niña Blanca</Text>
          </View>
          {!isAdFree ? (
            <TouchableOpacity
              style={styles.proPill}
              onPress={() => setPaywallVisible(true)}
              activeOpacity={0.85}
            >
              <Ionicons name="star" size={13} color="#120E08" />
              <Text style={styles.proPillText}>Sin anuncios</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.proActivePill}>
              <Ionicons name="checkmark-circle" size={14} color="#D4AF37" />
              <Text style={styles.proActiveText}>Altar Pro</Text>
            </View>
          )}
        </View>

        {/* Imagen de portada del Altar */}
        <View style={styles.bannerWrap}>
          <Image source={ALTAR_HERO_IMAGE} style={styles.bannerImage} />
          <LinearGradient
            colors={['transparent', 'rgba(11, 9, 16, 0.92)']}
            style={styles.bannerGradient}
          >
            <Text style={styles.bannerCaption}>
              Tu espacio diario de fe, calma y protección
            </Text>
          </LinearGradient>
        </View>

        {/* Tarjeta principal: Frase y Oración del día */}
        <LinearGradient
          colors={['#1E182B', '#14101D', '#100D16']}
          style={styles.heroCard}
        >
          <View style={styles.heroTopRow}>
            <View style={styles.tag}>
              <Ionicons name="sparkles" size={12} color="#D4AF37" />
              <Text style={styles.tagText}>FRASE DEL DÍA</Text>
            </View>
            <TouchableOpacity onPress={handleRefresh} disabled={refreshing}>
              <Ionicons
                name="refresh"
                size={18}
                color={refreshing ? '#5A5268' : '#A79EB8'}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.phraseTitle}>{dailyPhrase.title}</Text>
          <Text style={styles.phraseQuote}>“{dailyPhrase.phrase}”</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>ORACIÓN PARA HOY</Text>
          <Text style={styles.prayerText}>{dailyPhrase.prayer}</Text>

          <View style={styles.reflectionBox}>
            <Ionicons name="sunny-outline" size={16} color="#D4AF37" />
            <Text style={styles.reflectionText}>{dailyPhrase.reflection}</Text>
          </View>

          <TouchableOpacity
            style={styles.shareBtn}
            onPress={handleShare}
            activeOpacity={0.85}
          >
            <Ionicons name="share-social-outline" size={18} color="#120E08" />
            <Text style={styles.shareBtnText}>Compartir oración</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Estado de Veladora */}
        <TouchableOpacity
          style={styles.statusCard}
          onPress={() => router.push('/(tabs)/veladora')}
          activeOpacity={0.85}
        >
          <View
            style={[
              styles.statusIcon,
              {
                backgroundColor: activeCandle
                  ? 'rgba(212, 175, 55, 0.16)'
                  : 'rgba(130, 122, 148, 0.12)',
              },
            ]}
          >
            <Ionicons
              name="flame"
              size={24}
              color={activeCandle ? '#D4AF37' : '#7E768E'}
            />
          </View>
          <View style={styles.statusBody}>
            <Text style={styles.statusTitle}>
              {activeCandle ? activeCandle.name : 'Tu altar no tiene veladora encendida'}
            </Text>
            <Text style={styles.statusSub}>
              {activeCandle
                ? `Encendida · Restan ${formatRemaining(candleRemainingMs)}`
                : 'Toca para elegir un color y encender por 24 horas'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#7E768E" />
        </TouchableOpacity>

        {/* Acceso rápido a Suerte del día */}
        <TouchableOpacity
          style={styles.statusCard}
          onPress={() => router.push('/(tabs)/suerte')}
          activeOpacity={0.85}
        >
          <View
            style={[
              styles.statusIcon,
              { backgroundColor: 'rgba(179, 136, 255, 0.14)' },
            ]}
          >
            <Ionicons name="compass" size={24} color="#B388FF" />
          </View>
          <View style={styles.statusBody}>
            <Text style={styles.statusTitle}>
              {todayReading ? todayReading.title : 'Lectura de Suerte del Día'}
            </Text>
            <Text style={styles.statusSub}>
              {todayReading
                ? `Números de hoy: ${todayReading.luckyNumbers}`
                : 'Descubre tu señal, consejo y números para hoy'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#7E768E" />
        </TouchableOpacity>

        {/* Recordatorio diario */}
        <View style={styles.notifCard}>
          <View style={styles.notifLeft}>
            <Ionicons name="notifications-outline" size={22} color="#D4AF37" />
            <View style={{ flex: 1 }}>
              <Text style={styles.statusTitle}>Recordatorio diario (8:30 AM)</Text>
              <Text style={styles.statusSub}>
                Recibe aviso de tu frase del día y cuando tu veladora esté por
                consumirse.
              </Text>
            </View>
          </View>
          <Switch
            value={notifEnabled}
            onValueChange={handleToggleNotif}
            trackColor={{ false: '#2A2338', true: '#D4AF37' }}
            thumbColor="#F6F1E7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0B0910',
  },
  scroll: {
    padding: 18,
    paddingBottom: 28,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  kicker: {
    color: '#D4AF37',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  headerTitle: {
    color: '#F6F1E7',
    fontSize: 21,
    fontWeight: '800',
    marginTop: 2,
  },
  proPill: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  proPillText: {
    color: '#120E08',
    fontSize: 12,
    fontWeight: '800',
  },
  proActivePill: {
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.5)',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  proActiveText: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '700',
  },
  bannerWrap: {
    height: 155,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2E2640',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bannerCaption: {
    color: '#F6F1E7',
    fontSize: 13,
    fontWeight: '700',
  },
  heroCard: {
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2E2640',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tagText: {
    color: '#D4AF37',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  phraseTitle: {
    color: '#F6F1E7',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  phraseQuote: {
    color: '#E7E0F2',
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: '#292238',
    marginVertical: 16,
  },
  sectionLabel: {
    color: '#A79EB8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 6,
  },
  prayerText: {
    color: '#D7CFE4',
    fontSize: 15,
    lineHeight: 22,
  },
  reflectionBox: {
    marginTop: 14,
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    borderLeftWidth: 3,
    borderLeftColor: '#D4AF37',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  reflectionText: {
    color: '#EFE7D6',
    fontSize: 13,
    lineHeight: 19,
    flex: 1,
  },
  shareBtn: {
    marginTop: 18,
    backgroundColor: '#D4AF37',
    borderRadius: 14,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  shareBtnText: {
    color: '#120E08',
    fontSize: 14,
    fontWeight: '800',
  },
  statusCard: {
    backgroundColor: '#14111C',
    borderRadius: 18,
    padding: 15,
    borderWidth: 1,
    borderColor: '#272134',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  statusIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBody: {
    flex: 1,
  },
  statusTitle: {
    color: '#F6F1E7',
    fontSize: 15,
    fontWeight: '700',
  },
  statusSub: {
    color: '#9C92AE',
    fontSize: 13,
    marginTop: 2,
  },
  notifCard: {
    backgroundColor: '#14111C',
    borderRadius: 18,
    padding: 15,
    borderWidth: 1,
    borderColor: '#272134',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  notifLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
});
