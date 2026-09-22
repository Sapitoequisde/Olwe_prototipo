import { Plan } from '../types';

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
