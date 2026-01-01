
import React from 'react';
import { CountdownState } from '../types';

interface CounterProps {
  countdown: CountdownState;
  activeUsers: number;
}

const Counter: React.FC<CounterProps> = ({ countdown, activeUsers }) => {
  return (
    <div className="fixed inset-x-0 top-0 p-10 flex justify-between items-start z-40 pointer-events-none">
      {/* Contador de Almas Conectadas */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          <span className="text-[10px] font-light uppercase tracking-[0.3em] text-slate-400">Comunidad Global</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-light font-serif text-[#2c3e50] soft-glow">
            {activeUsers.toLocaleString()}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-400">Personas unidas</span>
        </div>
      </div>

      {/* Cuenta Regresiva Elegante */}
      <div className="flex flex-col items-end gap-1">
        <span className="text-[10px] font-light uppercase tracking-[0.3em] text-slate-400 mb-1">Hacia el 2026</span>
        
        {countdown.isExpired ? (
          <div className="text-right">
             <span className="text-3xl font-serif text-[#d4af37] italic">Nuevo Comienzo</span>
          </div>
        ) : (
          <div className="flex gap-6 font-light text-[#2c3e50]">
            {[
              { val: countdown.days, label: 'días' },
              { val: countdown.hours, label: 'horas' },
              { val: countdown.minutes, label: 'min' },
              { val: countdown.seconds, label: 'seg' }
            ].map((unit, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl font-serif leading-none">{String(unit.val).padStart(2, '0')}</span>
                <span className="text-[9px] text-slate-400 mt-1 uppercase tracking-tighter">{unit.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Counter;
