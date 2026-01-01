
import React from 'react';
import { CountdownState } from '../types';

interface CounterProps {
  countdown: CountdownState;
  activeUsers: number;
}

const Counter: React.FC<CounterProps> = ({ countdown, activeUsers }) => {
  return (
    <div className="fixed inset-x-0 top-0 p-4 sm:p-10 flex justify-between items-start z-40 pointer-events-none">
      {/* Contador de Almas Conectadas */}
      <div className="flex flex-col gap-0.5 sm:gap-1">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400 animate-pulse"></span>
          <span className="text-[7px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-400">En vivo</span>
        </div>
        <div className="flex items-baseline gap-1 sm:gap-2">
          <span className="text-xl sm:text-4xl font-light font-serif text-[#2c3e50] soft-glow">
            {activeUsers.toLocaleString()}
          </span>
          <span className="text-[7px] sm:text-[10px] uppercase tracking-widest text-slate-400 hidden xs:inline">unidos</span>
        </div>
      </div>

      {/* Cuenta Regresiva Elegante */}
      <div className="flex flex-col items-end gap-0.5 sm:gap-1">
        <span className="text-[7px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-400 mb-0.5 sm:mb-1">Hacia 2026</span>
        
        {countdown.isExpired ? (
          <div className="text-right">
             <span className="text-lg sm:text-3xl font-serif text-[#d4af37] italic">¡Feliz Año!</span>
          </div>
        ) : (
          <div className="flex gap-2 sm:gap-4 text-right">
            {[
              { label: 'D', value: countdown.days },
              { label: 'H', value: countdown.hours },
              { label: 'M', value: countdown.minutes },
              { label: 'S', value: countdown.seconds }
            ].map((unit, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-lg sm:text-3xl font-serif text-[#2c3e50] leading-none">
                  {unit.value.toString().padStart(2, '0')}
                </span>
                <span className="text-[6px] sm:text-[8px] uppercase tracking-tighter text-slate-300 font-bold">{unit.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Counter;
