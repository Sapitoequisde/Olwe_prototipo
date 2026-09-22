import React from 'react';
import { CategoriaPlan, VisibilidadPlan, EstadoPlan } from '../types';

export interface FilterState {
  search: string;
  categoria: CategoriaPlan | 'todas';
  visibilidad: VisibilidadPlan | 'todas';
  estado: 'vigente' | 'expirado' | 'todos';
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onCreatePlan?: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, onCreatePlan }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="bg-white px-4 py-3 shadow-sm z-10 relative flex flex-col gap-3 w-full rounded-b-2xl mb-2">
      {/* Search Bar & Action */}
      <div className="flex gap-2 w-full items-center">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            className="block w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
            placeholder="Buscar..."
          />
        </div>
        <button
          type="button"
          onClick={onCreatePlan}
          className="px-4 py-2.5 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors shadow-sm shrink-0"
        >
          Crear un plan
        </button>
      </div>

      {/* Filters (Chips) */}
      <div className="flex overflow-x-auto pb-1 gap-2 w-full no-scrollbar">
        <select
          name="categoria"
          value={filters.categoria}
          onChange={handleChange}
          className="appearance-none bg-white border border-gray-200 text-gray-600 text-sm rounded-full px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium whitespace-nowrap cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <option value="todas">Todas las categorías</option>
          <option value="educativo">Educativo</option>
          <option value="calidad">Tiempo de Calidad</option>
          <option value="fiesta">Fiesta</option>
          <option value="artistico">Artístico</option>
          <option value="deportivo">Deportivo</option>
          <option value="otro">Otro</option>
        </select>

        <select
          name="visibilidad"
          value={filters.visibilidad}
          onChange={handleChange}
          className="appearance-none bg-white border border-gray-200 text-gray-600 text-sm rounded-full px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium whitespace-nowrap cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <option value="todas">Visibilidad</option>
          <option value="global">Toda la universidad</option>
          <option value="division">Mi división</option>
          <option value="carrera">Mi carrera</option>
        </select>

        <select
          name="estado"
          value={filters.estado}
          onChange={handleChange}
          className="appearance-none bg-white border border-gray-200 text-gray-600 text-sm rounded-full px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium whitespace-nowrap cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <option value="todos">Estado</option>
          <option value="vigente">Vigentes</option>
          <option value="expirado">Finalizados</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
