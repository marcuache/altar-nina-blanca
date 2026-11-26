import { Platform } from 'react-native';
import { buildVeladoraWidgetElement } from './widgetTaskHandler';

export async function syncVeladoraWidget(): Promise<void> {
  if (Platform.OS !== 'android') return;

  try {
    const { requestWidgetUpdate } = await import('react-native-android-widget');
    const element = await buildVeladoraWidgetElement();
    await requestWidgetUpdate({
      widgetName: 'VeladoraWidget',
      renderWidget: () => element,
    });
  } catch {
    // En Expo Go el módulo nativo del widget no está registrado; se ignora sin error.
  }
}
