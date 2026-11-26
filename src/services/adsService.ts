import { Platform } from 'react-native';

export const ADMOB_UNIT_IDS = {
  appId: 'ca-app-pub-2785713684400781~7279018233',
  banner: 'ca-app-pub-2785713684400781/9880810040',
  rewarded: 'ca-app-pub-2785713684400781/2102713173',
};

type GoogleMobileAdsModule = typeof import('react-native-google-mobile-ads');

export function getAdsModule(): GoogleMobileAdsModule | null {
  if (Platform.OS !== 'android' && Platform.OS !== 'ios') return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('react-native-google-mobile-ads') as GoogleMobileAdsModule;
  } catch {
    return null;
  }
}

export async function initializeAds(): Promise<void> {
  const mod = getAdsModule();
  if (!mod?.default) return;
  try {
    await mod.default().initialize();
  } catch {
    // Ignorar en Expo Go
  }
}

export function getBannerUnitId(): string {
  const mod = getAdsModule();
  if (!mod) return ADMOB_UNIT_IDS.banner;
  return __DEV__ ? mod.TestIds.BANNER : ADMOB_UNIT_IDS.banner;
}

export function getRewardedUnitId(): string {
  const mod = getAdsModule();
  if (!mod) return ADMOB_UNIT_IDS.rewarded;
  return __DEV__ ? mod.TestIds.REWARDED : ADMOB_UNIT_IDS.rewarded;
}

export async function showRewardedAd(): Promise<'rewarded' | 'unavailable' | 'dismissed'> {
  const mod = getAdsModule();
  if (!mod) return 'unavailable';

  const { RewardedAd, RewardedAdEventType, AdEventType } = mod;
  const unitId = getRewardedUnitId();

  return new Promise((resolve) => {
    let earned = false;
    let settled = false;

    const finish = (result: 'rewarded' | 'unavailable' | 'dismissed') => {
      if (settled) return;
      settled = true;
      resolve(result);
    };

    try {
      const ad = RewardedAd.createForAdRequest(unitId);

      const unsubLoaded = ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
        ad.show().catch(() => finish('unavailable'));
      });

      const unsubEarned = ad.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        () => {
          earned = true;
        }
      );

      const unsubClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
        unsubLoaded();
        unsubEarned();
        unsubClosed();
        unsubError();
        finish(earned ? 'rewarded' : 'dismissed');
      });

      const unsubError = ad.addAdEventListener(AdEventType.ERROR, () => {
        unsubLoaded();
        unsubEarned();
        unsubClosed();
        unsubError();
        finish('unavailable');
      });

      ad.load();
    } catch {
      finish('unavailable');
    }
  });
}
