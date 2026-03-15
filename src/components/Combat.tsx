import { useGameStore } from '../game/store';
import { getCardDef } from '../game/cards';
import { EnemyComponent } from './Enemy';
import { Card } from './Card';
import { CombatHUD } from './PlayerHUD';

export function Combat() {
  const hand = useGameStore(s => s.hand);
  const enemies = useGameStore(s => s.enemies);
  const selectedCardUid = useGameStore(s => s.selectedCardUid);
  const selectCard = useGameStore(s => s.selectCard);
  const playCard = useGameStore(s => s.playCard);
  const player = useGameStore(s => s.player);
  const isEnemyTurn = useGameStore(s => s.isEnemyTurn);

  const handleCardClick = (cardUid: string) => {
    if (isEnemyTurn) return;

    const cardInst = hand.find(c => c.uid === cardUid);
    if (!cardInst) return;

    const def = getCardDef(cardInst.defId, cardInst.upgraded);
    if (def.cost > player.energy) return;

    if (selectedCardUid === cardUid) {
      // Deselect
      selectCard(null);
      return;
    }

    // If it's an AOE or non-targeted card, play immediately
    if (def.aoe || !def.damage || def.type === 'skill' || def.type === 'power') {
      playCard(cardUid);
      return;
    }

    // For single target attacks, select the card first
    selectCard(cardUid);
  };

  const handleEnemyClick = (enemyId: string) => {
    if (selectedCardUid && !isEnemyTurn) {
      playCard(selectedCardUid, enemyId);
    }
  };

  const liveEnemies = enemies.filter(e => e.hp > 0);

  return (
    <div className="w-full h-full relative flex flex-col fade-in"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a1a2e 0%, #08080f 70%)' }}>
      
      {/* Background grid decoration */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

      {/* Enemy area - Top half */}
      <div className="flex-1 flex items-center justify-center pt-16 pb-4 relative">
        <div className="flex items-end gap-8">
          {liveEnemies.map(enemy => (
            <EnemyComponent
              key={enemy.id}
              enemy={enemy}
              onClick={() => handleEnemyClick(enemy.id)}
              isTargeted={selectedCardUid !== null}
            />
          ))}
        </div>

        {/* Enemy turn overlay */}
        {isEnemyTurn && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-8 py-4 backdrop-blur-sm">
              <div className="text-red-400 font-bold text-lg uppercase tracking-widest animate-pulse">
                ⚔️ Enemy Turn
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Separator line */}
      <div className="w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.2), transparent)' }} />

      {/* Player hand area - Bottom */}
      <div className="h-56 relative flex items-center justify-center pb-4"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)' }}>
        
        {/* Cards in hand */}
        <div className="flex items-end justify-center" style={{ gap: '-10px' }}>
          {hand.map((card, i) => {
            const def = getCardDef(card.defId, card.upgraded);
            const canPlay = def.cost <= player.energy && !isEnemyTurn;
            const totalCards = hand.length;
            const spreadAngle = Math.min(totalCards * 3, 30);
            const angle = totalCards > 1
              ? -spreadAngle / 2 + (i / (totalCards - 1)) * spreadAngle
              : 0;
            const yOffset = Math.abs(angle) * 0.5;

            return (
              <div
                key={card.uid}
                style={{
                  transform: `rotate(${angle}deg) translateY(${yOffset}px)`,
                  marginLeft: i === 0 ? 0 : -15,
                  zIndex: selectedCardUid === card.uid ? 100 : i + 1,
                }}
              >
                <Card
                  card={card}
                  selected={selectedCardUid === card.uid}
                  onClick={() => handleCardClick(card.uid)}
                  disabled={!canPlay}
                />
              </div>
            );
          })}
        </div>

        {/* Hint when card selected */}
        {selectedCardUid && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-amber-400/70 animate-pulse">
            Click an enemy to attack
          </div>
        )}
      </div>

      {/* Combat HUD elements */}
      <CombatHUD />
    </div>
  );
}
