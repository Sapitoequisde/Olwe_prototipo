import React from 'react';
import { Plan } from '../types';

interface PlanDetailModalProps {
  plan: Plan;
  onClose: () => void;
}

const formatCategoria = (cat: string) => {
  const map: Record<string, string> = {
    educativo: 'Educativo',
    calidad: 'Tiempo de Calidad',
    fiesta: 'Fiesta',
    artistico: 'Artístico',
    deportivo: 'Deportivo',
    otro: 'Otro'
  };
  return map[cat] || cat;
};

const PlanDetailModal: React.FC<PlanDetailModalProps> = ({ plan, onClose }) => {
  const isFull = plan.cupoMaximo !== null && plan.inscritos >= plan.cupoMaximo;

  return (
    <div className="plan-detail-backdrop fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-gray-900 bg-opacity-40 backdrop-blur-sm transition-opacity">
      <div 
        className="plan-detail-modal bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh] animate-[slideUp_0.3s_ease-out]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="plan-detail-titlebar">
          <button onClick={onClose} className="plan-back-button" type="button">← Atrás</button>
          <h2 id="modal-title">Detalle del plan</h2>
          <button onClick={onClose} className="plan-close-button" aria-label="Cerrar modal" type="button">×</button>
        </div>

        <div className="plan-detail-split">
          <section className="plan-detail-column">
            <div className="plan-detail-heading">
              <span className="plan-detail-icon" style={{ backgroundColor: plan.color }}>▤</span>
              <h3>{plan.titulo}</h3>
            </div>

            <p className="plan-detail-description">
              <strong>Descripción:</strong><br />
              {plan.descripcion}
            </p>

            <div className="plan-detail-fields">
              <p><span>Fecha:</span><b>{plan.fechaEvento}</b></p>
              <p><span>Hora:</span><b>{plan.horaEvento}</b></p>
              <p><span>Aforo:</span><b>{plan.cupoMaximo ?? 'Ilimitado'} {isFull && '(Lleno)'}</b></p>
              <p><span>Ubicación:</span><b>{plan.edificioCampus || 'Exterior'}</b></p>
              <p><span>Visibilidad:</span><b>{plan.visibilidad === 'global' ? 'Toda la Universidad' : `Mi ${plan.visibilidad}`}</b></p>
              <p><span>Categoría:</span><b>{formatCategoria(plan.categoria)}</b></p>
            </div>

            <button
              disabled={isFull || plan.estado === 'cancelado'}
              className={`plan-join-button ${isFull || plan.estado === 'cancelado' ? 'is-disabled' : ''}`}
              type="button"
            >
              {plan.estado === 'cancelado' ? 'Cancelado' : isFull ? 'Cupo Lleno' : 'Unirme'}
            </button>
          </section>

          <section className="plan-edit-column">
            <p className="plan-edit-kicker">Editar plan</p>
            <label>Título<input defaultValue={plan.titulo} /></label>
            <label>Descripción:<textarea defaultValue={plan.descripcion} /></label>
            <div className="plan-edit-row">
              <label>Fecha<input defaultValue={plan.fechaEvento} /></label>
              <label>Hora<input defaultValue={plan.horaEvento} /></label>
            </div>
            <label>Visibilidad<select defaultValue={plan.visibilidad}><option value="global">Toda la universidad</option><option value="division">Mi división</option><option value="carrera">Mi carrera</option></select></label>
            <div className="plan-edit-row">
              <label>Aforo<input defaultValue={plan.cupoMaximo ?? 'Ilimitado'} /></label>
              <label>Ubicación<input defaultValue={plan.edificioCampus || 'Exterior'} /></label>
            </div>
            <div className="plan-edit-actions">
              <button type="button" className="plan-delete-button">Eliminar plan</button>
              <button type="button" className="plan-update-button">Actualizar</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailModal;
