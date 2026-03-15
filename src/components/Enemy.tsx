import type { EnemyInstance } from '../types';
import { Swords, Shield, TrendingUp, AlertTriangle } from 'lucide-react';

interface EnemyProps {
  enemy: EnemyInstance;
  onClick?: () => void;
  isTargeted?: boolean;
}

const intentIcons: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  attack: { icon: <Swords size={16} />, color: '#ef4444', label: 'Attack' },
  defend: { icon: <Shield size={16} />, color: '#3b82f6', label: 'Defend' },
  buff: { icon: <TrendingUp size={16} />, color: '#f59e0b', label: 'Buff' },
  debuff: { icon: <AlertTriangle size={16} />, color: '#a855f7', label: 'Debuff' },
  attack_defend: { icon: <Swords size={16} />, color: '#f97316', label: 'Multi' },
  unknown: { icon: <AlertTriangle size={16} />, color: '#6b7280', label: '?' },
};

const enemyEmojis: Record<string, string> = {
  jaw_worm: '🐛',
  cultist: '🧙',
  red_louse: '🪲',
  green_louse: '🦗',
  slime_m: '🟢',
  slime_l: '🟩',
  fungi_beast: '🍄',
  gremlin_nob: '👹',
  lagavulin: '🗿',
  sentry: '🤖',
  the_guardian: '⚙️',
  hexaghost: '👻',
  slime_boss: '🟣',
};

export function EnemyComponent({ enemy, onClick, isTargeted }: EnemyProps) {
  const hpPercent = Math.max(0, (enemy.hp / enemy.maxHp) * 100);
  const intent = intentIcons[enemy.intent.type] || intentIcons.unknown;
  const isDead = enemy.hp <= 0;

  if (isDead) return null;

  return (
    <div
      className={`flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer ${
        isTargeted ? 'scale-110' : 'hover:scale-105'
      }`}
      onClick={onClick}
      style={{
        filter: isTargeted ? 'drop-shadow(0 0 15px rgba(239, 68, 68, 0.5))' : undefined,
      }}
    >
      {/* Intent */}
      <div
        className="intent-icon flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
        style={{
          backgroundColor: `${intent.color}20`,
          border: `1px solid ${intent.color}50`,
          color: intent.color,
        }}
      >
        {intent.icon}
        <span>
          {enemy.intent.type === 'attack' && enemy.intent.value && (
            <>
              {enemy.intent.value}
              {enemy.intent.hits && enemy.intent.hits > 1 ? ` x${enemy.intent.hits}` : ''}
            </>
          )}
          {enemy.intent.type === 'defend' && enemy.intent.value && enemy.intent.value}
          {(enemy.intent.type === 'buff' || enemy.intent.type === 'debuff') && intent.label}
        </span>
      </div>

      {/* Enemy sprite */}
      <div
        className="enemy-sprite relative flex items-center justify-center rounded-xl"
        style={{
          width: 90,
          height: 90,
          background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2))',
          border: `2px solid ${isTargeted ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
          boxShadow: isTargeted ? '0 0 20px rgba(239, 68, 68, 0.3)' : '0 4px 15px rgba(0,0,0,0.3)',
        }}
      >
        <span className="text-5xl select-none">{enemyEmojis[enemy.defId] || '👾'}</span>
        
        {/* Block badge */}
        {enemy.block > 0 && (
          <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">
            {enemy.block}
          </div>
        )}
      </div>

      {/* Name */}
      <div className="text-xs font-bold text-white/80 font-cinzel">{enemy.name}</div>

      {/* HP Bar */}
      <div className="w-24">
        <div className="health-bar">
          <div
            className={`health-bar-fill ${hpPercent < 30 ? 'low' : ''}`}
            style={{ width: `${hpPercent}%` }}
          />
        </div>
        <div className="text-center text-[10px] mt-0.5 text-white/60 font-mono">
          {enemy.hp}/{enemy.maxHp}
        </div>
      </div>

      {/* Status Effects */}
      <div className="flex gap-1 flex-wrap justify-center">
        {enemy.status.vulnerable > 0 && (
          <span className="status-badge status-vulnerable">⬇ {enemy.status.vulnerable}</span>
        )}
        {enemy.status.weak > 0 && (
          <span className="status-badge status-weak">💫 {enemy.status.weak}</span>
        )}
        {enemy.status.strength > 0 && (
          <span className="status-badge status-strength">💪 {enemy.status.strength}</span>
        )}
      </div>
    </div>
  );
}
