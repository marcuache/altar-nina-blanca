import {
  CandleColorInfo,
  DailyPhrase,
  FortuneReading,
  RemoteContentPayload,
  WallpaperItem,
} from '../types/content';

export const CANDLE_COLORS: CandleColorInfo[] = [
  {
    id: 'blanca',
    name: 'Veladora Blanca',
    meaning: 'Pureza, paz interior y protección del hogar',
    purpose: 'Agradece, limpia energías pesadas y pide armonía familiar.',
    prayer:
      'Niña Blanca, ilumina mi casa con tu manto de paz. Aleja toda envidia y deja solo serenidad y bendición en nuestro camino.',
    waxColor: '#F5F2EB',
    glowColor: '#FFF3C4',
  },
  {
    id: 'dorada',
    name: 'Veladora Dorada',
    meaning: 'Abundancia, trabajo, negocios y prosperidad',
    purpose: 'Ideal para abrir caminos económicos y atraer buenas oportunidades.',
    prayer:
      'Santísima Muerte de luz dorada, abre las puertas del trabajo honesto y multiplica el pan en mi mesa. Que nunca falte el sustento.',
    waxColor: '#D4AF37',
    glowColor: '#FFE082',
  },
  {
    id: 'roja',
    name: 'Veladora Roja',
    meaning: 'Amor, pasión, reconciliación y fuerza de voluntad',
    purpose: 'Fortalece vínculos afectivos, atrae el amor sincero y la unión.',
    prayer:
      'Señora de rojo manto, armoniza mi corazón, aleja el rencor y permite que el cariño verdadero reine en mi vida.',
    waxColor: '#B71C1C',
    glowColor: '#FF8A80',
  },
  {
    id: 'negra',
    name: 'Veladora Negra',
    meaning: 'Protección total, corte de envidias y defensa espiritual',
    purpose: 'Úsala cuando sientas pesadez, chismes o bloqueos injustos.',
    prayer:
      'Poderosa Niña Negra, con tu balanza y tu guadaña corta todo mal pensamiento, abre mi paso y resguárdame bajo tu sombra.',
    waxColor: '#1E1E24',
    glowColor: '#B388FF',
  },
  {
    id: 'morada',
    name: 'Veladora Morada',
    meaning: 'Salud, transmutación y alivio en momentos difíciles',
    purpose: 'Para pedir fuerza física, calma ante enfermedades y cambio positivo.',
    prayer:
      'Madre compasiva de túnica morada, transforma la preocupación en alivio, fortalece mi cuerpo y dame claridad en la prueba.',
    waxColor: '#6A1B9A',
    glowColor: '#EA80FC',
  },
  {
    id: 'verde',
    name: 'Veladora Verde',
    meaning: 'Justicia, trámites legales y esperanza',
    purpose: 'Acompaña procesos legales, papeles pendientes o decisiones justas.',
    prayer:
      'Dueña de la balanza justa, inclina la verdad a favor de lo correcto y destraba los caminos que hoy parecen cerrados.',
    waxColor: '#1B5E20',
    glowColor: '#B9F6CA',
  },
  {
    id: 'azul',
    name: 'Veladora Azul',
    meaning: 'Sabiduría, estudios, concentración y claridad mental',
    purpose: 'Excelente antes de exámenes, entrevistas o decisiones importantes.',
    prayer:
      'Guía sabia, despeja mi mente de dudas, dame templanza para decidir bien y sabiduría para aprender cada día.',
    waxColor: '#0D47A1',
    glowColor: '#82B1FF',
  },
];

export const SEED_PHRASES: DailyPhrase[] = [
  {
    id: 'p-1',
    title: 'Camino firme y corazón tranquilo',
    phrase:
      'Quien camina con fe y obra con rectitud no teme a la tormenta; la Niña Blanca siempre equilibra la balanza a su tiempo.',
    prayer:
      'Gracias, Santa Muerte, por un día más de vida. Guía mis pasos, protege a los míos y dame fortaleza para superar cualquier prueba.',
    reflection: 'Hoy actúa con calma antes de responder; la serenidad es tu mayor escudo.',
  },
  {
    id: 'p-2',
    title: 'Puertas que se abren',
    phrase:
      'Ninguna puerta permanece cerrada cuando la constancia y la gratitud van de la mano.',
    prayer:
      'Niña Blanca, bendice mi trabajo y mis manos. Aparta los obstáculos del camino y permíteme ver las oportunidades que hoy llegan.',
    reflection: 'Agradece lo que ya tienes antes de pedir lo que viene.',
  },
  {
    id: 'p-3',
    title: 'La balanza de la justicia',
    phrase:
      'Todo lo que das regresa multiplicado. Siembra respeto, verdad y apoyo, y recogerás paz.',
    prayer:
      'Señora de la balanza, ayúdame a ser justo en mis palabras y decisiones. Aléjame de discusiones inútiles.',
    reflection: 'Evita cargar problemas ajenos hoy; enfócate en lo que sí puedes resolver.',
  },
  {
    id: 'p-4',
    title: 'Luz en la oscuridad',
    phrase:
      'Incluso en la noche más cerrada, una sola flama basta para mostrar el siguiente paso.',
    prayer:
      'Santísima Muerte, acompaña a quienes hoy pasan por angustia o necesidad. Cubre mi hogar con tu manto protector.',
    reflection: 'Dedica 2 minutos de silencio hoy para ordenar tus pensamientos.',
  },
  {
    id: 'p-5',
    title: 'Corte de cargas pasadas',
    phrase:
      'La guadaña no solo protege: también corta lo que ya cumplió su ciclo para dejar espacio a lo nuevo.',
    prayer:
      'Niña Blanca, ayúdame a soltar rencores, miedos y tristezas del ayer. Hoy empiezo ligero y confiado.',
    reflection: 'Deja ir una preocupación que no depende de ti.',
  },
  {
    id: 'p-6',
    title: 'Sabiduría del búho',
    phrase:
      'Escucha más de lo que hablas; quien observa en silencio descubre la verdad antes que los demás.',
    prayer:
      'Madre protectora, dame ojos claros para distinguir las buenas intenciones y prudencia para cuidar mis proyectos.',
    reflection: 'No cuentes tus planes hasta que estén en marcha.',
  },
  {
    id: 'p-7',
    title: 'Tiempo perfecto',
    phrase:
      'El reloj de arena recuerda que cada etapa tiene su hora. No te desesperes si la semilla aún está bajo tierra.',
    prayer:
      'Santa Muerte, enséñame a tener paciencia y constancia. Mientras espero respuestas, mantén firme mi espíritu.',
    reflection: 'Da un pequeño paso concreto hoy hacia esa meta que has pospuesto.',
  },
];

export const SEED_READINGS: FortuneReading[] = [
  {
    id: 'r-1',
    symbol: '⚖️',
    title: 'La Balanza Equilibrada',
    message:
      'Un asunto pendiente relacionado con dinero o un acuerdo laboral comienza a inclinarse a tu favor.',
    advice: 'Revisa los detalles con calma y no firmes ni prometas nada por impulso.',
    luckyNumbers: '07 · 14 · 33',
    recommendedCandle: 'dorada',
  },
  {
    id: 'r-2',
    symbol: '🦉',
    title: 'El Búho Vigilante',
    message:
      'Alguien cercano podría acercarse con un consejo valioso, pero también conviene cuidar a quién confías tus planes.',
    advice: 'Mantén tus metas en privado esta semana y observa las acciones más que las palabras.',
    luckyNumbers: '03 · 19 · 42',
    recommendedCandle: 'azul',
  },
  {
    id: 'r-3',
    symbol: '🕯️',
    title: 'La Llama Firme',
    message:
      'Tu energía se estabiliza después de días de tensión. Llega una noticia que devuelve tranquilidad a tu hogar.',
    advice: 'Agradece hoy en silencio y dedica tiempo a tu familia o a ordenar tu espacio.',
    luckyNumbers: '01 · 11 · 28',
    recommendedCandle: 'blanca',
  },
  {
    id: 'r-4',
    symbol: '⏳',
    title: 'El Reloj de Arena',
    message:
      'Lo que parecía detenido empezará a moverse pronto. No es momento de rendirse, sino de ajustar el ritmo.',
    advice: 'Ten paciencia con un trámite o respuesta; llegará en el momento preciso.',
    luckyNumbers: '09 · 21 · 54',
    recommendedCandle: 'verde',
  },
  {
    id: 'r-5',
    symbol: '🌹',
    title: 'El Manto Carmesí',
    message:
      'Se abren caminos para sanar malentendidos afectivos o fortalecer la complicidad con alguien especial.',
    advice: 'Habla desde el corazón y deja el orgullo a un lado.',
    luckyNumbers: '06 · 15 · 27',
    recommendedCandle: 'roja',
  },
  {
    id: 'r-6',
    symbol: '🌑',
    title: 'Escudo de Sombra',
    message:
      'Se disipan energías pesadas o envidias alrededor de tu entorno. Sentirás mayor ligereza para avanzar.',
    advice: 'No enganches en chismes ni discusiones; tu paz vale más que tener la razón.',
    luckyNumbers: '04 · 13 · 40',
    recommendedCandle: 'negra',
  },
];

export const SEED_WALLPAPERS: WallpaperItem[] = [
  {
    id: 'w-1',
    title: 'Manto de Oro',
    category: 'Abundancia',
    gradientColors: ['#140F07', '#3D2B0D', '#0B0906'],
    accentColor: '#D4AF37',
  },
  {
    id: 'w-2',
    title: 'Luz Blanca del Altar',
    category: 'Altar',
    gradientColors: ['#12131A', '#2B2E3B', '#09090D'],
    accentColor: '#F5F2EB',
  },
  {
    id: 'w-3',
    title: 'Escudo Nocturno',
    category: 'Protección',
    gradientColors: ['#09070E', '#23153C', '#050408'],
    accentColor: '#B388FF',
  },
  {
    id: 'w-4',
    title: 'Rosa Carmesí',
    category: 'Amor',
    gradientColors: ['#19070B', '#4A101D', '#0A0406'],
    accentColor: '#FF6B81',
  },
  {
    id: 'w-5',
    title: 'Balanza Esmeralda',
    category: 'Abundancia',
    gradientColors: ['#06140E', '#123D28', '#040A07'],
    accentColor: '#69F0AE',
  },
  {
    id: 'w-6',
    title: 'Vigilia de Medianoche',
    category: 'Protección',
    gradientColors: ['#080C17', '#162447', '#05070D'],
    accentColor: '#82B1FF',
  },
];

export const SEED_PAYLOAD: RemoteContentPayload = {
  version: 1,
  updatedAt: '2026-11-25T00:00:00Z',
  phrases: SEED_PHRASES,
  readings: SEED_READINGS,
  wallpapers: SEED_WALLPAPERS,
};
