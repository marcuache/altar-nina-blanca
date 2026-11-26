import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { CANDLE_COLORS } from '../data/seedContent';
import { CandleColorId } from '../types/content';
import { VeladoraWidget } from './VeladoraWidget';

const CANDLE_KEY = '@nina_blanca_candle_v1';
const CANDLE_DURATION_MS = 24 * 60 * 60 * 1000;

interface StoredCandle {
  colorId: CandleColorId | null;
  litAt: number | null;
  intention: string;
}

function formatRemaining(ms: number): string {
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return `${hours}h ${mins.toString().padStart(2, '0')}m restantes`;
}

export async function buildVeladoraWidgetElement() {
  try {
    const raw = await AsyncStorage.getItem(CANDLE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StoredCandle;
      if (parsed.litAt && parsed.colorId) {
        const remaining = CANDLE_DURATION_MS - (Date.now() - parsed.litAt);
        if (remaining > 0) {
          const info = CANDLE_COLORS.find((c) => c.id === parsed.colorId);
          return (
            <VeladoraWidget
              isLit
              candleName={info?.name ?? 'Veladora Encendida'}
              remainingText={formatRemaining(remaining)}
              intention={parsed.intention}
              accentColor={info?.glowColor ?? '#D4AF37'}
            />
          );
        }
      }
    }
  } catch {
    // Fallback a estado apagado
  }

  return <VeladoraWidget isLit={false} />;
}

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
    case 'WIDGET_UPDATE':
    case 'WIDGET_RESIZED': {
      if (props.widgetInfo.widgetName === 'VeladoraWidget') {
        const element = await buildVeladoraWidgetElement();
        props.renderWidget(element);
      }
      break;
    }
    default:
      break;
  }
}
