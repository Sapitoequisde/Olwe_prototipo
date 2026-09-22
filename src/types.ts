export type CategoriaPlan = 'educativo' | 'calidad' | 'fiesta' | 'artistico' | 'deportivo' | 'otro';
export type VisibilidadPlan = 'global' | 'division' | 'carrera';
export type EstadoPlan = 'activo' | 'cancelado' | 'finalizado';
export type TipoUbicacionPlan = 'interna' | 'externa';

export interface Plan {
  id: number;
  titulo: string;
  descripcion: string;
  fechaEvento: string; // ISO 8601 o formato local YYYY-MM-DD
  horaEvento: string; // HH:mm
  cupoMaximo: number | null;
  inscritos: number;
  tipoUbicacion: TipoUbicacionPlan;
  edificioCampus?: string; // e.g. "9Q2", "12A"
  visibilidad: VisibilidadPlan;
  categoria: CategoriaPlan;
  color: string; // HEX color for the map marker
  estado: EstadoPlan;
  
  // Posición simulada para el mapa (coordenadas relativas X, Y del 0 al 100%)
  // ya que aún no tenemos Leaflet con lat/lng real.
  coordenadasMapa?: { x: number; y: number }; 
}
