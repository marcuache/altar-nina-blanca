import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  PRAYER_CATEGORIES,
  PRAYERS,
  PrayerCategory,
  SYMBOLS_GUIDE,
} from '../../data/prayersAndSymbols';

export default function OracionesScreen() {
  const [section, setSection] = useState<'oraciones' | 'simbologia'>('oraciones');
  const [category, setCategory] = useState<PrayerCategory>('Protección');

  const filteredPrayers = PRAYERS.filter((p) => p.category === category);

  const handleSharePrayer = async (title: string, text: string) => {
    try {
      await Share.share({
        message: `🙏 *${title}* — Altar de la Niña Blanca\n\n${text}`,
      });
    } catch {
      // Cancelado
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.kicker}>GUÍA ESPIRITUAL</Text>
        <Text style={styles.title}>Oraciones y Altar</Text>

        {/* Sub-tabs */}
        <View style={styles.segment}>
          <TouchableOpacity
            style={[
              styles.segmentBtn,
              section === 'oraciones' && styles.segmentBtnActive,
            ]}
            onPress={() => setSection('oraciones')}
          >
            <Text
              style={[
                styles.segmentText,
                section === 'oraciones' && styles.segmentTextActive,
              ]}
            >
              Oraciones
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.segmentBtn,
              section === 'simbologia' && styles.segmentBtnActive,
            ]}
            onPress={() => setSection('simbologia')}
          >
            <Text
              style={[
                styles.segmentText,
                section === 'simbologia' && styles.segmentTextActive,
              ]}
            >
              Simbología y Ofrendas
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {section === 'oraciones' ? (
        <View style={{ flex: 1 }}>
          <View style={styles.catWrap}>
            <FlatList
              horizontal
              data={PRAYER_CATEGORIES}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.catList}
              renderItem={({ item }) => {
                const active = category === item;
                return (
                  <TouchableOpacity
                    style={[styles.catChip, active && styles.catChipActive]}
                    onPress={() => setCategory(item)}
                  >
                    <Text
                      style={[styles.catText, active && styles.catTextActive]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          <ScrollView
            contentContainerStyle={styles.listScroll}
            showsVerticalScrollIndicator={false}
          >
            {filteredPrayers.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTag}>{item.recommendedCandle}</Text>
                  <TouchableOpacity
                    onPress={() => handleSharePrayer(item.title, item.text)}
                  >
                    <Ionicons
                      name="share-social-outline"
                      size={18}
                      color="#D4AF37"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardBody}>“{item.text}”</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.listScroll}
          showsVerticalScrollIndicator={false}
        >
          {SYMBOLS_GUIDE.map((sym) => (
            <View key={sym.id} style={styles.card}>
              <View style={styles.symHeader}>
                <Text style={styles.symEmoji}>{sym.emoji}</Text>
                <Text style={styles.cardTitle}>{sym.name}</Text>
              </View>
              <Text style={styles.cardBody}>{sym.meaning}</Text>
              <View style={styles.tipBox}>
                <Ionicons name="sparkles" size={14} color="#D4AF37" />
                <Text style={styles.tipText}>{sym.altarTip}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0B0910' },
  header: { paddingHorizontal: 18, paddingTop: 18, paddingBottom: 10 },
  kicker: {
    color: '#D4AF37',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  title: { color: '#F6F1E7', fontSize: 24, fontWeight: '800', marginTop: 2 },
  segment: {
    flexDirection: 'row',
    backgroundColor: '#15121E',
    borderRadius: 12,
    padding: 4,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#2A2338',
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 9,
    alignItems: 'center',
  },
  segmentBtnActive: {
    backgroundColor: '#D4AF37',
  },
  segmentText: { color: '#A79EB8', fontSize: 13, fontWeight: '700' },
  segmentTextActive: { color: '#120E08', fontWeight: '800' },
  catWrap: { marginBottom: 8 },
  catList: { paddingHorizontal: 18, gap: 8 },
  catChip: {
    backgroundColor: '#15121E',
    borderWidth: 1,
    borderColor: '#2A2338',
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 999,
  },
  catChipActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.16)',
    borderColor: '#D4AF37',
  },
  catText: { color: '#B8B0C8', fontSize: 13, fontWeight: '600' },
  catTextActive: { color: '#D4AF37', fontWeight: '800' },
  listScroll: { padding: 18, paddingBottom: 28, gap: 14 },
  card: {
    backgroundColor: '#14111C',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#282236',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTag: {
    color: '#D4AF37',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  cardTitle: { color: '#F6F1E7', fontSize: 17, fontWeight: '800' },
  cardBody: {
    color: '#D7CFE4',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
  },
  symHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  symEmoji: { fontSize: 26 },
  tipBox: {
    marginTop: 12,
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tipText: { color: '#EFE7D6', fontSize: 12, flex: 1, lineHeight: 17 },
});
