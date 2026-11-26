import React from 'react';
import { FlexWidget, TextWidget } from 'react-native-android-widget';

export interface VeladoraWidgetProps {
  isLit: boolean;
  candleName?: string;
  remainingText?: string;
  intention?: string;
  accentColor?: string;
}

export function VeladoraWidget({
  isLit,
  candleName = 'Veladora Virtual',
  remainingText = '',
  intention = '',
  accentColor = '#D4AF37',
}: VeladoraWidgetProps) {
  return (
    <FlexWidget
      clickAction="OPEN_APP"
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#120F1A',
        borderRadius: 20,
        padding: 14,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#362D47',
      }}
    >
      <FlexWidget
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 'match_parent',
        }}
      >
        <TextWidget
          text="🕯️ NIÑA BLANCA"
          style={{
            fontSize: 11,
            fontWeight: 'bold',
            color: '#D4AF37',
          }}
        />
        <TextWidget
          text={isLit ? 'ENCENDIDA' : 'APAGADA'}
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            color: isLit ? '#69F0AE' : '#8B839B',
          }}
        />
      </FlexWidget>

      <FlexWidget style={{ flexDirection: 'column', marginTop: 6 }}>
        <TextWidget
          text={isLit ? candleName : 'Sin veladora activa'}
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: isLit ? (accentColor as `#${string}`) : '#F6F1E7',
          }}
        />
        <TextWidget
          text={
            isLit
              ? remainingText
              : 'Toca aquí para encender una veladora por 24h'
          }
          style={{
            fontSize: 12,
            color: '#DFD8EA',
            marginTop: 3,
          }}
        />
      </FlexWidget>

      {isLit && intention ? (
        <TextWidget
          text={`“${intention}”`}
          maxLines={1}
          style={{
            fontSize: 11,
            fontStyle: 'italic',
            color: '#A79EB8',
            marginTop: 4,
          }}
        />
      ) : (
        <TextWidget
          text="Altar de la Niña Blanca"
          style={{
            fontSize: 10,
            color: '#7E768E',
            marginTop: 4,
          }}
        />
      )}
    </FlexWidget>
  );
}
