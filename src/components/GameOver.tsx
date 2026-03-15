import { useGameStore } from '../game/store';
import { Skull, Trophy, RotateCcw, Home, Swords, Heart, Layers } from 'lucide-react';
import { Card } from './Card';

export function GameOver() {
  const startRun = useGameStore(s => s.startRun);
  const returnToMainMenu = useGameStore(s => s.returnToMainMenu);
  const floorsCleared = useGameStore(s => s.floorsCleared);
  const cardsPlayed = useGameStore(s => s.cardsPlayed);

  const deck = useGameStore(s => s.deck);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center fade-in"
      style={{ background: 'radial-gradient(ellipse at center, #2a1015 0%, #08080f 70%)' }}>
      
      <Skull size={64} className="text-red-500 mb-4" />
      <h1 className="font-cinzel text-5xl font-black text-red-500 mb-2">DEFEATED</h1>
      <p className="text-white/40 text-sm mb-8">Your journey ends here...</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-10 p-6 rounded-xl"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <Swords size={14} className="text-amber-400" />
          <span>Floors: {floorsCleared}</span>
        </div>
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <Layers size={14} className="text-blue-400" />
          <span>Cards Played: {cardsPlayed}</span>
        </div>
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <Heart size={14} className="text-red-400" />
          <span>Deck Size: {deck.length}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={startRun} className="btn-primary flex items-center gap-2">
          <RotateCcw size={16} />
          Try Again
        </button>
        <button onClick={returnToMainMenu} className="btn-secondary flex items-center gap-2">
          <Home size={16} />
          Main Menu
        </button>
      </div>
    </div>
  );
}

export function Victory() {
  const startRun = useGameStore(s => s.startRun);
  const returnToMainMenu = useGameStore(s => s.returnToMainMenu);
  const floorsCleared = useGameStore(s => s.floorsCleared);
  const cardsPlayed = useGameStore(s => s.cardsPlayed);
  const deck = useGameStore(s => s.deck);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center fade-in"
      style={{ background: 'radial-gradient(ellipse at center, #1a2e1a 0%, #08080f 70%)' }}>
      
      <Trophy size={64} className="text-amber-400 mb-4" />
      <h1 className="font-cinzel text-5xl font-black mb-2"
        style={{
          background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
        VICTORY!
      </h1>
      <p className="text-white/50 text-sm mb-8">You have climbed the tall building!</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-10 p-6 rounded-xl"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <Swords size={14} className="text-amber-400" />
          <span>Floors: {floorsCleared}</span>
        </div>
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <Layers size={14} className="text-blue-400" />
          <span>Cards Played: {cardsPlayed}</span>
        </div>
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <Heart size={14} className="text-red-400" />
          <span>Final Deck: {deck.length}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={startRun} className="btn-primary flex items-center gap-2">
          <RotateCcw size={16} />
          New Run
        </button>
        <button onClick={returnToMainMenu} className="btn-secondary flex items-center gap-2">
          <Home size={16} />
          Main Menu
        </button>
      </div>
    </div>
  );
}

export function DeckView() {
  const deck = useGameStore(s => s.deck);
  const setPhase = useGameStore(s => s.setPhase);
  const previousPhase = useGameStore(s => s.previousPhase);

  return (
    <div className="w-full h-full flex flex-col items-center fade-in pt-16"
      style={{ background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #08080f 70%)' }}>
      
      <h2 className="font-cinzel text-2xl font-bold text-white/80 mb-6">Your Deck ({deck.length} cards)</h2>

      <div className="flex-1 overflow-y-auto px-8 pb-8">
        <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
          {deck.map(card => (
            <Card key={card.uid} card={card} small />
          ))}
        </div>
      </div>

      <div className="pb-6">
        <button
          onClick={() => setPhase(previousPhase || 'map')}
          className="btn-secondary"
        >
          Close
        </button>
      </div>
    </div>
  );
}
