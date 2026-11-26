import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppState } from '../context/AppStateContext';

export function PaywallModal() {
  const {
    paywallVisible,
    setPaywallVisible,
    unlockLifetimeAdFree,
    restorePurchase,
  } = useAppState();
  const [processing, setProcessing] = useState(false);

  const handleBuy = async () => {
    setProcessing(true);
    try {
      await unlockLifetimeAdFree();
      Alert.alert(
        '¡Gracias por tu apoyo!',
        'Los anuncios han sido eliminados de por vida en esta app.'
      );
    } catch {
      Alert.alert(
        'Compra no completada',
        'No se pudo procesar el pago en Google Play. Intenta de nuevo más tarde.'
      );
    } finally {
      setProcessing(false);
    }
  };

  const handleRestore = async () => {
    setProcessing(true);
    try {
      const ok = await restorePurchase();
      Alert.alert(
        ok ? 'Compra restaurada' : 'Sin compras previas',
        ok
          ? 'Tu acceso sin anuncios de por vida está activo.'
          : 'No encontramos una compra previa en este dispositivo.'
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Modal
      visible={paywallVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setPaywallVisible(false)}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setPaywallVisible(false)}
          >
            <Ionicons name="close" size={22} color="#B8B0C8" />
          </TouchableOpacity>

          <View style={styles.iconCircle}>
            <Ionicons name="flame" size={32} color="#D4AF37" />
          </View>

          <Text style={styles.title}>Altar Sin Anuncios</Text>
          <Text style={styles.subtitle}>
            Pago único de por vida. Sin suscripciones ni cobros mensuales.
          </Text>

          <View style={styles.benefits}>
            <BenefitRow text="Cero anuncios en toda la aplicación" />
            <BenefitRow text="Lecturas de suerte ilimitadas cada día" />
            <BenefitRow text="Descarga directa de fondos sin esperar videos" />
            <BenefitRow text="Apoyas el mantenimiento del altar y nuevas oraciones" />
          </View>

          <TouchableOpacity
            style={styles.buyBtn}
            onPress={handleBuy}
            disabled={processing}
            activeOpacity={0.85}
          >
            <Text style={styles.buyBtnText}>
              {processing ? 'Procesando...' : 'Quitar anuncios de por vida · $2.99 USD'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.restoreBtn}
            onPress={handleRestore}
            disabled={processing}
          >
            <Text style={styles.restoreText}>Restaurar compra anterior</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function BenefitRow({ text }: { text: string }) {
  return (
    <View style={styles.benefitRow}>
      <Ionicons name="checkmark-circle" size={18} color="#D4AF37" />
      <Text style={styles.benefitText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(5, 4, 10, 0.84)',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#16131E',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#362D47',
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(212, 175, 55, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  title: {
    color: '#F6F1E7',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#A79EB8',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
    lineHeight: 20,
  },
  benefits: {
    width: '100%',
    gap: 12,
    marginBottom: 22,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  benefitText: {
    color: '#E5DFEE',
    fontSize: 14,
    flex: 1,
  },
  buyBtn: {
    width: '100%',
    backgroundColor: '#D4AF37',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
  },
  buyBtnText: {
    color: '#120E08',
    fontSize: 15,
    fontWeight: '800',
  },
  restoreBtn: {
    marginTop: 14,
    paddingVertical: 6,
  },
  restoreText: {
    color: '#9C92AE',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
});
