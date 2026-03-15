// ─── Game Types ───────────────────────────────────────────

export type CardType = 'attack' | 'skill' | 'power';
export type CardRarity = 'starter' | 'common' | 'uncommon' | 'rare';

export interface CardDef {
  id: string;
  name: string;
  cost: number; // energy cost, -1 = X cost
  type: CardType;
  rarity: CardRarity;
  description: string;
  damage?: number;
  block?: number;
  draw?: number;
  hits?: number; // for multi-hit
  aoe?: boolean;
  applyVulnerable?: number;
  applyWeak?: number;
  applyStrength?: number;
  upgraded?: boolean;
  upgradedVersion?: Partial<CardDef>;
}

export interface CardInstance {
  uid: string; // unique per card instance in deck
  defId: string;
  upgraded: boolean;
}

// ─── Status Effects ───────────────────────────────────────

export interface StatusEffects {
  vulnerable: number; // turns remaining
  weak: number;
  strength: number; // permanent stacks
  ritual: number; // strength gain per turn
  thorns: number; // damage when hit
  metallicize: number; // block per turn
}

export const emptyStatus = (): StatusEffects => ({
  vulnerable: 0,
  weak: 0,
  strength: 0,
  ritual: 0,
  thorns: 0,
  metallicize: 0,
});

// ─── Player ───────────────────────────────────────────────

export interface PlayerState {
  hp: number;
  maxHp: number;
  block: number;
  energy: number;
  maxEnergy: number;
  gold: number;
  status: StatusEffects;
}

// ─── Enemies ──────────────────────────────────────────────

export type IntentType = 'attack' | 'defend' | 'buff' | 'debuff' | 'attack_defend' | 'unknown';

export interface EnemyIntent {
  type: IntentType;
  value?: number; // damage or block amount
  hits?: number;
}

export interface EnemyInstance {
  id: string;
  defId: string;
  name: string;
  hp: number;
  maxHp: number;
  block: number;
  status: StatusEffects;
  intent: EnemyIntent;
  turnCounter: number;
}

export interface EnemyDef {
  id: string;
  name: string;
  hp: number;
  hpVariance?: number;
  getIntent: (turn: number, self: EnemyInstance) => EnemyIntent;
  onTurnEnd?: (self: EnemyInstance) => Partial<EnemyInstance>;
}

// ─── Map ──────────────────────────────────────────────────

export type MapNodeType = 'combat' | 'elite' | 'rest' | 'event' | 'shop' | 'boss' | 'start';

export interface MapNode {
  id: string;
  row: number;
  col: number;
  type: MapNodeType;
  connections: string[]; // IDs of nodes this connects to
  visited: boolean;
}

// ─── Game Phase ───────────────────────────────────────────

export type GamePhase =
  | 'main_menu'
  | 'map'
  | 'combat'
  | 'combat_reward'
  | 'rest'
  | 'event'
  | 'game_over'
  | 'victory'
  | 'deck_view'
  | 'card_upgrade';

// ─── Combat Animation ─────────────────────────────────────

export interface FloatingText {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  life: number;
}
