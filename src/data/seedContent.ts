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
  {
    id: 'p-8',
    title: 'Manto de serenidad',
    phrase:
      'La verdadera fuerza no hace ruido; avanza paso a paso con la certeza de quien no está solo.',
    prayer:
      'Niña Blanca, envuelve mi mente en calma y aleja la ansiedad por el mañana. Hoy confío en tu resguardo.',
    reflection: 'Respira profundo tres veces antes de tomar una decisión importante.',
  },
  {
    id: 'p-9',
    title: 'Fruto del esfuerzo honesto',
    phrase:
      'El pan ganado con honra rinde el doble cuando se agradece desde el corazón.',
    prayer:
      'Señora de luz dorada, multiplica el fruto de mi trabajo y guarda mi economía de gastos imprevistos.',
    reflection: 'Cuida hoy un detalle de tu trabajo con especial dedicación.',
  },
  {
    id: 'p-10',
    title: 'Casa protegida',
    phrase:
      'Donde hay respeto y gratitud, ninguna envidia logra echar raíz.',
    prayer:
      'Santísima Muerte, vigila las puertas y ventanas de mi hogar; que solo entren las buenas noticias y la paz.',
    reflection: 'Mantén un vaso con agua limpia y orden en tu espacio hoy.',
  },
  {
    id: 'p-11',
    title: 'Claridad en la prueba',
    phrase:
      'Las nubes no borran el sol, solo prueban la paciencia de quien espera el amanecer.',
    prayer:
      'Madre compasiva, dame luz para entender lo que hoy me cuesta aceptar y valor para seguir adelante.',
    reflection: 'Busca una solución práctica en lugar de darle vueltas al problema.',
  },
  {
    id: 'p-12',
    title: 'Palabra que construye',
    phrase:
      'Cuida lo que dices de los demás y de ti mismo; tus palabras también abren o cierran caminos.',
    prayer:
      'Niña Blanca, pon prudencia en mis labios y bondad en mis actos durante toda esta jornada.',
    reflection: 'Evita quejarte durante el día y observa cómo cambia tu ánimo.',
  },
  {
    id: 'p-13',
    title: 'Alianza verdadera',
    phrase:
      'Quien te quiere bien se alegra de tus avances y te tiende la mano en silencio.',
    prayer:
      'Señora de la balanza, acerca a mi vida personas leales y aparta con suavidad a quien solo busca interés.',
    reflection: 'Manda un mensaje de gratitud a alguien que siempre ha estado ahí.',
  },
  {
    id: 'p-14',
    title: 'Renovación interior',
    phrase:
      'Cada amanecer es una vela nueva que se enciende; no desperdicies su luz mirando atrás.',
    prayer:
      'Santa Muerte, renueva mi energía y limpia mi espíritu de todo cansancio acumulado.',
    reflection: 'Haz hoy algo pequeño por tu propio descanso o salud.',
  },
  {
    id: 'p-15',
    title: 'Paso firme ante la duda',
    phrase:
      'El miedo se hace grande cuando te detienes; cuando avanzas con fe, se vuelve sombra.',
    prayer:
      'Niña Blanca, dame firmeza en los pies y claridad en la mirada para no dudar de mi camino.',
    reflection: 'Resuelve hoy esa llamada o pendiente que estabas evitando.',
  },
  {
    id: 'p-16',
    title: 'Equilibrio en el hogar',
    phrase:
      'La paz familiar vale más que cualquier discusión ganada por orgullo.',
    prayer:
      'Madre protectora, suaviza los ánimos en mi casa y enséñanos a escucharnos con respeto.',
    reflection: 'Cede en un detalle menor hoy para proteger la armonía.',
  },
  {
    id: 'p-17',
    title: 'Cosecha justa',
    phrase:
      'Nadie te quita lo que por justicia y esfuerzo te corresponde.',
    prayer:
      'Dueña de la balanza, destraba los pagos o trámites que están detenidos y haz que prevalezca lo correcto.',
    reflection: 'Ordena tus cuentas o documentos hoy con paciencia.',
  },
  {
    id: 'p-18',
    title: 'Vigilia silenciosa',
    phrase:
      'No necesitas anunciar tus batallas; tu constancia hablará cuando lleguen los resultados.',
    prayer:
      'Santísima Muerte, guarda mis planes bajo tu manto hasta que den buen fruto.',
    reflection: 'Trabaja en silencio en tu meta principal al menos 20 minutos hoy.',
  },
  {
    id: 'p-19',
    title: 'Salud y alivio',
    phrase:
      'El cuerpo también escucha la paz del espíritu; cuídalo con cariño y descanso.',
    prayer:
      'Señora de túnica morada, fortalece mi salud y lleva alivio a quienes hoy están enfermos.',
    reflection: 'Toma agua suficiente y regálate un momento de calma hoy.',
  },
  {
    id: 'p-20',
    title: 'Camino abierto en el viaje',
    phrase:
      'Quien sale con bendición y prudencia siempre regresa con bien a su mesa.',
    prayer:
      'Niña Blanca, cuida mis traslados, mi vehículo y a cada persona que viaja conmigo hoy.',
    reflection: 'Sal con tiempo hoy para evitar prisas innecesarias.',
  },
  {
    id: 'p-21',
    title: 'Corazón agradecido',
    phrase:
      'La gratitud convierte lo poco en suficiente y abre la puerta a nuevas bendiciones.',
    prayer:
      'Gracias, Santa Muerte, por el alimento, el techo y las puertas que aún sin ver ya estás preparando.',
    reflection: 'Nombra tres cosas buenas de tu semana antes de dormir.',
  },
  {
    id: 'p-22',
    title: 'Templanza ante la provocación',
    phrase:
      'No respondas al fuego con fuego; quien mantiene la calma conserva el control de la situación.',
    prayer:
      'Niña Blanca, aléjame de pleitos y dame inteligencia para salir ileso de cualquier provocación.',
    reflection: 'Si alguien busca discutir hoy, elige el silencio y sigue tu camino.',
  },
  {
    id: 'p-23',
    title: 'Prosperidad con propósito',
    phrase:
      'El dinero fluye mejor cuando llega para construir bienestar y compartir con los tuyos.',
    prayer:
      'Santísima Muerte, bendice mis ideas y permite que mi negocio o empleo crezca con estabilidad.',
    reflection: 'Piensa en una mejora pequeña que puedes hacer hoy en tu trabajo.',
  },
  {
    id: 'p-24',
    title: 'Protección nocturna',
    phrase:
      'Mientras descansas, una guardia silenciosa cuida tu sueño y el de tu familia.',
    prayer:
      'Madre protectora, recibe mi cansancio de hoy y vela por mi hogar durante toda la noche.',
    reflection: 'Desconéctate de noticias o pantallas 15 minutos antes de dormir.',
  },
  {
    id: 'p-25',
    title: 'Fuerza en los comienzos',
    phrase:
      'Todo camino largo empezó con alguien que se atrevió a dar el primer paso sin garantías completas.',
    prayer:
      'Niña Blanca, acompaña este nuevo proyecto o etapa que hoy comienza en mi vida.',
    reflection: 'No esperes el momento perfecto; empieza con lo que tienes hoy.',
  },
  {
    id: 'p-26',
    title: 'Verdad que libera',
    phrase:
      'Vivir con honestidad te da un descanso que ningún atajo puede comprar.',
    prayer:
      'Señora de la balanza, mantén limpio mi caminar y líbrame de engaños o malos tratos.',
    reflection: 'Habla claro y con respeto en cualquier acuerdo que hagas hoy.',
  },
  {
    id: 'p-27',
    title: 'Luz para los que extrañamos',
    phrase:
      'El cariño verdadero permanece vivo en cada oración y en cada recuerdo agradecido.',
    prayer:
      'Santa Muerte, cuida a quienes están lejos de casa y da consuelo a quien hoy siente ausencia.',
    reflection: 'Llama o escribe hoy a un familiar con quien hace tiempo no hablas.',
  },
  {
    id: 'p-28',
    title: 'Corte de envidias',
    phrase:
      'Lo que brilla con luz propia no necesita apagar a nadie más.',
    prayer:
      'Poderosa Niña Negra, corta cualquier mala vibración que quiera frenar mi paz o mi trabajo.',
    reflection: 'No te compares con nadie hoy; compárate solo con tu versión de ayer.',
  },
  {
    id: 'p-29',
    title: 'Paciencia que rinde frutos',
    phrase:
      'No arranques el fruto antes de tiempo; lo que madura en su hora es más dulce y duradero.',
    prayer:
      'Niña Blanca, dame serenidad para esperar respuestas sin perder el ánimo.',
    reflection: 'Confía en el proceso de lo que ya sembraste esta semana.',
  },
  {
    id: 'p-30',
    title: 'Amor propio y respeto',
    phrase:
      'Aprender a poner límites también es una forma de proteger la paz de tu altar interior.',
    prayer:
      'Madre sabia, dame firmeza para decir no a lo que daña mi tranquilidad.',
    reflection: 'Cuida hoy tu tiempo tanto como cuidas tu dinero.',
  },
  {
    id: 'p-31',
    title: 'Cierre de ciclo con bendición',
    phrase:
      'Cada etapa que termina te deja más sabio, más fuerte y más preparado para lo que viene.',
    prayer:
      'Gracias, Santísima Muerte, por acompañarme hasta hoy. Bendice lo que viene y guarda a mi familia.',
    reflection: 'Agradece lo vivido y prepara tu intención para el nuevo mes.',
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
  {
    id: 'r-7',
    symbol: '🪙',
    title: 'La Moneda Dorada',
    message:
      'Se acerca una oportunidad extra de ingreso, venta o pago que dabas por perdido.',
    advice: 'Administra bien ese recurso y aparta una parte para tu tranquilidad.',
    luckyNumbers: '08 · 16 · 39',
    recommendedCandle: 'dorada',
  },
  {
    id: 'r-8',
    symbol: '🌙',
    title: 'El Corte Limpio',
    message:
      'Es momento de cerrar una etapa o hábito que te quitaba energía para abrir paso a algo mejor.',
    advice: 'No temas dejar atrás lo que ya no suma a tu paz.',
    luckyNumbers: '02 · 17 · 45',
    recommendedCandle: 'negra',
  },
  {
    id: 'r-9',
    symbol: '🕊️',
    title: 'Alivio del Espíritu',
    message:
      'Una preocupación de salud o cansancio familiar comienza a mostrar mejoría constante.',
    advice: 'Cuida tu descanso y mantén una actitud serena frente a los tuyos.',
    luckyNumbers: '05 · 12 · 30',
    recommendedCandle: 'morada',
  },
  {
    id: 'r-10',
    symbol: '🔑',
    title: 'La Llave del Camino',
    message:
      'Una conversación inesperada te dará el contacto o dato que necesitabas para destrabar un proyecto.',
    advice: 'Responde tus mensajes pendientes y mantente atento a nuevas propuestas.',
    luckyNumbers: '10 · 24 · 48',
    recommendedCandle: 'azul',
  },
  {
    id: 'r-11',
    symbol: '🌿',
    title: 'Brote de Esperanza',
    message:
      'Un asunto legal, escolar o de papeles empieza a resolverse de manera favorable.',
    advice: 'Reúne tus documentos con orden y da seguimiento puntual.',
    luckyNumbers: '04 · 22 · 35',
    recommendedCandle: 'verde',
  },
  {
    id: 'r-12',
    symbol: '✨',
    title: 'Destello de Gratitud',
    message:
      'Recibirás un gesto amable de alguien de quien no lo esperabas; tu buena obra regresa a ti.',
    advice: 'Comparte una palabra de ánimo con alguien que hoy lo necesite.',
    luckyNumbers: '07 · 18 · 51',
    recommendedCandle: 'blanca',
  },
  {
    id: 'r-13',
    symbol: '🔥',
    title: 'Voluntad Encendida',
    message:
      'Vuelve la motivación que sentías apagada. Es un excelente día para retomar una meta personal.',
    advice: 'Empieza hoy con una acción concreta de 15 minutos.',
    luckyNumbers: '03 · 14 · 37',
    recommendedCandle: 'roja',
  },
  {
    id: 'r-14',
    symbol: '🌍',
    title: 'Horizonte Amplio',
    message:
      'Noticias favorables relacionadas con un viaje, cambio de ciudad o contacto a distancia.',
    advice: 'Planea con tiempo y confía en que todo se acomoda en el camino.',
    luckyNumbers: '09 · 25 · 44',
    recommendedCandle: 'blanca',
  },
  {
    id: 'r-15',
    symbol: '🛡️',
    title: 'Muralla de Resguardo',
    message:
      'Tu intuición te alertará a tiempo sobre un mal trato o gasto innecesario.',
    advice: 'Si algo no te da buena espina, espera antes de aceptar.',
    luckyNumbers: '01 · 19 · 32',
    recommendedCandle: 'negra',
  },
  {
    id: 'r-16',
    symbol: '💜',
    title: 'Transmutación Serena',
    message:
      'Un problema que parecía grande pierde fuerza cuando lo miras con la cabeza fría.',
    advice: 'Habla con calma y evita tomar decisiones en momentos de enojo.',
    luckyNumbers: '06 · 20 · 47',
    recommendedCandle: 'morada',
  },
  {
    id: 'r-17',
    symbol: '🌻',
    title: 'Luz de Cempasúchil',
    message:
      'Buena racha para ventas, comercio y trato con clientes. Tu carisma abrirá puertas hoy.',
    advice: 'Atiende con amabilidad y muestra seguridad en lo que ofreces.',
    luckyNumbers: '08 · 23 · 41',
    recommendedCandle: 'dorada',
  },
  {
    id: 'r-18',
    symbol: '🧭',
    title: 'Norte Claro',
    message:
      'Se aclara una duda que venías cargando desde hace días; sabrás exactamente qué elegir.',
    advice: 'Confía en tu criterio y da el paso sin mirar atrás.',
    luckyNumbers: '05 · 16 · 29',
    recommendedCandle: 'azul',
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
  {
    id: 'w-7',
    title: 'Llama de Prosperidad',
    category: 'Abundancia',
    gradientColors: ['#171005', '#42290A', '#080603'],
    accentColor: '#FFD54F',
  },
  {
    id: 'w-8',
    title: 'Manto de Sanación',
    category: 'Altar',
    gradientColors: ['#12081B', '#33144D', '#07040B'],
    accentColor: '#EA80FC',
  },
];

export const SEED_PAYLOAD: RemoteContentPayload = {
  version: 2,
  updatedAt: '2026-11-25T00:00:00Z',
  phrases: SEED_PHRASES,
  readings: SEED_READINGS,
  wallpapers: SEED_WALLPAPERS,
};
