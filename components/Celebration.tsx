
import React, { useRef } from 'react';

interface CelebrationProps {
  totalWishes: number;
  onDismiss: () => void;
}

const Celebration: React.FC<CelebrationProps> = ({ totalWishes, onDismiss }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const downloadSummary = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient (Day Sky)
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#a5d8ff');
    grad.addColorStop(1, '#ffffff');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative Borders
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 15;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    // Content
    ctx.textAlign = 'center';
    ctx.fillStyle = '#2c3e50';
    
    ctx.font = 'italic 45px serif';
    ctx.fillText('¡Feliz Año Nuevo!', canvas.width / 2, 140);
    
    ctx.font = '700 80px serif';
    ctx.fillStyle = '#d4af37';
    ctx.fillText('2026', canvas.width / 2, 230);

    ctx.font = '24px sans-serif';
    ctx.fillStyle = '#7f8c8d';
    ctx.fillText('Hemos iluminado el cielo con', canvas.width / 2, 310);
    
    ctx.font = '700 60px serif';
    ctx.fillStyle = '#2c3e50';
    ctx.fillText(totalWishes.toString(), canvas.width / 2, 380);
    
    ctx.font = 'italic 20px serif';
    ctx.fillStyle = '#7f8c8d';
    ctx.fillText('Deseos de Esperanza', canvas.width / 2, 420);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#bdc3c7';
    ctx.fillText('Cielo de Esperanza 2026 // Comunidad Global', canvas.width / 2, 530);

    const link = document.createElement('a');
    link.download = `esperanza_2026.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="text-center p-16 glass-light border border-white rounded-[60px] max-w-xl w-full relative overflow-hidden shadow-2xl animate-in zoom-in duration-700">
      <div className="relative z-10">
        <h1 className="text-8xl font-serif font-bold text-[#d4af37] mb-2 italic">
          2026
        </h1>
        <h2 className="text-3xl font-serif text-[#2c3e50] mb-12 tracking-tight">
          Un Nuevo Horizonte Comienza
        </h2>
        
        <div className="mb-14">
          <p className="text-slate-400 text-xs uppercase tracking-[0.3em] mb-4">
            Luz compartida hoy
          </p>
          <div className="text-7xl font-serif text-[#2c3e50] italic">
            {totalWishes}
          </div>
          <p className="text-slate-400 text-sm mt-4 font-light italic">
            Deseos que ahora viajan por el mundo
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <button
            onClick={downloadSummary}
            className="w-full py-5 bg-[#d4af37] text-white rounded-full font-serif text-xl hover:bg-[#b8962d] transition-all shadow-xl"
          >
            Descargar mi Recuerdo
          </button>
          <button
            onClick={onDismiss}
            className="w-full py-2 text-slate-400 font-light text-xs hover:text-slate-600 transition-all uppercase tracking-widest"
          >
            Volver al cielo
          </button>
        </div>
      </div>

      <canvas ref={canvasRef} width={600} height={600} className="hidden" />
      
      {/* Sun Ray Effect */}
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-radial from-white/40 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Celebration;
