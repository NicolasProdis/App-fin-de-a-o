
import React from 'react';
import { Wish } from '../types';

interface SkyProps {
  wishes: Wish[];
}

const Sky: React.FC<SkyProps> = ({ wishes }) => {
  // Función para generar las bombitas pequeñas acompañantes
  const renderCompanions = (order: number, size: number) => {
    // El número de acompañantes aumenta con el 'order' (número de deseos totales)
    // Mostramos un máximo visual de 15 para mantener la elegancia
    const count = Math.min(order, 15);
    const companions = [];
    
    for (let i = 0; i < count; i++) {
      // Distribución orbital elegante
      const angle = (i / count) * Math.PI * 2 + (order * 0.1); 
      const radius = size * 2.8 + (Math.sin(i + order) * 12);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      // Variación de tamaño para las bombitas pequeñas
      const s = Math.random() * 3 + 2;
      
      companions.push(
        <div
          key={i}
          className="absolute rounded-full bg-white shadow-[0_0_8px_white] animate-pulse"
          style={{
            width: `${s}px`,
            height: `${s}px`,
            transform: `translate(${x}px, ${y}px)`,
            opacity: 0.4 + Math.random() * 0.5,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 2 + 2}s`
          }}
        />
      );
    }
    return companions;
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {wishes.map((wish) => (
        <div
          key={wish.id}
          className="absolute bottom-[-300px] flex flex-col items-center wish-float"
          style={{
            left: `${wish.posX}%`,
            animationDuration: `${wish.duration}s`,
            animationDelay: `${wish.delay}s`,
          }}
        >
          {/* Globo y Estela */}
          <div className="relative flex items-center justify-center">
            {/* Bombitas Acompañantes */}
            <div className="absolute inset-0 flex items-center justify-center">
                {renderCompanions(wish.order, wish.size)}
            </div>

            {/* Aura de Luz Principal */}
            <div 
              className="absolute rounded-full bg-white blur-3xl opacity-30 animate-pulse"
              style={{
                width: `${wish.size * 6}px`,
                height: `${wish.size * 6}px`,
              }}
            />
            
            {/* Globo de Deseo */}
            <div 
              className="relative rounded-full border border-white/90 bg-white/50 backdrop-blur-lg flex items-center justify-center shadow-[0_10px_30px_rgba(255,255,255,0.4)]"
              style={{
                width: `${wish.size * 2.2}px`,
                height: `${wish.size * 2.8}px`,
                borderRadius: '50% 50% 50% 50% / 45% 45% 55% 55%'
              }}
            >
              {/* Reflejo interno del globo */}
              <div className="absolute top-[10%] left-[20%] w-[30%] h-[20%] bg-white/40 rounded-full blur-[2px]" />
              <div className="w-1/3 h-1/3 bg-white/30 rounded-full blur-md animate-pulse" />
            </div>

            {/* Hilo con luz degradada */}
            <div className="absolute top-[95%] w-[1px] h-24 bg-gradient-to-b from-white/70 via-white/20 to-transparent" />
          </div>

          {/* Información del Deseo Refinada */}
          <div className="mt-10 text-center px-6 max-w-[220px]">
             <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.4em] mb-2 italic">
              {wish.name}
            </p>
            <div className="relative">
                <p className="text-[#2c3e50] text-base font-light tracking-wide leading-relaxed italic font-serif">
                "{wish.text}"
                </p>
                {/* Pequeño adorno bajo el texto */}
                <div className="w-8 h-[1px] bg-slate-200 mx-auto mt-3 opacity-50" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sky;
