export type CandleColorId =
  | 'blanca'
  | 'roja'
  | 'negra'
  | 'dorada'
  | 'morada'
  | 'verde'
  | 'azul';

export interface CandleColorInfo {
  id: CandleColorId;
  name: string;
  meaning: string;
  purpose: string;
  prayer: string;
  waxColor: string;
  glowColor: string;
}

export interface DailyPhrase {
  id: string;
  date?: string;
  title: string;
  phrase: string;
  prayer: string;
  reflection: string;
}

export interface FortuneReading {
  id: string;
  symbol: string;
  title: string;
  message: string;
  advice: string;
  luckyNumbers: string;
  recommendedCandle: CandleColorId;
}

export interface WallpaperItem {
  id: string;
  title: string;
  category: 'Protección' | 'Abundancia' | 'Amor' | 'Altar';
  imageUrl?: string;
  gradientColors: [string, string, string];
  accentColor: string;
  isPremium?: boolean;
}

export interface RemoteContentPayload {
  version: number;
  updatedAt: string;
  phrases: DailyPhrase[];
  readings: FortuneReading[];
  wallpapers: WallpaperItem[];
}
