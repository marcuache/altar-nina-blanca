import fs from 'node:fs/promises';
import path from 'node:path';

const CONTENT_PATH = path.resolve(process.cwd(), 'content', 'contenido.json');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function main() {
  if (!GEMINI_API_KEY) {
    console.error('Falta la variable de entorno GEMINI_API_KEY.');
    process.exit(1);
  }

  const raw = await fs.readFile(CONTENT_PATH, 'utf8');
  const current = JSON.parse(raw);

  const prompt = `Genera contenido devocional original y respetuoso en español para una app sobre la Santa Muerte ("Altar de la Niña Blanca").
Devuelve SOLO un JSON válido con esta estructura exacta:
{
  "phrases": [
    {
      "title": "título corto",
      "phrase": "frase inspiradora de 1 a 2 líneas",
      "prayer": "oración breve y respetuosa de 2 a 3 líneas",
      "reflection": "consejo práctico para el día"
    }
  ],
  "readings": [
    {
      "symbol": "un emoji simbólico como ⚖️, 🦉, 🕯️, ⏳, 🌹, 🌑",
      "title": "título de la carta/señal",
      "message": "mensaje positivo y reflexivo de 2 líneas",
      "advice": "consejo práctico",
      "luckyNumbers": "3 números de dos dígitos separados por · (ej: 05 · 18 · 44)",
      "recommendedCandle": "una de: blanca, roja, negra, dorada, morada, verde, azul"
    }
  ]
}
Genera 7 phrases y 4 readings nuevos. No prometas milagros médicos ni daños a terceros.`;

  let data = null;
  let lastError = '';
  const models = ['gemini-3.8-flash', 'gemini-3.8-flash', 'gemini-3.8-flash-lite'];

  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' },
        }),
      }
    );

    if (res.ok) {
      data = await res.json();
      break;
    }

    lastError = `${res.status} ${await res.text()}`;
    if (res.status === 503 || res.status === 429) {
      await new Promise((r) => setTimeout(r, (i + 1) * 5000));
      continue;
    }
    throw new Error(`Error Gemini API: ${lastError}`);
  }

  if (!data) {
    throw new Error(`Error Gemini API tras reintentos: ${lastError}`);
  }
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Respuesta vacía de Gemini');

  const generated = JSON.parse(text);
  const stamp = Date.now();

  const newPhrases = (generated.phrases || []).map((p, idx) => ({
    id: `p-${stamp}-${idx}`,
    ...p,
  }));

  const newReadings = (generated.readings || []).map((r, idx) => ({
    id: `r-${stamp}-${idx}`,
    ...r,
  }));

  const updated = {
    version: (current.version || 1) + 1,
    updatedAt: new Date().toISOString(),
    phrases: [...newPhrases, ...(current.phrases || [])].slice(0, 60),
    readings: [...newReadings, ...(current.readings || [])].slice(0, 40),
    wallpapers: current.wallpapers || [],
  };

  await fs.writeFile(CONTENT_PATH, JSON.stringify(updated, null, 2), 'utf8');
  console.log(
    `Contenido actualizado (v${updated.version}): +${newPhrases.length} frases, +${newReadings.length} lecturas.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
