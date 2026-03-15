import { useGameStore } from '../game/store';
import { Card } from './Card';
import { Heart, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export function RestSite() {
  const rest = useGameStore(s => s.rest);
  const player = useGameStore(s => s.player);
  const deck = useGameStore(s => s.deck);
  const upgradeCard = useGameStore(s => s.upgradeCard);

  const [showUpgrade, setShowUpgrade] = useState(false);

  const healAmount = Math.floor(player.maxHp * 0.3);
  const upgradableCards = deck.filter(c => !c.upgraded);

  if (showUpgrade) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center fade-in"
        style={{ background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #08080f 70%)' }}>
        
        <div className="text-center mb-8">
          <h2 className="font-cinzel text-2xl font-bold text-green-400 mb-2">Upgrade a Card</h2>
          <p className="text-white/50 text-sm">Choose a card to upgrade</p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center max-w-4xl mb-8 overflow-y-auto max-h-96 px-4">
          {upgradableCards.map(card => (
            <Card
              key={card.uid}
              card={card}
              onClick={() => upgradeCard(card.uid)}
              small
              showUpgradeGlow
            />
          ))}
        </div>

        <button onClick={() => setShowUpgrade(false)} className="btn-secondary">
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center fade-in"
      style={{ background: 'radial-gradient(ellipse at 50% 60%, #1a2e1a 0%, #08080f 70%)' }}>
      
      {/* Campfire */}
      <div className="text-6xl mb-6 animate-pulse">🔥</div>

      <h2 className="font-cinzel text-3xl font-bold text-amber-400 mb-2">Rest Site</h2>
      <p className="text-white/40 text-sm mb-10">Take a well-deserved break</p>

      <div className="flex gap-6">
        {/* Rest option */}
        <button
          onClick={rest}
          className="flex flex-col items-center gap-3 p-6 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
          style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
          }}
        >
          <Heart size={32} className="text-green-400" />
          <span className="font-bold text-green-400">Rest</span>
          <span className="text-xs text-white/50">Heal {healAmount} HP</span>
          <span className="text-[10px] text-white/30">({player.hp}/{player.maxHp} HP)</span>
        </button>

        {/* Upgrade option */}
        <button
          onClick={() => upgradableCards.length > 0 ? setShowUpgrade(true) : null}
          disabled={upgradableCards.length === 0}
          className="flex flex-col items-center gap-3 p-6 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
          }}
        >
          <TrendingUp size={32} className="text-amber-400" />
          <span className="font-bold text-amber-400">Smith</span>
          <span className="text-xs text-white/50">Upgrade a Card</span>
          <span className="text-[10px] text-white/30">({upgradableCards.length} upgradable)</span>
        </button>
      </div>
    </div>
  );
}

export function EventScreen() {
  const setPhase = useGameStore(s => s.setPhase);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center fade-in"
      style={{ background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #08080f 70%)' }}>
      
      <div className="text-6xl mb-6">❓</div>
      <h2 className="font-cinzel text-2xl font-bold text-blue-400 mb-3">Random Event</h2>
      <p className="text-white/50 text-sm mb-2">You stumble upon something interesting...</p>
      <p className="text-green-400 text-sm mb-1">+15 HP restored</p>
      <p className="text-amber-400 text-sm mb-8">+25 Gold found</p>

      <button onClick={() => setPhase('map')} className="btn-primary">
        Continue
      </button>
    </div>
  );
}
