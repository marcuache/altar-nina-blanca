import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppState } from '../../context/AppStateContext';
import { CANDLE_COLORS } from '../../data/seedContent';
import { CandleColorId } from '../../types/content';
import { syncVeladoraWidget } from '../../widgets/updateWidget';

function formatTimer(ms: number): string {
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return `${hours} h ${mins.toString().padStart(2, '0')} min restantes`;
}

export default function VeladoraScreen() {
  const { candle, candleRemainingMs, lightCandle, extinguishCandle } = useAppState();
  const [selectedId, setSelectedId] = useState<CandleColorId>(
    candle.colorId ?? 'blanca'
  );
  const [intention, setIntention] = useState(candle.intention ?? '');
  const pulse = useRef(new Animated.Value(1)).current;

  const isLit = Boolean(candle.colorId && candleRemainingMs > 0);
  const displayColor =
    CANDLE_COLORS.find((c) => c.id === (isLit ? candle.colorId : selectedId)) ??
    CANDLE_COLORS[0];

  useEffect(() => {
    if (!isLit) {
      pulse.setValue(1);
      return;
    }
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.15,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.96,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [isLit, pulse]);

  const handleLight = async () => {
    await lightCandle(selectedId, intention);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.kicker}>DEVOCIÓN DE 24 HORAS</Text>
        <Text style={styles.title}>Veladora Virtual</Text>

        {/* Altar visual de la vela */}
        <View style={styles.altarBox}>
          <View style={styles.candleStage}>
            {isLit ? (
              <Animated.View
                style={[
                  styles.flameGlow,
                  {
                    backgroundColor: displayColor.glowColor,
                    transform: [{ scale: pulse }],
                  },
                ]}
              />
            ) : null}

            <View style={styles.flameWrapper}>
              <Ionicons
                name="flame"
                size={46}
                color={isLit ? '#FFB300' : '#3C354A'}
              />
            </View>

            <View
              style={[
                styles.candleGlass,
                { backgroundColor: displayColor.waxColor },
              ]}
            >
              <View style={styles.candleHighlight} />
            </View>
          </View>

          <Text style={styles.candleName}>{displayColor.name}</Text>
          <Text style={styles.candleMeaning}>{displayColor.meaning}</Text>

          {isLit ? (
            <View style={styles.litBadge}>
              <Ionicons name="time-outline" size={15} color="#D4AF37" />
              <Text style={styles.litBadgeText}>
                {formatTimer(candleRemainingMs)}
              </Text>
            </View>
          ) : null}
        </View>

        {/* Selector de 7 colores */}
        <Text style={styles.sectionLabel}>ELIGE EL COLOR DE TU VELADORA</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.colorRow}
        >
          {CANDLE_COLORS.map((item) => {
            const active = (isLit ? candle.colorId : selectedId) === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.colorChip, active && styles.colorChipActive]}
                onPress={() => {
                  if (!isLit) setSelectedId(item.id);
                }}
                disabled={isLit}
                activeOpacity={0.8}
              >
                <View
                  style={[styles.colorDot, { backgroundColor: item.waxColor }]}
                />
                <Text
                  style={[
                    styles.colorChipText,
                    active && styles.colorChipTextActive,
                  ]}
                >
                  {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Oración y propósito del color */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Propósito</Text>
          <Text style={styles.infoBody}>{displayColor.purpose}</Text>
          <Text style={[styles.infoTitle, { marginTop: 12 }]}>
            Oración sugerida
          </Text>
          <Text style={styles.infoPrayer}>“{displayColor.prayer}”</Text>
        </View>

        {/* Intención */}
        {!isLit ? (
          <TextInput
            style={styles.input}
            placeholder="Escribe tu petición o agradecimiento (opcional)..."
            placeholderTextColor="#6E6680"
            value={intention}
            onChangeText={setIntention}
            multiline
            maxLength={160}
          />
        ) : candle.intention ? (
          <View style={styles.intentionBox}>
            <Text style={styles.sectionLabel}>TU PETICIÓN ACTIVA</Text>
            <Text style={styles.intentionText}>{candle.intention}</Text>
          </View>
        ) : null}

        {/* Botón principal */}
        {!isLit ? (
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={handleLight}
            activeOpacity={0.85}
          >
            <Ionicons name="flame" size={18} color="#120E08" />
            <Text style={styles.primaryBtnText}>Encender por 24 horas</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={extinguishCandle}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryBtnText}>
              Apagar y cambiar veladora
            </Text>
          </TouchableOpacity>
        )}

        {/* Tarjeta para agregar Widget a la pantalla de inicio */}
        <View style={styles.widgetCard}>
          <View style={styles.widgetHeader}>
            <View style={styles.widgetIcon}>
              <Ionicons name="apps-outline" size={20} color="#D4AF37" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.widgetTitle}>
                Widget para tu pantalla de inicio
              </Text>
              <Text style={styles.widgetSub}>
                Mira tu veladora encendida y cuánto tiempo le queda sin abrir la
                app.
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.widgetBtn}
            onPress={async () => {
              await syncVeladoraWidget();
              Alert.alert(
                'Cómo agregar el Widget en Android',
                '1. Ve a la pantalla de inicio de tu celular y mantén presionado un espacio vacío.\n2. Toca en "Widgets".\n3. Busca "Altar de la Niña Blanca" y arrastra "Veladora — Niña Blanca" a tu pantalla.\n\nNota: Disponible al instalar la versión compilada (.apk / Google Play), no en Expo Go.'
              );
            }}
            activeOpacity={0.85}
          >
            <Ionicons name="add-circle-outline" size={17} color="#D4AF37" />
            <Text style={styles.widgetBtnText}>Agregar widget a mi inicio</Text>
          </TouchableOpacity>
        </View>
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
  altarBox: {
    backgroundColor: '#14111D',
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: '#2B243B',
    alignItems: 'center',
  },
  candleStage: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 14,
  },
  flameGlow: {
    position: 'absolute',
    top: 4,
    width: 82,
    height: 82,
    borderRadius: 41,
    opacity: 0.28,
  },
  flameWrapper: {
    marginBottom: -6,
    zIndex: 2,
  },
  candleGlass: {
    width: 64,
    height: 92,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  candleHighlight: {
    width: 12,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.16)',
    marginLeft: 8,
  },
  candleName: {
    color: '#F6F1E7',
    fontSize: 19,
    fontWeight: '800',
  },
  candleMeaning: {
    color: '#A79EB8',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
  litBadge: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(212, 175, 55, 0.14)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  litBadgeText: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionLabel: {
    color: '#A79EB8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  colorRow: { gap: 10, paddingVertical: 4 },
  colorChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#15121E',
    borderWidth: 1,
    borderColor: '#2A2338',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
  },
  colorChipActive: {
    borderColor: '#D4AF37',
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  colorChipText: { color: '#B8B0C8', fontSize: 13, fontWeight: '600' },
  colorChipTextActive: { color: '#F6F1E7', fontWeight: '800' },
  infoCard: {
    backgroundColor: '#14111C',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#272134',
  },
  infoTitle: { color: '#D4AF37', fontSize: 12, fontWeight: '800' },
  infoBody: { color: '#DFD8EA', fontSize: 14, marginTop: 4, lineHeight: 20 },
  infoPrayer: {
    color: '#C7BED6',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 4,
    lineHeight: 20,
  },
  input: {
    backgroundColor: '#14111C',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2B243B',
    color: '#F6F1E7',
    padding: 14,
    fontSize: 14,
    minHeight: 74,
    textAlignVertical: 'top',
  },
  intentionBox: {
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
  },
  intentionText: { color: '#F6F1E7', fontSize: 14, marginTop: 6 },
  primaryBtn: {
    backgroundColor: '#D4AF37',
    borderRadius: 14,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryBtnText: { color: '#120E08', fontSize: 15, fontWeight: '800' },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#3A314C',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryBtnText: { color: '#C7BED6', fontSize: 14, fontWeight: '700' },
  widgetCard: {
    marginTop: 4,
    backgroundColor: '#14111C',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2B243B',
    gap: 12,
  },
  widgetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  widgetIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(212, 175, 55, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  widgetTitle: {
    color: '#F6F1E7',
    fontSize: 15,
    fontWeight: '700',
  },
  widgetSub: {
    color: '#9C92AE',
    fontSize: 12,
    marginTop: 2,
    lineHeight: 17,
  },
  widgetBtn: {
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 12,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  widgetBtnText: {
    color: '#D4AF37',
    fontSize: 13,
    fontWeight: '800',
  },
});
