import React from 'react';
import { Plan } from '../types';

interface PlanMarkerProps {
  plan: Plan;
  onClick: (plan: Plan) => void;
}

const PlanMarker: React.FC<PlanMarkerProps> = ({ plan, onClick }) => {
  const isFull = plan.cupoMaximo !== null && plan.inscritos >= plan.cupoMaximo;
  const position = plan.coordenadasMapa || { x: 50, y: 50 };

  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 cursor-pointer group z-20 hover:z-30 transition-transform hover:scale-105"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      onClick={() => onClick(plan)}
    >
      {/* Circle Pin */}
      <div 
        className="relative flex items-center justify-center w-6 h-6 rounded-full shadow-md bg-white border border-gray-200 shrink-0"
      >
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }} />
        {isFull && (
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
        )}
      </div>

      {/* Label (Optional: visible always or on hover. Currently visible as in mockup) */}
      <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 flex items-center max-w-[140px] opacity-90 group-hover:opacity-100 transition-opacity">
         <span className="text-xs font-semibold truncate w-full text-gray-800" title={plan.titulo}>
            {plan.titulo}
         </span>
      </div>
    </div>
  );
};

export default PlanMarker;
