# Guía de Prueba y Publicación — Altar de la Niña Blanca

## 1. Probar la app hoy en tu Android
1. Instala **Expo Go** desde Google Play en tu teléfono Android.
2. En esta carpeta ejecuta:
   ```bash
   npx expo start
   ```
3. Escanea el código QR con Expo Go.

---

## 2. Automatizar las frases y lecturas (gratis)
1. Sube esta carpeta a un repositorio en **GitHub**.
2. En GitHub, ve a **Settings → Secrets and variables → Actions** y agrega `GEMINI_API_KEY` (puedes obtener una gratis en Google AI Studio).
3. El workflow `.github/workflows/update-content.yml` actualizará `content/contenido.json` cada lunes automáticamente.
4. Copia la URL **Raw** de `content/contenido.json` en GitHub y pégala en `REMOTE_CONTENT_URL` dentro de `src/services/contentService.ts`.

---

## 3. Activar anuncios reales (AdMob), pago único de $2.99 y Widget Android
Expo Go no incluye módulos nativos de anuncios o pagos. Cuando estés listo para subirla a Google Play:
1. Crea tu cuenta en **Google AdMob** (banner + anuncio recompensado) y **Google Play Console** ($25 USD pago único).
2. Instala los módulos nativos con `npx expo install`:
   - `react-native-google-mobile-ads` (anuncios reales)
   - `react-native-purchases` o `expo-iap` (compra única de $2.99 USD para quitar anuncios)
   - `react-native-android-widget` (widget de frase diaria en la pantalla de inicio de Android)
3. Compila el archivo `.aab` en la nube sin necesitar Android Studio pesado:
   ```bash
   npx eas-cli@latest build --platform android --profile production
   ```
