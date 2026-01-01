
import React, { useState, useEffect } from 'react';

interface WishFormProps {
  onSubmit: (name: string, text: string, remember: boolean) => void;
  onCancel: () => void;
  initialName: string;
}

const WishForm: React.FC<WishFormProps> = ({ onSubmit, onCancel, initialName }) => {
  const [name, setName] = useState(initialName);
  const [wish, setWish] = useState('');
  const [remember, setRemember] = useState(initialName !== '');
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    if (isAnonymous) {
      setName('');
    } else {
      setName(initialName);
    }
  }, [isAnonymous, initialName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wish.trim()) {
      onSubmit(isAnonymous ? '' : name, wish, remember && !isAnonymous);
    }
  };

  return (
    <div className="w-full max-w-lg p-12 glass-light rounded-[50px] animate-in slide-in-from-bottom-12 duration-700 shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-white/60">
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-1 rounded-full bg-blue-50 text-[10px] text-blue-400 font-bold uppercase tracking-[0.3em] mb-4">
          Nueva Conexión
        </div>
        <h2 className="text-4xl font-serif italic text-[#2c3e50] mb-2 leading-tight">Elevando Sueños</h2>
        <p className="text-slate-400 text-sm font-light tracking-wide italic">Escribe tus palabras para el mañana</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.2em]">Identidad</label>
            <button 
              type="button"
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${isAnonymous ? 'text-blue-500' : 'text-slate-300'}`}
            >
              {isAnonymous ? '[ Modo Anónimo ]' : 'Ser Anónimo'}
            </button>
          </div>
          
          {!isAnonymous && (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre aquí..."
                className="w-full bg-transparent border-b border-slate-200 py-3 text-[#2c3e50] font-serif italic text-xl focus:border-blue-200 outline-none transition-all placeholder:text-slate-300"
              />
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    checked={remember} 
                    onChange={(e) => setRemember(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded border transition-all ${remember ? 'bg-blue-400 border-blue-400' : 'border-slate-200'}`}>
                    {remember && <div className="w-2 h-2 bg-white rounded-full m-auto mt-[3px]"></div>}
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-light group-hover:text-slate-600 transition-colors">Recordar mi nombre para el próximo deseo</span>
              </label>
            </>
          )}
        </div>

        <div className="relative">
          <label className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.2em] mb-4 block">Mensaje de Luz</label>
          <textarea
            required
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            placeholder="¿Qué le dirías al 2026?"
            maxLength={100}
            className="w-full bg-transparent border-b border-slate-200 py-3 text-[#2c3e50] font-serif italic text-xl focus:border-blue-200 outline-none transition-all h-28 resize-none placeholder:text-slate-300 leading-relaxed"
          />
          <div className="text-right text-[10px] text-slate-300 mt-3 font-mono tracking-widest">
            {wish.length} / 100
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-6">
          <button
            type="submit"
            className="w-full py-5 bg-[#2c3e50] text-white rounded-full font-serif text-xl hover:bg-black transition-all shadow-2xl hover:-translate-y-1 active:scale-95"
          >
            Lanzar mi Propósito
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-2 text-slate-400 font-light text-[10px] hover:text-slate-600 transition-all uppercase tracking-[0.3em]"
          >
            Seguir observando
          </button>
        </div>
      </form>
    </div>
  );
};

export default WishForm;
