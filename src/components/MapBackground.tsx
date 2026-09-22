import React from 'react';

interface MapBackgroundProps {
  children: React.ReactNode;
}

const MapBackground: React.FC<MapBackgroundProps> = ({ children }) => {
  return (
    <div className="relative w-full h-full bg-[#e8eaed] overflow-hidden">
      {/* Fake Map Layout */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        {/* Calles principales (fondo claro, usamos divs como bloques) */}
        
        {/* Áreas Verdes */}
        <div className="absolute top-10 left-10 w-40 h-32 bg-[#c8e6c9] rounded-lg"></div>
        <div className="absolute bottom-20 right-10 w-64 h-48 bg-[#c8e6c9] rounded-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-[#c8e6c9] rounded-full"></div>

        {/* Edificios (Gris) */}
        <div className="absolute top-8 right-20 w-32 h-24 bg-[#d8dbdf] rounded shadow-sm"></div>
        <div className="absolute top-40 right-1/4 w-48 h-16 bg-[#d8dbdf] rounded shadow-sm"></div>
        <div className="absolute bottom-32 left-12 w-24 h-40 bg-[#d8dbdf] rounded shadow-sm"></div>
        <div className="absolute top-1/3 left-10 w-20 h-20 bg-[#d8dbdf] rounded shadow-sm"></div>
        <div className="absolute bottom-1/4 right-1/3 w-40 h-24 bg-[#d8dbdf] rounded shadow-sm"></div>
      </div>

      {/* Map Content (Markers) */}
      <div className="absolute inset-0 z-10">
        {children}
      </div>
    </div>
  );
};

export default MapBackground;
