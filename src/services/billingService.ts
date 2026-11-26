import { Platform } from 'react-native';

export const LIFETIME_PRODUCT_ID = 'quitar_anuncios_lifetime';

type IapModule = typeof import('react-native-iap');

export function getIapModule(): IapModule | null {
  if (Platform.OS !== 'android' && Platform.OS !== 'ios') return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('react-native-iap') as IapModule;
  } catch {
    return null;
  }
}

export async function restoreLifetimeFromStore(): Promise<'restored' | 'none' | 'unavailable'> {
  const iap = getIapModule();
  if (!iap) return 'unavailable';

  try {
    const connected = await iap.initConnection();
    if (!connected) return 'unavailable';

    const purchases = await iap.getAvailablePurchases();
    const hasLifetime = purchases.some(
      (p) => p.productId === LIFETIME_PRODUCT_ID
    );
    return hasLifetime ? 'restored' : 'none';
  } catch {
    return 'unavailable';
  }
}

export async function purchaseLifetimeFromStore(): Promise<
  'purchased' | 'cancelled' | 'unavailable' | 'error'
> {
  const iap = getIapModule();
  if (!iap) return 'unavailable';

  try {
    const connected = await iap.initConnection();
    if (!connected) return 'unavailable';

    await iap.fetchProducts({ skus: [LIFETIME_PRODUCT_ID], type: 'in-app' });

    return await new Promise((resolve) => {
      let settled = false;
      const finish = (
        result: 'purchased' | 'cancelled' | 'unavailable' | 'error'
      ) => {
        if (settled) return;
        settled = true;
        subUpdate.remove();
        subError.remove();
        resolve(result);
      };

      const subUpdate = iap.purchaseUpdatedListener(async (purchase) => {
        if (purchase.productId === LIFETIME_PRODUCT_ID) {
          try {
            await iap.finishTransaction({ purchase, isConsumable: false });
          } catch {
            // Continuar aunque falle el acknowledge temporalmente
          }
          finish('purchased');
        }
      });

      const subError = iap.purchaseErrorListener((err) => {
        const code = String(err?.code ?? '').toLowerCase();
        if (code.includes('cancel')) {
          finish('cancelled');
        } else {
          finish('error');
        }
      });

      iap
        .requestPurchase({
          request: {
            apple: { sku: LIFETIME_PRODUCT_ID },
            google: { skus: [LIFETIME_PRODUCT_ID] },
          },
          type: 'in-app',
        })
        .catch(() => finish('error'));
    });
  } catch {
    return 'unavailable';
  }
}
