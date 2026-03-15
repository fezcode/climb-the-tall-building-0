import { useGameStore } from '../game/store';
import { Heart, Shield, Zap, Layers, Archive } from 'lucide-react';

export function PlayerHUD() {
  const player = useGameStore(s => s.player);
  const phase = useGameStore(s => s.phase);
  const deck = useGameStore(s => s.deck);
  const act = useGameStore(s => s.act);
  const floorsCleared = useGameStore(s => s.floorsCleared);

  const hpPercent = (player.hp / player.maxHp) * 100;

  if (phase === 'main_menu') return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-3"
      style={{
        background: 'linear-gradient(180deg, rgba(8, 8, 15, 0.95), rgba(8, 8, 15, 0.7), transparent)',
        backdropFilter: 'blur(8px)',
      }}>
      {/* Left: HP */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Heart size={18} className="text-red-500" />
          <div className="w-32">
            <div className="health-bar" style={{ height: 10 }}>
              <div
                className={`health-bar-fill ${hpPercent < 30 ? 'low' : ''}`}
                style={{ width: `${hpPercent}%` }}
              />
            </div>
            <div className="text-xs text-white/60 text-center mt-0.5 font-mono">
              {player.hp}/{player.maxHp}
            </div>
          </div>
        </div>

        {/* Gold */}
        <div className="flex items-center gap-1.5 text-amber-400 text-sm font-bold">
          <span>💰</span>
          <span>{player.gold}</span>
        </div>
      </div>

      {/* Center: Act info */}
      <div className="text-center">
        <div className="text-xs text-white/40 uppercase tracking-widest">Act {act}</div>
        <div className="text-xs text-white/30">Floor {floorsCleared}</div>
      </div>

      {/* Right: Deck / Status */}
      <div className="flex items-center gap-4">
        {player.status.strength > 0 && (
          <span className="status-badge status-strength">💪 {player.status.strength}</span>
        )}
        {player.status.thorns > 0 && (
          <span className="status-badge status-thorns">🌹 {player.status.thorns}</span>
        )}
        {player.status.vulnerable > 0 && (
          <span className="status-badge status-vulnerable">⬇ {player.status.vulnerable}</span>
        )}
        {player.status.weak > 0 && (
          <span className="status-badge status-weak">💫 {player.status.weak}</span>
        )}
        
        <div className="flex items-center gap-1.5 text-white/50 text-sm">
          <Layers size={14} />
          <span className="font-mono">{deck.length}</span>
        </div>
      </div>
    </div>
  );
}

export function CombatHUD() {
  const player = useGameStore(s => s.player);
  const drawPile = useGameStore(s => s.drawPile);
  const discardPile = useGameStore(s => s.discardPile);
  const endPlayerTurn = useGameStore(s => s.endPlayerTurn);
  const isEnemyTurn = useGameStore(s => s.isEnemyTurn);
  const turn = useGameStore(s => s.turn);

  return (
    <>
      {/* Energy Orb - Bottom Left */}
      <div className="fixed bottom-52 left-6 z-30 flex flex-col items-center gap-1">
        <div className="energy-orb">
          {player.energy}/{player.maxEnergy}
        </div>
        <div className="text-[10px] text-white/40 uppercase tracking-wider flex items-center gap-1">
          <Zap size={10} /> Energy
        </div>
      </div>

      {/* Draw Pile - Bottom Left */}
      <div className="fixed bottom-8 left-6 z-30 flex flex-col items-center gap-1">
        <div className="w-12 h-16 rounded-lg flex items-center justify-center text-lg font-bold"
          style={{
            background: 'linear-gradient(145deg, #1a1a2e, #11111b)',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          }}>
          {drawPile.length}
        </div>
        <div className="text-[10px] text-white/40 flex items-center gap-1">
          <Layers size={9} /> Draw
        </div>
      </div>

      {/* Discard Pile - Bottom Right */}
      <div className="fixed bottom-8 right-6 z-30 flex flex-col items-center gap-1">
        <div className="w-12 h-16 rounded-lg flex items-center justify-center text-lg font-bold"
          style={{
            background: 'linear-gradient(145deg, #2a1a1a, #1b1111)',
            border: '2px solid rgba(239, 68, 68, 0.3)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          }}>
          {discardPile.length}
        </div>
        <div className="text-[10px] text-white/40 flex items-center gap-1">
          <Archive size={9} /> Discard
        </div>
      </div>

      {/* End Turn Button - Right Side */}
      <div className="fixed bottom-44 right-6 z-30">
        <button
          className="end-turn-btn"
          onClick={endPlayerTurn}
          disabled={isEnemyTurn}
        >
          {isEnemyTurn ? 'Enemy Turn...' : 'End Turn'}
        </button>
      </div>

      {/* Turn counter */}
      <div className="fixed top-16 right-6 z-30 text-xs text-white/30 font-mono">
        Turn {turn}
      </div>

      {/* Block display */}
      {player.block > 0 && (
        <div className="fixed bottom-52 left-20 z-30 flex items-center gap-1.5 bg-blue-500/20 border border-blue-500/40 rounded-full px-3 py-1.5">
          <Shield size={14} className="text-blue-400" />
          <span className="text-blue-300 font-bold text-sm">{player.block}</span>
        </div>
      )}
    </>
  );
}
