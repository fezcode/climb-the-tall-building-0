import { useGameStore } from '../game/store';
import { Swords, BookOpen, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

function FloatingParticle({ delay }: { delay: number }) {
  const [style] = useState(() => ({
    left: `${Math.random() * 100}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${4 + Math.random() * 6}s`,
    width: `${2 + Math.random() * 4}px`,
    height: `${2 + Math.random() * 4}px`,
    opacity: 0.2 + Math.random() * 0.4,
  }));

  return (
    <div
      className="particle absolute bottom-0"
      style={{
        ...style,
        backgroundColor: Math.random() > 0.5 ? '#f59e0b' : '#ef4444',
      }}
    />
  );
}

export function MainMenu() {
  const startRun = useGameStore(s => s.startRun);
  const [showTitle, setShowTitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowTitle(true), 200);
    setTimeout(() => setShowButtons(true), 800);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #08080f 70%)' }}>
      
      {/* Particle background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }, (_, i) => (
          <FloatingParticle key={i} delay={i * 0.3} />
        ))}
      </div>

      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)' }} />

      {/* Title */}
      <div className={`text-center mb-16 transition-all duration-1000 ${showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-sm uppercase tracking-[0.5em] text-amber-500/60 mb-4 font-medium">
          A Deck-Building Roguelike
        </div>
        <h1 className="font-cinzel text-7xl font-black mb-2"
          style={{
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 30px rgba(245, 158, 11, 0.3))',
          }}>
          CLIMB THE TALL BUILDING
        </h1>
        <div className="font-cinzel text-5xl font-black text-white/90"
          style={{ filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.1))' }}>
          0
        </div>
        <div className="mt-4 h-px w-64 mx-auto"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.5), transparent)' }} />
      </div>

      {/* Buttons */}
      <div className={`flex flex-col gap-4 items-center transition-all duration-700 ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <button
          onClick={startRun}
          className="btn-primary flex items-center gap-3 text-lg px-12 py-4"
        >
          <Swords size={22} />
          Start Run
        </button>

        <button className="btn-secondary flex items-center gap-2">
          <BookOpen size={16} />
          How to Play
        </button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-white/20 text-xs">
          <Trophy size={12} />
          <span>Build v1.0.0</span>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-amber-500/20" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-amber-500/20" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-amber-500/20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-amber-500/20" />
    </div>
  );
}
