import AsyncStorage from '@react-native-async-storage/async-storage';
import { SEED_PAYLOAD } from '../data/seedContent';
import { DailyPhrase, FortuneReading, RemoteContentPayload } from '../types/content';

const CACHE_KEY = '@nina_blanca_remote_content_v1';

// URL pública donde el script automático (GitHub Actions / Supabase / Cloudflare) sube el JSON actualizado.
// Mientras esté vacía o falle la red, la app usa el contenido local incluido y el caché guardado.
export const REMOTE_CONTENT_URL = '';

export async function loadContent(): Promise<RemoteContentPayload> {
  let base = SEED_PAYLOAD;

  try {
    const cachedRaw = await AsyncStorage.getItem(CACHE_KEY);
    if (cachedRaw) {
      const cached = JSON.parse(cachedRaw) as RemoteContentPayload;
      if (cached?.phrases?.length && cached?.readings?.length) {
        base = cached;
      }
    }
  } catch {
    // Ignorar errores de lectura de caché
  }

  if (!REMOTE_CONTENT_URL) {
    return base;
  }

  try {
    const response = await fetch(REMOTE_CONTENT_URL, {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return base;

    const remote = (await response.json()) as RemoteContentPayload;
    if (remote?.phrases?.length && remote?.readings?.length) {
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(remote));
      return remote;
    }
  } catch {
    // Sin conexión o error temporal: usar caché/local
  }

  return base;
}

export function getDayOfYear(date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getTodayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function pickDailyPhrase(phrases: DailyPhrase[], date = new Date()): DailyPhrase {
  const todayKey = getTodayKey(date);
  const exactMatch = phrases.find((p) => p.date === todayKey);
  if (exactMatch) return exactMatch;

  const index = getDayOfYear(date) % phrases.length;
  return phrases[index] ?? SEED_PAYLOAD.phrases[0];
}

export function pickRandomReading(
  readings: FortuneReading[],
  excludeId?: string
): FortuneReading {
  const pool = readings.filter((r) => r.id !== excludeId);
  const source = pool.length > 0 ? pool : readings;
  const idx = Math.floor(Math.random() * source.length);
  return source[idx] ?? SEED_PAYLOAD.readings[0];
}
