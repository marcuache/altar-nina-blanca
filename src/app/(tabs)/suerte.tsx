import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppState } from '../../context/AppStateContext';
import { CANDLE_COLORS } from '../../data/seedContent';

export default function SuerteScreen() {
  const {
    todayReading,
    drawsToday,
    isAdFree,
    drawFortuneReading,
    setPaywallVisible,
  } = useAppState();
  const [drawing, setDrawing] = useState(false);

  const recommendedCandle = todayReading
    ? CANDLE_COLORS.find((c) => c.id === todayReading.recommendedCandle)
    : null;

  const handleFirstDraw = async () => {
    setDrawing(true);
    try {
      await drawFortuneReading(false);
    } finally {
      setDrawing(false);
    }
  };

  const handleExtraDraw = () => {
    if (isAdFree) {
      drawFortuneReading(false);
      return;
    }

    // En producción aquí se dispara RewardedAd de AdMob antes de entregar la lectura.
    Alert.alert(
      'Nueva lectura de suerte',
      'Tu lectura gratuita de hoy ya está abierta. Puedes ver un anuncio corto para sacar otra carta o quitar anuncios de por vida.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Quitar anuncios ($2.99)',
          onPress: () => setPaywallVisible(true),
        },
        {
          text: 'Ver anuncio (Simular)',
          onPress: async () => {
            setDrawing(true);
            await drawFortuneReading(true);
            setDrawing(false);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.kicker}>ORÁCULO DIARIO</Text>
        <Text style={styles.title}>Lectura de Suerte</Text>
        <Text style={styles.subtitle}>
          Tómate un respiro, piensa en tu pregunta y descubre la señal que te
          acompaña hoy.
        </Text>

        {!todayReading ? (
          <LinearGradient
            colors={['#1F172F', '#140F1F']}
            style={styles.closedCard}
          >
            <View style={styles.closedIcon}>
              <Ionicons name="compass" size={44} color="#D4AF37" />
            </View>
            <Text style={styles.closedTitle}>Tu carta de hoy está lista</Text>
            <Text style={styles.closedSub}>
              Incluye mensaje del día, consejo práctico, números de la suerte y
              veladora recomendada.
            </Text>
            <TouchableOpacity
              style={styles.drawBtn}
              onPress={handleFirstDraw}
              disabled={drawing}
              activeOpacity={0.85}
            >
              <Ionicons name="sparkles" size={18} color="#120E08" />
              <Text style={styles.drawBtnText}>
                {drawing ? 'Consultando...' : 'Revelar mi suerte de hoy'}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <LinearGradient
            colors={['#201831', '#14101D']}
            style={styles.readingCard}
          >
            <Text style={styles.symbol}>{todayReading.symbol}</Text>
            <Text style={styles.readingTitle}>{todayReading.title}</Text>
            <Text style={styles.readingMsg}>{todayReading.message}</Text>

            <View style={styles.box}>
              <Text style={styles.boxLabel}>CONSEJO PARA HOY</Text>
              <Text style={styles.boxText}>{todayReading.advice}</Text>
            </View>

            <View style={styles.metaRow}>
              <View style={[styles.metaBox, { flex: 1 }]}>
                <Text style={styles.boxLabel}>NÚMEROS DE SUERTE</Text>
                <Text style={styles.numbersText}>
                  {todayReading.luckyNumbers}
                </Text>
              </View>
              {recommendedCandle ? (
                <View style={[styles.metaBox, { flex: 1 }]}>
                  <Text style={styles.boxLabel}>VELADORA SUGERIDA</Text>
                  <View style={styles.candleRow}>
                    <View
                      style={[
                        styles.dot,
                        { backgroundColor: recommendedCandle.waxColor },
                      ]}
                    />
                    <Text style={styles.candleText}>
                      {recommendedCandle.name.replace('Veladora ', '')}
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>

            <TouchableOpacity
              style={styles.extraBtn}
              onPress={handleExtraDraw}
              disabled={drawing}
              activeOpacity={0.85}
            >
              <Ionicons
                name={isAdFree ? 'refresh' : 'play-circle-outline'}
                size={18}
                color="#D4AF37"
              />
              <Text style={styles.extraBtnText}>
                {isAdFree
                  ? 'Sacar otra lectura'
                  : 'Otra lectura (Anuncio recompensado)'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.counterText}>
              Lecturas realizadas hoy: {drawsToday}
            </Text>
          </LinearGradient>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0B0910' },
  scroll: { padding: 18, paddingBottom: 28, gap: 14 },
  kicker: {
    color: '#D4AF37',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  title: { color: '#F6F1E7', fontSize: 24, fontWeight: '800' },
  subtitle: { color: '#A79EB8', fontSize: 14, lineHeight: 20 },
  closedCard: {
    borderRadius: 22,
    padding: 26,
    borderWidth: 1,
    borderColor: '#33284A',
    alignItems: 'center',
    marginTop: 6,
  },
  closedIcon: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  closedTitle: { color: '#F6F1E7', fontSize: 20, fontWeight: '800' },
  closedSub: {
    color: '#B8B0C8',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 22,
    lineHeight: 20,
  },
  drawBtn: {
    width: '100%',
    backgroundColor: '#D4AF37',
    paddingVertical: 15,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  drawBtnText: { color: '#120E08', fontSize: 15, fontWeight: '800' },
  readingCard: {
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: '#34294B',
    alignItems: 'center',
  },
  symbol: { fontSize: 48, marginBottom: 8 },
  readingTitle: {
    color: '#F6F1E7',
    fontSize: 21,
    fontWeight: '800',
    textAlign: 'center',
  },
  readingMsg: {
    color: '#E5DFEE',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 10,
  },
  box: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    padding: 14,
    marginTop: 18,
  },
  boxLabel: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  boxText: { color: '#DFD8EA', fontSize: 14, lineHeight: 20 },
  metaRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  metaBox: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    padding: 12,
  },
  numbersText: { color: '#F6F1E7', fontSize: 15, fontWeight: '800' },
  candleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  candleText: { color: '#F6F1E7', fontSize: 14, fontWeight: '700' },
  extraBtn: {
    width: '100%',
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 14,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  extraBtnText: { color: '#D4AF37', fontSize: 14, fontWeight: '800' },
  counterText: { color: '#7E768E', fontSize: 12, marginTop: 10 },
});
