export type PrayerCategory =
  | 'Protección'
  | 'Dinero y Trabajo'
  | 'Salud'
  | 'Amor'
  | 'Casos Difíciles'
  | 'Agradecimiento';

export interface PrayerItem {
  id: string;
  category: PrayerCategory;
  title: string;
  text: string;
  recommendedCandle: string;
}

export interface SymbolInfo {
  id: string;
  emoji: string;
  name: string;
  meaning: string;
  altarTip: string;
}

export const PRAYER_CATEGORIES: PrayerCategory[] = [
  'Protección',
  'Dinero y Trabajo',
  'Salud',
  'Amor',
  'Casos Difíciles',
  'Agradecimiento',
];

export const PRAYERS: PrayerItem[] = [
  // Protección
  {
    id: 'pr-1',
    category: 'Protección',
    title: 'Manto de Resguardo en el Camino',
    recommendedCandle: 'Veladora Blanca o Negra',
    text: 'Santísima Muerte, cubre mi salida y mi regreso con tu manto sagrado. Aparta de mi camino envidias, peligros, accidentes y malas intenciones. Que tu balanza me guarde en paz.',
  },
  {
    id: 'pr-2',
    category: 'Protección',
    title: 'Limpieza del Hogar y la Familia',
    recommendedCandle: 'Veladora Blanca',
    text: 'Niña Blanca, entra en esta casa y llénala de armonía. Corta con tu guadaña toda discusión, pesadez o energía contraria, y deja solo tranquilidad para quienes aquí vivimos.',
  },
  {
    id: 'pr-3',
    category: 'Protección',
    title: 'Escudo Contra Envidias y Chismes',
    recommendedCandle: 'Veladora Negra',
    text: 'Poderosa Señora, tú que ves lo oculto, devuelve la calma a mi entorno. Que ninguna palabra malintencionada toque mi paz ni frene el fruto de mi esfuerzo.',
  },
  // Dinero y Trabajo
  {
    id: 'pr-4',
    category: 'Dinero y Trabajo',
    title: 'Apertura de Caminos y Sustento',
    recommendedCandle: 'Veladora Dorada',
    text: 'Señora de luz dorada, bendice mis manos, mi oficio y mis proyectos. Abre las puertas del trabajo honesto, atrae clientes justos y permite que nunca falte el pan en mi mesa.',
  },
  {
    id: 'pr-5',
    category: 'Dinero y Trabajo',
    title: 'Para Destrabar Negocios o Pagos',
    recommendedCandle: 'Veladora Dorada o Verde',
    text: 'Dueña de la balanza justa, mueve lo que hoy está detenido. Que el esfuerzo de mi trabajo rinda frutos, se resuelvan deudas y llegue la estabilidad económica a mi vida.',
  },
  {
    id: 'pr-6',
    category: 'Dinero y Trabajo',
    title: 'Bendición Antes de Iniciar la Jornada',
    recommendedCandle: 'Veladora Dorada',
    text: 'Niña Blanca, acompáñame hoy en mi trabajo. Dame claridad para aprovechar las buenas oportunidades, trato amable y prosperidad honesta en cada paso.',
  },
  // Salud
  {
    id: 'pr-7',
    category: 'Salud',
    title: 'Fuerza Física y Calma Espiritual',
    recommendedCandle: 'Veladora Morada',
    text: 'Madre compasiva, posa tu mano serena sobre quien hoy enfrenta enfermedad o cansancio. Transmuta el dolor en alivio, fortalece el cuerpo y da paciencia al corazón.',
  },
  {
    id: 'pr-8',
    category: 'Salud',
    title: 'Serenidad en Noches de Preocupación',
    recommendedCandle: 'Veladora Morada o Blanca',
    text: 'Santísima Muerte, aquieta los pensamientos que no me dejan descansar. Renueva mis fuerzas durante el sueño y permíteme despertar con ánimo y salud.',
  },
  {
    id: 'pr-9',
    category: 'Salud',
    title: 'Recuperación de un Ser Querido',
    recommendedCandle: 'Veladora Morada',
    text: 'Niña Blanca, pongo en tus manos la salud de quien amo. Acompaña a quienes cuidan y atienden, y concede pronto alivio, fortaleza y esperanza.',
  },
  // Amor
  {
    id: 'pr-10',
    category: 'Amor',
    title: 'Armonía y Cariño Verdadero',
    recommendedCandle: 'Veladora Roja',
    text: 'Niña de manto rojo, sana las heridas del orgullo y fortalece el respeto en mi relación. Aleja el rencor y permite que el amor sincero florezca con lealtad.',
  },
  {
    id: 'pr-11',
    category: 'Amor',
    title: 'Atraer Compañía Honesta',
    recommendedCandle: 'Veladora Roja',
    text: 'Señora del corazón sereno, aparta de mi vida a quien solo trae dudas y acerca a quien camine conmigo con verdad, respeto y cariño limpio.',
  },
  {
    id: 'pr-12',
    category: 'Amor',
    title: 'Unión y Paciencia en el Hogar',
    recommendedCandle: 'Veladora Roja o Blanca',
    text: 'Madre protectora, enséñanos a escucharnos con paciencia, a perdonar lo pequeño y a cuidar el cariño que nos une cada día.',
  },
  // Casos Difíciles
  {
    id: 'pr-13',
    category: 'Casos Difíciles',
    title: 'Oración para Trámites y Justicia',
    recommendedCandle: 'Veladora Verde o Negra',
    text: 'Santísima Muerte, tú que no haces distinciones y ves la verdad oculta, inclina la balanza hacia lo justo en este asunto difícil. Dame claridad para actuar con firmeza.',
  },
  {
    id: 'pr-14',
    category: 'Casos Difíciles',
    title: 'Luz Cuando Todo Parece Cerrado',
    recommendedCandle: 'Veladora Azul o Blanca',
    text: 'Niña Blanca, cuando mis fuerzas flaquean, sostén mi ánimo. Muéstrame la salida que hoy no alcanzo a ver y dame valor para dar el siguiente paso.',
  },
  {
    id: 'pr-15',
    category: 'Casos Difíciles',
    title: 'Sabiduría Antes de Decidir',
    recommendedCandle: 'Veladora Azul',
    text: 'Guía sabia del búho nocturno, despeja la confusión de mi mente. Ayúdame a elegir el camino correcto y a no ceder ante el miedo.',
  },
  // Agradecimiento
  {
    id: 'pr-16',
    category: 'Agradecimiento',
    title: 'Gratitud por los Favores Recibidos',
    recommendedCandle: 'Veladora Blanca',
    text: 'Gracias, Niña Blanca, por escucharme cuando más lo necesité, por cuidar a los míos y por abrirme paso en silencio. Recibe esta luz como muestra de respeto y fe.',
  },
  {
    id: 'pr-17',
    category: 'Agradecimiento',
    title: 'Ofrenda de Inicio de Semana',
    recommendedCandle: 'Veladora Blanca o Dorada',
    text: 'Agradezco el techo, el alimento y la vida que hoy tengo. Sigue guiando mi caminar con humildad y buen corazón.',
  },
  {
    id: 'pr-18',
    category: 'Agradecimiento',
    title: 'Cierre de Día en Paz',
    recommendedCandle: 'Veladora Blanca',
    text: 'Gracias por lo aprendido hoy, por las pruebas superadas y por tu compañía silenciosa. Entrego este día y descanso bajo tu resguardo.',
  },
];

export const SYMBOLS_GUIDE: SymbolInfo[] = [
  {
    id: 'sym-1',
    emoji: '⚖️',
    name: 'La Balanza',
    meaning:
      'Representa la justicia, la equidad y el equilibrio. Recuerda que nadie está por encima de la verdad y que cada acción tiene una consecuencia justa.',
    altarTip: 'Pide con claridad y actúa con rectitud cuando busques equilibrio.',
  },
  {
    id: 'sym-2',
    emoji: '🌙',
    name: 'La Guadaña',
    meaning:
      'Simboliza el corte de todo mal, envidia, obstáculo o ciclo que ya terminó. También representa la cosecha del esfuerzo sembrado.',
    altarTip: 'Visualiza que corta las cargas pesadas al encender una veladora.',
  },
  {
    id: 'sym-3',
    emoji: '🦉',
    name: 'El Búho',
    meaning:
      'Es la sabiduría, la intuición y la visión en la oscuridad. Ayuda a ver con claridad cuando otros no ven las verdaderas intenciones.',
    altarTip: 'Invócalo antes de tomar decisiones importantes o firmar acuerdos.',
  },
  {
    id: 'sym-4',
    emoji: '🌍',
    name: 'El Mundo',
    meaning:
      'Indica que su presencia alcanza todos los rincones sin distinción de fronteras, origen o condición.',
    altarTip: 'Recuerda pedir también por quienes están lejos de casa.',
  },
  {
    id: 'sym-5',
    emoji: '⏳',
    name: 'El Reloj de Arena',
    meaning:
      'Marca el valor del tiempo, la paciencia y la transformación constante. Todo llega en su hora exacta.',
    altarTip: 'Agradece cada día y no desesperes si un proceso toma tiempo.',
  },
  {
    id: 'sym-6',
    emoji: '🕯️',
    name: 'Ofrendas del Altar',
    meaning:
      'Tradicionalmente se coloca un vaso de agua limpia (para absorber energías), flores blancas o rojas, una veladora y algún detalle de gratitud.',
    altarTip: 'Cambia el agua del altar con frecuencia y mantén el espacio limpio.',
  },
];
