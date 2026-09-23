import { Plan } from '../types';

export type NotificationType = 'reminder' | 'updated' | 'cancelled';
export type NotificationChangedField = 'fecha' | 'hora' | 'ubicacion';

export interface NotificationItem {
  id: number;
  title: string;
  text: string;
  date: string;
  time: string;
  type: NotificationType;
  unread: boolean;
  changedField?: NotificationChangedField;
  location?: string;
}

export type EventIconName = 'book' | 'coffee' | 'basketball';

export interface EnrolledEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  capacity: number;
  visibility: string;
  category: string;
  icon: EventIconName;
  iconColor: string;
}

export interface ChatItem {
  id: number;
  title: string;
  lastMessage: string;
  lastTime: string;
  participants: number;
  eventColor: string;
}

export interface ChatMessage {
  id: number;
  sender: string;
  message: string;
  time: string;
  mine?: boolean;
}

/* =========================================================
   NOTIFICACIONES
========================================================= */

export const mockNotifications: NotificationItem[] = [
  {
    id: 1,
    title: 'Estudiar en starbucks',
    text: 'Es hoy.',
    date: '07 de Septiembre',
    time: '7 p.m.',
    type: 'reminder',
    unread: true,
  },
  {
    id: 2,
    title: 'Cafe centenario',
    text: 'Se actualizó la fecha del evento.',
    date: '07 de Septiembre',
    time: '7 p.m.',
    type: 'updated',
    unread: true,
    changedField: 'fecha',
  },
  {
    id: 3,
    title: 'Hacer tarea en starbucks',
    text: 'El plan fue cancelado.',
    date: '',
    time: '',
    type: 'cancelled',
    unread: true,
  },
  {
    id: 4,
    title: 'Retas de basket mujeres',
    text: 'Se actualizó la información del lugar.',
    date: '',
    time: '',
    type: 'updated',
    unread: false,
    changedField: 'ubicacion',
    location: 'Canchas Hector Espino',
  },
];

/* =========================================================
   EVENTOS INSCRITOS
========================================================= */

export const mockEnrolledEvents: EnrolledEvent[] = [
  {
    id: 1,
    title: 'Estudiar en Starbucks',
    description: 'Sesión de estudio y convivencia.',
    date: '03 de Septiembre',
    time: '4:00 P.M.',
    location: 'Starbucks',
    participants: 4,
    capacity: 8,
    visibility: 'Mi licenciatura',
    category: 'Estudio',
    icon: 'book',
    iconColor: '#B79CFF',
  },
  {
    id: 2,
    title: 'Cafe centenario',
    description:
      'Hacer amigas de la misma licenciatura que yo para tomar cafecito y hablar de la vida.',
    date: '05 de Septiembre',
    time: '6:00 P.M.',
    location: 'Cafe centenario No.165, col. Centenario',
    participants: 4,
    capacity: 5,
    visibility: 'Mi licenciatura',
    category: 'Tiempo de calidad',
    icon: 'coffee',
    iconColor: '#FF9FA4',
  },
  {
    id: 3,
    title: 'Retas de basket mujeres',
    description: 'Partido amistoso de basket entre estudiantes.',
    date: '10 de Septiembre',
    time: '5:00 P.M.',
    location: 'Cancha universitaria',
    participants: 8,
    capacity: 12,
    visibility: 'Pública',
    category: 'Deportes',
    icon: 'basketball',
    iconColor: '#86D6A0',
  },
];

/* =========================================================
   CHATS
========================================================= */

export const mockChatList: ChatItem[] = [
  {
    id: 1,
    title: 'Estudiar en Starbucks',
    lastMessage: '¿A qué hora nos vemos?',
    lastTime: '3:45 P.M.',
    participants: 4,
    eventColor: '#B79CFF',
  },
  {
    id: 2,
    title: 'Cafe centenario',
    lastMessage: 'Yo llego un poquito antes.',
    lastTime: '5:32 P.M.',
    participants: 5,
    eventColor: '#FF9FA4',
  },
  {
    id: 3,
    title: 'Retas de basket mujeres',
    lastMessage: '¿Quién lleva el balón?',
    lastTime: '4:20 P.M.',
    participants: 8,
    eventColor: '#86D6A0',
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 1,
    sender: 'Sofía',
    message: 'Holaaa, ¿sí nos vemos hoy?',
    time: '5:30 P.M.',
  },
  {
    id: 2,
    sender: 'Valeria',
    message: 'Siii, yo ya confirmé.',
    time: '5:33 P.M.',
  },
  {
    id: 3,
    sender: 'Tú',
    message: 'Yo también, nos vemos a las 6 ✨',
    time: '5:35 P.M.',
    mine: true,
  },
  {
    id: 4,
    sender: 'Sofía',
    message: 'Perfecto, nos vemos en Cafe centenario.',
    time: '5:42 P.M.',
  },
];


export const mockPlanes: Plan[] = [
  {
    id: 1,
    titulo: 'Círculo de Estudio: Cálculo Integral',
    descripcion: 'Sesión de repaso intensivo para el segundo parcial de Cálculo. Resolveremos problemas tipo examen.',
    fechaEvento: '2023-11-15',
    horaEvento: '14:00',
    cupoMaximo: 20,
    inscritos: 15,
    tipoUbicacion: 'interna',
    edificioCampus: '9Q2',
    visibilidad: 'division',
    categoria: 'educativo',
    color: '#3b82f6', // blue
    estado: 'activo',
    coordenadasMapa: { x: 30, y: 45 }
  },
  {
    id: 2,
    titulo: 'Torneo Relámpago de Futbolito',
    descripcion: 'Arma tu equipo de 2 y ven a competir. Habrá premio sorpresa para el primer lugar.',
    fechaEvento: '2023-11-16',
    horaEvento: '17:30',
    cupoMaximo: 16,
    inscritos: 16,
    tipoUbicacion: 'externa',
    edificioCampus: 'Plaza del Estudiante',
    visibilidad: 'global',
    categoria: 'deportivo',
    color: '#ef4444', // red
    estado: 'activo',
    coordenadasMapa: { x: 60, y: 35 }
  },
  {
    id: 3,
    titulo: 'Taller de Acuarela para Principiantes',
    descripcion: 'Aprende las técnicas básicas de acuarela. Material incluido, cupo muy limitado.',
    fechaEvento: '2023-11-18',
    horaEvento: '10:00',
    cupoMaximo: 10,
    inscritos: 10,
    tipoUbicacion: 'interna',
    edificioCampus: '3K4',
    visibilidad: 'global',
    categoria: 'artistico',
    color: '#d946ef', // fuchsia
    estado: 'activo',
    coordenadasMapa: { x: 45, y: 65 }
  },
  {
    id: 4,
    titulo: 'Hackathon Interno: App Escolar',
    descripcion: '24 horas para desarrollar una solución innovadora para la universidad. Solo alumnos de Sistemas.',
    fechaEvento: '2023-11-20',
    horaEvento: '09:00',
    cupoMaximo: 50,
    inscritos: 32,
    tipoUbicacion: 'interna',
    edificioCampus: '5B',
    visibilidad: 'carrera',
    categoria: 'educativo',
    color: '#10b981', // emerald
    estado: 'activo',
    coordenadasMapa: { x: 75, y: 20 }
  },
  {
    id: 5,
    titulo: 'Jueves de Juegos de Mesa',
    descripcion: 'Trae tus propios juegos o únete a una partida de Catan, Dixit, etc. ¡Relájate un rato!',
    fechaEvento: '2023-11-16',
    horaEvento: '16:00',
    cupoMaximo: null, // Sin límite
    inscritos: 24,
    tipoUbicacion: 'externa',
    edificioCampus: 'Cafetería Central',
    visibilidad: 'global',
    categoria: 'calidad',
    color: '#f59e0b', // amber
    estado: 'activo',
    coordenadasMapa: { x: 55, y: 80 }
  },
  {
    id: 6,
    titulo: 'Fiesta de Fin de Semestre (LCC)',
    descripcion: 'Celebración para alumnos de Ciencias de la Comunicación. Código de vestimenta: Formal/Casual.',
    fechaEvento: '2023-12-05',
    horaEvento: '21:00',
    cupoMaximo: 150,
    inscritos: 85,
    tipoUbicacion: 'externa',
    edificioCampus: 'Ubicación externa',
    visibilidad: 'carrera',
    categoria: 'fiesta',
    color: '#8b5cf6', // violet
    estado: 'activo',
    coordenadasMapa: { x: 80, y: 50 } // Simulando un lugar fuera o cerca del campus
  },
  {
    id: 7,
    titulo: 'Taller de Guitarra Acústica',
    descripcion: 'Clase cancelada por enfermedad del instructor. Se reprogramará pronto.',
    fechaEvento: '2023-11-14',
    horaEvento: '15:00',
    cupoMaximo: 15,
    inscritos: 12,
    tipoUbicacion: 'interna',
    edificioCampus: 'Artes',
    visibilidad: 'global',
    categoria: 'artistico',
    color: '#6b7280', // gray (cancelado)
    estado: 'cancelado',
    coordenadasMapa: { x: 25, y: 25 }
  }
];
