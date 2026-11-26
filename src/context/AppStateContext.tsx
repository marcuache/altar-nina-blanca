import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { CANDLE_COLORS, SEED_PAYLOAD } from '../data/seedContent';
import {
  getTodayKey,
  loadContent,
  pickDailyPhrase,
  pickRandomReading,
} from '../services/contentService';
import {
  cancelCandleExpiringReminder,
  scheduleCandleExpiringReminder,
} from '../services/notificationsService';
import {
  purchaseLifetimeFromStore,
  restoreLifetimeFromStore,
} from '../services/billingService';
import {
  CandleColorId,
  DailyPhrase,
  FortuneReading,
  RemoteContentPayload,
} from '../types/content';
import { syncVeladoraWidget } from '../widgets/updateWidget';

const STORAGE_KEYS = {
  AD_FREE: '@nina_blanca_ad_free_v1',
  CANDLE: '@nina_blanca_candle_v1',
  READING: '@nina_blanca_reading_v1',
};

const CANDLE_DURATION_MS = 24 * 60 * 60 * 1000;

export interface CandleState {
  colorId: CandleColorId | null;
  litAt: number | null;
  intention: string;
}

interface DailyReadingStorage {
  dateKey: string;
  readingId: string;
  drawsToday: number;
}

interface AppStateContextValue {
  content: RemoteContentPayload;
  dailyPhrase: DailyPhrase;
  isAdFree: boolean;
  isLoading: boolean;
  candle: CandleState;
  candleRemainingMs: number;
  todayReading: FortuneReading | null;
  drawsToday: number;
  paywallVisible: boolean;
  setPaywallVisible: (visible: boolean) => void;
  lightCandle: (colorId: CandleColorId, intention: string) => Promise<void>;
  extinguishCandle: () => Promise<void>;
  drawFortuneReading: (viaRewardedAd?: boolean) => Promise<FortuneReading>;
  unlockLifetimeAdFree: () => Promise<void>;
  restorePurchase: () => Promise<boolean>;
  refreshRemoteContent: () => Promise<void>;
}

const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<RemoteContentPayload>(SEED_PAYLOAD);
  const [isAdFree, setIsAdFree] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paywallVisible, setPaywallVisible] = useState(false);
  const [candle, setCandle] = useState<CandleState>({
    colorId: null,
    litAt: null,
    intention: '',
  });
  const [candleRemainingMs, setCandleRemainingMs] = useState(0);
  const [readingStorage, setReadingStorage] = useState<DailyReadingStorage | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [loadedContent, adFreeRaw, candleRaw, readingRaw] = await Promise.all([
          loadContent(),
          AsyncStorage.getItem(STORAGE_KEYS.AD_FREE),
          AsyncStorage.getItem(STORAGE_KEYS.CANDLE),
          AsyncStorage.getItem(STORAGE_KEYS.READING),
        ]);

        if (!mounted) return;
        setContent(loadedContent);
        setIsAdFree(adFreeRaw === 'true');

        if (candleRaw) {
          const parsedCandle = JSON.parse(candleRaw) as CandleState;
          if (parsedCandle.litAt && Date.now() - parsedCandle.litAt < CANDLE_DURATION_MS) {
            setCandle(parsedCandle);
          } else {
            await AsyncStorage.removeItem(STORAGE_KEYS.CANDLE);
          }
        }

        if (readingRaw) {
          const parsedReading = JSON.parse(readingRaw) as DailyReadingStorage;
          if (parsedReading.dateKey === getTodayKey()) {
            setReadingStorage(parsedReading);
          }
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const updateRemaining = () => {
      if (!candle.litAt) {
        setCandleRemainingMs(0);
        return;
      }
      const remaining = Math.max(0, CANDLE_DURATION_MS - (Date.now() - candle.litAt));
      setCandleRemainingMs(remaining);
      if (remaining === 0) {
        setCandle({ colorId: null, litAt: null, intention: '' });
        AsyncStorage.removeItem(STORAGE_KEYS.CANDLE).catch(() => {});
      }
    };

    updateRemaining();
    const timer = setInterval(updateRemaining, 30000);
    return () => clearInterval(timer);
  }, [candle.litAt]);

  const lightCandle = useCallback(async (colorId: CandleColorId, intention: string) => {
    const next: CandleState = {
      colorId,
      litAt: Date.now(),
      intention: intention.trim(),
    };
    setCandle(next);
    await AsyncStorage.setItem(STORAGE_KEYS.CANDLE, JSON.stringify(next));
    const info = CANDLE_COLORS.find((c) => c.id === colorId);
    await Promise.all([
      syncVeladoraWidget(),
      scheduleCandleExpiringReminder(info?.name ?? 'Veladora'),
    ]);
  }, []);

  const extinguishCandle = useCallback(async () => {
    setCandle({ colorId: null, litAt: null, intention: '' });
    await AsyncStorage.removeItem(STORAGE_KEYS.CANDLE);
    await Promise.all([syncVeladoraWidget(), cancelCandleExpiringReminder()]);
  }, []);

  const drawFortuneReading = useCallback(
    async (_viaRewardedAd = false) => {
      const todayKey = getTodayKey();
      const nextReading = pickRandomReading(content.readings, readingStorage?.readingId);
      const nextDraws =
        readingStorage && readingStorage.dateKey === todayKey
          ? readingStorage.drawsToday + 1
          : 1;

      const nextStorage: DailyReadingStorage = {
        dateKey: todayKey,
        readingId: nextReading.id,
        drawsToday: nextDraws,
      };
      setReadingStorage(nextStorage);
      await AsyncStorage.setItem(STORAGE_KEYS.READING, JSON.stringify(nextStorage));
      return nextReading;
    },
    [content.readings, readingStorage]
  );

  const unlockLifetimeAdFree = useCallback(async () => {
    const storeResult = await purchaseLifetimeFromStore();
    if (storeResult === 'purchased') {
      setIsAdFree(true);
      await AsyncStorage.setItem(STORAGE_KEYS.AD_FREE, 'true');
      setPaywallVisible(false);
      return;
    }

    if (storeResult === 'unavailable') {
      // En Expo Go o sin Play Store disponible, permite probar el estado Pro localmente.
      setIsAdFree(true);
      await AsyncStorage.setItem(STORAGE_KEYS.AD_FREE, 'true');
      setPaywallVisible(false);
      return;
    }

    if (storeResult === 'error') {
      throw new Error('No se pudo completar la compra en Google Play.');
    }
  }, []);

  const restorePurchase = useCallback(async () => {
    const storeResult = await restoreLifetimeFromStore();
    if (storeResult === 'restored') {
      setIsAdFree(true);
      await AsyncStorage.setItem(STORAGE_KEYS.AD_FREE, 'true');
      return true;
    }
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.AD_FREE);
    const active = raw === 'true';
    setIsAdFree(active);
    return active;
  }, []);

  const refreshRemoteContent = useCallback(async () => {
    const fresh = await loadContent();
    setContent(fresh);
  }, []);

  const dailyPhrase = pickDailyPhrase(content.phrases);
  const todayReading =
    readingStorage && readingStorage.dateKey === getTodayKey()
      ? content.readings.find((r) => r.id === readingStorage.readingId) ?? null
      : null;

  return (
    <AppStateContext.Provider
      value={{
        content,
        dailyPhrase,
        isAdFree,
        isLoading,
        candle,
        candleRemainingMs,
        todayReading,
        drawsToday:
          readingStorage && readingStorage.dateKey === getTodayKey()
            ? readingStorage.drawsToday
            : 0,
        paywallVisible,
        setPaywallVisible,
        lightCandle,
        extinguishCandle,
        drawFortuneReading,
        unlockLifetimeAdFree,
        restorePurchase,
        refreshRemoteContent,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState must be used inside AppStateProvider');
  }
  return ctx;
}
