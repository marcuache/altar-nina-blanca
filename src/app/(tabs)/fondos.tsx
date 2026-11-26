import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system/legacy';
import { LinearGradient } from 'expo-linear-gradient';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppState } from '../../context/AppStateContext';
import { LOCAL_WALLPAPER_IMAGES } from '../../data/localWallpapers';
import { WallpaperItem } from '../../types/content';

const CATEGORIES = ['Todos', 'Protección', 'Abundancia', 'Amor', 'Altar'] as const;

async function resolveLocalFileUri(item: WallpaperItem): Promise<string | null> {
  const localAsset = LOCAL_WALLPAPER_IMAGES[item.id];
  const sourceUri = item.imageUrl ?? (localAsset ? Image.resolveAssetSource(localAsset)?.uri : undefined);
  if (!sourceUri) return null;

  if (sourceUri.startsWith('file://')) {
    return sourceUri;
  }

  const target = `${FileSystem.cacheDirectory}wallpaper-${item.id}.jpg`;
  const result = await FileSystem.downloadAsync(sourceUri, target);
  return result.uri;
}

export default function FondosScreen() {
  const { content, isAdFree, setPaywallVisible } = useAppState();
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('Todos');
  const [selected, setSelected] = useState<WallpaperItem | null>(null);
  const [busy, setBusy] = useState(false);

  const items =
    category === 'Todos'
      ? content.wallpapers
      : content.wallpapers.filter((w) => w.category === category);

  const performSaveToGallery = async (item: WallpaperItem) => {
    setBusy(true);
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permiso requerido',
          'Permite el acceso a fotos para guardar el fondo en tu galería.'
        );
        return;
      }

      const fileUri = await resolveLocalFileUri(item);
      if (!fileUri) {
        Alert.alert(
          'Sin imagen descargable',
          'Este fondo aún usa vista previa de color. Los fondos con arte HD ya se guardan directo.'
        );
        return;
      }

      await MediaLibrary.saveToLibraryAsync(fileUri);
      Alert.alert(
        '¡Guardado en tu galería!',
        `"${item.title}" ya está en tu galería para usarlo como fondo de pantalla.`
      );
    } catch {
      Alert.alert('Error', 'No se pudo guardar la imagen en este momento.');
    } finally {
      setBusy(false);
    }
  };

  const handleSave = (item: WallpaperItem) => {
    if (isAdFree) {
      performSaveToGallery(item);
      return;
    }

    Alert.alert(
      'Descargar fondo HD',
      `Mira un anuncio corto para guardar "${item.title}" en tu galería o quita todos los anuncios de por vida.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Quitar anuncios ($2.99)', onPress: () => setPaywallVisible(true) },
        {
          text: 'Ver anuncio (Simular)',
          onPress: () => performSaveToGallery(item),
        },
      ]
    );
  };

  const handleShareImage = async (item: WallpaperItem) => {
    setBusy(true);
    try {
      const fileUri = await resolveLocalFileUri(item);
      if (fileUri && (await Sharing.isAvailableAsync())) {
        await Sharing.shareAsync(fileUri, {
          dialogTitle: `Compartir ${item.title}`,
        });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.kicker}>GALERÍA DEVOCIONAL</Text>
        <Text style={styles.title}>Fondos de Pantalla</Text>
      </View>

      <View style={styles.catContainer}>
        <FlatList
          horizontal
          data={CATEGORIES}
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
                <Text style={[styles.catText, active && styles.catTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => {
          const localImg = LOCAL_WALLPAPER_IMAGES[item.id];
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => setSelected(item)}
              activeOpacity={0.85}
            >
              {item.imageUrl ? (
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.cardImage}
                />
              ) : localImg ? (
                <Image source={localImg} style={styles.cardImage} />
              ) : (
                <LinearGradient
                  colors={item.gradientColors}
                  style={styles.cardBg}
                >
                  <Ionicons
                    name="sparkles-outline"
                    size={34}
                    color={item.accentColor}
                  />
                </LinearGradient>
              )}
              <View style={styles.cardOverlay}>
                <Text style={styles.cardCat}>{item.category}</Text>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <Modal
        visible={Boolean(selected)}
        transparent
        animationType="fade"
        onRequestClose={() => setSelected(null)}
      >
        {selected ? (
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <LinearGradient
                colors={selected.gradientColors}
                style={styles.previewBox}
              >
                {selected.imageUrl ? (
                  <Image
                    source={{ uri: selected.imageUrl }}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover"
                  />
                ) : LOCAL_WALLPAPER_IMAGES[selected.id] ? (
                  <Image
                    source={LOCAL_WALLPAPER_IMAGES[selected.id]}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover"
                  />
                ) : (
                  <Ionicons
                    name="flame"
                    size={64}
                    color={selected.accentColor}
                  />
                )}
              </LinearGradient>

              <Text style={styles.modalTitle}>{selected.title}</Text>
              <Text style={styles.modalCat}>{selected.category}</Text>

              <TouchableOpacity
                style={styles.downloadBtn}
                onPress={() => handleSave(selected)}
                disabled={busy}
              >
                <Ionicons name="download-outline" size={18} color="#120E08" />
                <Text style={styles.downloadBtnText}>
                  {busy
                    ? 'Guardando...'
                    : isAdFree
                    ? 'Guardar en galería'
                    : 'Guardar en galería (Anuncio)'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shareBtn}
                onPress={() => handleShareImage(selected)}
                disabled={busy}
              >
                <Ionicons
                  name="share-social-outline"
                  size={17}
                  color="#D4AF37"
                />
                <Text style={styles.shareBtnText}>Compartir imagen</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeModalBtn}
                onPress={() => setSelected(null)}
              >
                <Text style={styles.closeModalText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </Modal>
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
  catContainer: { marginBottom: 8 },
  catList: { paddingHorizontal: 18, gap: 8 },
  catChip: {
    backgroundColor: '#15121E',
    borderWidth: 1,
    borderColor: '#2A2338',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  catChipActive: {
    backgroundColor: '#D4AF37',
    borderColor: '#D4AF37',
  },
  catText: { color: '#B8B0C8', fontSize: 13, fontWeight: '700' },
  catTextActive: { color: '#120E08' },
  grid: { padding: 18, paddingBottom: 28, gap: 12 },
  row: { gap: 12 },
  card: {
    flex: 1,
    height: 220,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2338',
    backgroundColor: '#14111C',
  },
  cardImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  cardBg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardOverlay: {
    padding: 12,
    backgroundColor: 'rgba(11, 9, 16, 0.82)',
  },
  cardCat: { color: '#D4AF37', fontSize: 10, fontWeight: '800' },
  cardTitle: { color: '#F6F1E7', fontSize: 14, fontWeight: '700', marginTop: 2 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(5, 4, 10, 0.88)',
    justifyContent: 'center',
    padding: 22,
  },
  modalCard: {
    backgroundColor: '#16131E',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#362D47',
    alignItems: 'center',
  },
  previewBox: {
    width: '100%',
    height: 310,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 14,
  },
  modalTitle: { color: '#F6F1E7', fontSize: 19, fontWeight: '800' },
  modalCat: { color: '#A79EB8', fontSize: 13, marginTop: 2, marginBottom: 18 },
  downloadBtn: {
    width: '100%',
    backgroundColor: '#D4AF37',
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  downloadBtnText: { color: '#120E08', fontSize: 14, fontWeight: '800' },
  shareBtn: {
    width: '100%',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  shareBtnText: { color: '#D4AF37', fontSize: 14, fontWeight: '700' },
  closeModalBtn: { marginTop: 12, paddingVertical: 6 },
  closeModalText: { color: '#A79EB8', fontSize: 13 },
});
