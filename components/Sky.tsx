
import React from 'react';
import { Wish } from '../types';

interface SkyProps {
  wishes: Wish[];
}

const Sky: React.FC<SkyProps> = ({ wishes }) => {
  const renderCompanions = (order: number, size: number) => {
    // Limitamos el número de acompañantes para no saturar el rendimiento en móviles
    const count = Math.min(order % 12, 8);
    const companions = [];
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (order * 0.1); 
      const radius = size * 2.2 + (Math.sin(i + order) * 8);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      const s = Math.random() * 1.5 + 1;
      
      companions.push(
        <div
          key={i}
          className="absolute rounded-full bg-white shadow-[0_0_4px_white] animate-pulse"
          style={{
            width: `${s}px`,
            height: `${s}px`,
            transform: `translate(${x}px, ${y}px)`,
            opacity: 0.2 + Math.random() * 0.3,
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
          className="absolute wish-float flex flex-col items-center"
          style={{
            left: `${wish.posX}%`,
            bottom: '-20%',
            animationDuration: `${wish.duration}s`,
            animationDelay: `${wish.delay}s`,
          }}
        >
          {/* Brillo etéreo alrededor de la esfera */}
          <div className="absolute w-24 h-24 sm:w-32 sm:h-32 bg-white/10 blur-2xl rounded-full -z-10" />
          
          {/* Esfera / Globo de deseo */}
          <div 
            className="relative flex items-center justify-center rounded-full glass-light border border-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.03)]"
            style={{ 
              width: `${Math.min(wish.size * 4 + 45, 130)}px`, 
              height: `${Math.min(wish.size * 4 + 45, 130)}px`,
              maxWidth: '85vw' // Asegura que no se desborde en móviles muy pequeños
            }}
          >
            {renderCompanions(wish.order, wish.size)}
            
            <div className="text-center px-3 sm:px-4">
              <span className="block text-[7px] sm:text-[9px] font-bold uppercase tracking-widest text-blue-400/80 mb-0.5 sm:mb-1">
                {wish.name || 'Anónimo'}
              </span>
              <p className="text-[9px] sm:text-[11px] font-serif italic text-[#2c3e50] leading-tight line-clamp-3">
                "{wish.text}"
              </p>
            </div>
          </div>
          
          {/* Hilo de luz */}
          <div className="w-[0.5px] h-16 sm:h-32 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      ))}
    </div>
  );
};

export default Sky;
