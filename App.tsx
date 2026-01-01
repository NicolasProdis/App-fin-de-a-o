
import React, { useState, useEffect } from 'react';
import { Wish, CountdownState } from './types';
import Sky from './components/Sky';
import WishForm from './components/WishForm';
import Counter from './components/Counter';
import Celebration from './components/Celebration';

const App: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [totalWishes, setTotalWishes] = useState(() => {
    const saved = localStorage.getItem('total_wishes_count');
    return saved ? parseInt(saved) : 0;
  });
  const [activeUsers, setActiveUsers] = useState(582);
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [isCelebrated, setIsCelebrated] = useState(false);
  const [savedName, setSavedName] = useState<string>(localStorage.getItem('user_name') || '');
  
  const [countdown, setCountdown] = useState<CountdownState>({ 
    days: 0, 
    hours: 0, 
    minutes: 0, 
    seconds: 0, 
    isExpired: false 
  });

  useEffect(() => {
    localStorage.setItem('total_wishes_count', totalWishes.toString());
  }, [totalWishes]);

  useEffect(() => {
    const target = new Date('2026-01-01T00:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance <= 0) {
        clearInterval(interval);
        setCountdown(prev => ({ ...prev, isExpired: true }));
        setIsCelebrated(true);
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        isExpired: false
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sampleNames = ['Sofía', 'Mateo', 'Elena', 'Julián', 'Valentina', 'Adrián', 'Clara', 'Lucas', 'Mía', 'Thiago'];
    const sampleWishes = [
      "Que la paz guíe nuestros pasos.",
      "Un año de salud y reencuentros.",
      "Cumplir mis sueños con alegría.",
      "Que el amor nunca falte en casa.",
      "Aprender algo nuevo cada día.",
      "Cuidar más de nuestro planeta.",
      "Ser la mejor versión de mí mismo.",
      "Viajar a lugares desconocidos.",
      "Encontrar la serenidad en lo pequeño."
    ];

    const simulateIncoming = () => {
      const randomDelay = Math.random() * 8000 + 4000;
      setTimeout(() => {
        setTotalWishes(currentTotal => {
          const nextOrder = currentTotal + 1;
          const newWish: Wish = {
            id: Math.random().toString(36).substr(2, 9),
            name: sampleNames[Math.floor(Math.random() * sampleNames.length)],
            text: sampleWishes[Math.floor(Math.random() * sampleWishes.length)],
            color: '#FFFFFF',
            size: Math.random() * 5 + 10,
            posX: Math.random() * 85 + 7.5,
            duration: Math.random() * 20 + 25,
            delay: 0,
            order: nextOrder
          };
          setWishes(prev => [...prev.slice(-20), newWish]); // Reducimos caché en móvil para rendimiento
          return nextOrder;
        });
        setActiveUsers(prev => Math.max(100, prev + (Math.random() > 0.45 ? 5 : -3)));
        simulateIncoming();
      }, randomDelay);
    };

    simulateIncoming();
  }, []);

  const handleAddWish = (name: string, text: string, remember: boolean) => {
    if (remember && name) {
      localStorage.setItem('user_name', name);
      setSavedName(name);
    } else if (!remember) {
      localStorage.removeItem('user_name');
      setSavedName('');
    }

    setTotalWishes(currentTotal => {
      const nextOrder = currentTotal + 1;
      const newWish: Wish = {
        id: Date.now().toString(),
        name: name || 'Invitado Anónimo',
        text: text,
        color: '#FFFFFF',
        size: 15,
        posX: Math.random() * 70 + 15,
        duration: 40,
        delay: 0,
        order: nextOrder
      };
      setWishes(prev => [...prev, newWish]);
      return nextOrder;
    });
    setIsFormOpen(false);
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden select-none cursor-default bg-gradient-to-b from-[#a5d8ff] to-white">
      {/* Background atmosphere */}
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-gradient-radial from-white/30 to-transparent blur-3xl pointer-events-none z-0"></div>
      
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="cloud w-[200px] sm:w-[400px] h-[80px] sm:h-[150px] top-[10%] left-[-5%] cloud-drift" style={{ animationDuration: '100s' }}></div>
        <div className="cloud w-[250px] sm:w-[600px] h-[100px] sm:h-[250px] top-[35%] left-[15%] cloud-drift" style={{ animationDuration: '140s', animationDelay: '-20s' }}></div>
        <div className="cloud w-[180px] sm:w-[450px] h-[70px] sm:h-[180px] top-[65%] left-[-10%] cloud-drift" style={{ animationDuration: '120s', animationDelay: '-60s' }}></div>
      </div>

      <Counter countdown={countdown} activeUsers={activeUsers} />
      
      <Sky wishes={wishes} />

      {isFormOpen && !isCelebrated && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-50/20 backdrop-blur-[12px] z-50 animate-in fade-in duration-700 px-4">
          <WishForm 
            onSubmit={handleAddWish} 
            onCancel={() => setIsFormOpen(false)} 
            initialName={savedName}
          />
        </div>
      )}

      {isCelebrated && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-3xl z-[100] animate-in fade-in duration-1000 px-4">
          <Celebration totalWishes={totalWishes} onDismiss={() => setIsCelebrated(false)} />
        </div>
      )}

      {!isCelebrated && !isFormOpen && (
        <div className="absolute bottom-10 sm:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10 w-full px-8">
          <button 
            onClick={() => setIsFormOpen(true)}
            className="group w-full max-w-[320px] sm:max-w-none sm:w-auto sm:px-20 py-5 sm:py-6 bg-white text-[#2c3e50] font-serif text-xl sm:text-2xl tracking-wide shadow-[0_25px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500 rounded-full border border-white/90 active:scale-95"
          >
            <span className="relative z-10">Lanzar nuevo Deseo</span>
          </button>
          
          {savedName && (
            <div className="flex items-center gap-2 text-[8px] sm:text-[10px] font-bold text-blue-400/80 uppercase tracking-[0.2em] sm:tracking-[0.3em] bg-white/40 px-4 py-1.5 rounded-full border border-white/60 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
              Conectado como {savedName}
            </div>
          )}
        </div>
      )}

      <div className="absolute bottom-4 left-0 right-0 px-6 sm:px-10 flex justify-between items-center opacity-40 sm:opacity-80 pointer-events-none">
        <div className="text-[7px] sm:text-[9px] font-bold text-slate-400 tracking-[0.3em] uppercase">
          Cloud Sync v1.0
        </div>
        <div className="text-[7px] sm:text-[9px] font-bold text-slate-400 tracking-[0.3em] uppercase">
          Esperanza 2026
        </div>
      </div>
    </div>
  );
};

export default App;
