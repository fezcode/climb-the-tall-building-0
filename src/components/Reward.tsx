import { useGameStore } from '../game/store';
import { Card } from './Card';
import { Gift, SkipForward } from 'lucide-react';

export function Reward() {
  const rewardCardIds = useGameStore(s => s.rewardCardIds);
  const addRewardCard = useGameStore(s => s.addRewardCard);
  const skipReward = useGameStore(s => s.skipReward);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center fade-in"
      style={{ background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #08080f 70%)' }}>
      
      {/* Title */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Gift size={28} className="text-amber-400" />
          <h2 className="font-cinzel text-3xl font-bold text-amber-400">Victory!</h2>
          <Gift size={28} className="text-amber-400" />
        </div>
        <p className="text-white/50 text-sm">Choose a card to add to your deck</p>
      </div>

      {/* Card choices */}
      <div className="flex gap-8 mb-10">
        {rewardCardIds.map(defId => {
          const tempCard = { uid: `reward-${defId}`, defId, upgraded: false };
          return (
            <div key={defId} className="slide-up">
              <Card
                card={tempCard}
                onClick={() => addRewardCard(defId)}
              />
            </div>
          );
        })}
      </div>

      {/* Skip button */}
      <button
        onClick={skipReward}
        className="btn-secondary flex items-center gap-2"
      >
        <SkipForward size={14} />
        Skip Reward
      </button>
    </div>
  );
}
