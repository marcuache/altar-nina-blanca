import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const DAILY_ENABLED_KEY = '@nina_blanca_daily_notif_v1';
const CANDLE_NOTIF_ID_KEY = '@nina_blanca_candle_notif_id_v1';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function ensureNotificationPermissions(): Promise<boolean> {
  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('altar-diario', {
        name: 'Altar Diario',
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }
    const existing = await Notifications.getPermissionsAsync();
    if (existing.status === 'granted') return true;

    const requested = await Notifications.requestPermissionsAsync();
    return requested.status === 'granted';
  } catch {
    return false;
  }
}

export async function isDailyReminderEnabled(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(DAILY_ENABLED_KEY)) === 'true';
  } catch {
    return false;
  }
}

export async function setDailyPrayerReminder(enabled: boolean): Promise<boolean> {
  try {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    for (const item of scheduled) {
      if (item.content.data?.kind === 'daily-prayer') {
        await Notifications.cancelScheduledNotificationAsync(item.identifier);
      }
    }

    if (!enabled) {
      await AsyncStorage.setItem(DAILY_ENABLED_KEY, 'false');
      return false;
    }

    const granted = await ensureNotificationPermissions();
    if (!granted) return false;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🕯️ Tu frase y oración del día',
        body: 'Entra al Altar de la Niña Blanca para ver tu mensaje de hoy.',
        data: { kind: 'daily-prayer' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 8,
        minute: 30,
      },
    });

    await AsyncStorage.setItem(DAILY_ENABLED_KEY, 'true');
    return true;
  } catch {
    return false;
  }
}

export async function scheduleCandleExpiringReminder(
  candleName: string
): Promise<void> {
  try {
    await cancelCandleExpiringReminder();
    const granted = await ensureNotificationPermissions();
    if (!granted) return;

    // Avisa 1 hora antes de que se cumplan las 24 horas (23 horas = 82800s)
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: `🕯️ Tu ${candleName} está por consumirse`,
        body: 'Falta 1 hora para completar las 24 horas. Puedes renovarla en tu Altar.',
        data: { kind: 'candle-reminder' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 23 * 60 * 60,
        repeats: false,
      },
    });

    await AsyncStorage.setItem(CANDLE_NOTIF_ID_KEY, id);
  } catch {
    // Ignorar si no hay soporte en el entorno actual
  }
}

export async function cancelCandleExpiringReminder(): Promise<void> {
  try {
    const prevId = await AsyncStorage.getItem(CANDLE_NOTIF_ID_KEY);
    if (prevId) {
      await Notifications.cancelScheduledNotificationAsync(prevId);
      await AsyncStorage.removeItem(CANDLE_NOTIF_ID_KEY);
    }
  } catch {
    // Ignorar
  }
}
