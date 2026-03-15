import { getCardDef } from '../game/cards';
import type { CardInstance } from '../types';

interface CardProps {
  card: CardInstance;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  small?: boolean;
  showUpgradeGlow?: boolean;
}

const typeEmoji: Record<string, string> = {
  attack: '⚔️',
  skill: '🛡️',
  power: '✨',
};

const typeColors: Record<string, { border: string; bg: string; glow: string }> = {
  attack: { border: 'rgba(239, 68, 68, 0.6)', bg: 'linear-gradient(145deg, #2a1015 0%, #1a0a0e 100%)', glow: 'rgba(239, 68, 68, 0.3)' },
  skill: { border: 'rgba(59, 130, 246, 0.6)', bg: 'linear-gradient(145deg, #0f1a2e 0%, #0a1020 100%)', glow: 'rgba(59, 130, 246, 0.3)' },
  power: { border: 'rgba(168, 85, 247, 0.6)', bg: 'linear-gradient(145deg, #1f102e 0%, #140a20 100%)', glow: 'rgba(168, 85, 247, 0.3)' },
};

export function Card({ card, selected, onClick, disabled, small, showUpgradeGlow }: CardProps) {
  const def = getCardDef(card.defId, card.upgraded);
  const colors = typeColors[def.type] || typeColors.attack;

  const w = small ? 100 : 140;
  const h = small ? 145 : 200;

  return (
    <div
      className={`card-container ${selected ? 'selected' : ''} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      onClick={onClick}
      style={{ display: 'inline-block' }}
    >
      <div
        style={{
          width: w,
          height: h,
          borderRadius: 12,
          overflow: 'hidden',
          position: 'relative',
          background: colors.bg,
          border: `2px solid ${colors.border}`,
          boxShadow: `0 4px 20px ${colors.glow}, inset 0 1px 0 rgba(255,255,255,0.05)${showUpgradeGlow ? ', 0 0 25px rgba(34, 197, 94, 0.6)' : ''}`,
        }}
      >
        {/* Cost orb */}
        <div className="card-cost" style={{ width: small ? 24 : 32, height: small ? 24 : 32, fontSize: small ? 12 : 16 }}>
          {def.cost >= 0 ? def.cost : 'X'}
        </div>

        {/* Card art area */}
        <div
          className="flex items-center justify-center"
          style={{
            height: small ? 55 : 80,
            marginTop: small ? 8 : 12,
            fontSize: small ? 28 : 40,
            background: 'rgba(0,0,0,0.2)',
            margin: `${small ? 8 : 12}px 8px 0 8px`,
            borderRadius: 6,
          }}
        >
          {typeEmoji[def.type]}
        </div>

        {/* Name */}
        <div
          className="text-center font-bold px-1 font-cinzel"
          style={{
            fontSize: small ? 9 : 11,
            marginTop: small ? 4 : 6,
            color: card.upgraded ? '#4ade80' : 'rgba(255,255,255,0.95)',
            textShadow: card.upgraded ? '0 0 8px rgba(74, 222, 128, 0.5)' : 'none',
          }}
        >
          {def.name}
        </div>

        {/* Separator */}
        <div className="mx-3 my-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)` }} />

        {/* Description */}
        <div
          className="text-center px-2 leading-tight"
          style={{
            fontSize: small ? 7 : 9,
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          {def.description}
        </div>

        {/* Type label */}
        <div
          className="absolute bottom-1 left-0 right-0 text-center uppercase tracking-wider"
          style={{
            fontSize: small ? 6 : 7,
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          {def.type}
        </div>

        {/* Upgraded shimmer */}
        {card.upgraded && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, transparent 30%, rgba(74, 222, 128, 0.05) 50%, transparent 70%)',
            }}
          />
        )}
      </div>
    </div>
  );
}
