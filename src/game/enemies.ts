import type { EnemyDef, EnemyIntent } from '../types';

export const ENEMY_DEFS: Record<string, EnemyDef> = {
  jaw_worm: {
    id: 'jaw_worm',
    name: 'Jaw Worm',
    hp: 44,
    hpVariance: 4,
    getIntent: (turn: number): EnemyIntent => {
      const cycle = turn % 3;
      if (cycle === 0) return { type: 'attack', value: 11 };
      if (cycle === 1) return { type: 'defend', value: 6 };
      return { type: 'buff' };
    },
  },
  cultist: {
    id: 'cultist',
    name: 'Cultist',
    hp: 50,
    hpVariance: 6,
    getIntent: (turn: number): EnemyIntent => {
      if (turn === 0) return { type: 'buff' }; // ritual (gain strength each turn)
      return { type: 'attack', value: 6 };
    },
    onTurnEnd: (self) => ({
      status: { ...self.status, strength: self.status.strength + self.status.ritual },
    }),
  },
  red_louse: {
    id: 'red_louse',
    name: 'Red Louse',
    hp: 15,
    hpVariance: 3,
    getIntent: (): EnemyIntent => {
      return { type: 'attack', value: 5 + Math.floor(Math.random() * 3) };
    },
  },
  green_louse: {
    id: 'green_louse',
    name: 'Green Louse',
    hp: 17,
    hpVariance: 4,
    getIntent: (turn: number): EnemyIntent => {
      if (turn % 3 === 2) return { type: 'debuff' };
      return { type: 'attack', value: 6 + Math.floor(Math.random() * 2) };
    },
  },
  slime_m: {
    id: 'slime_m',
    name: 'Slime (M)',
    hp: 30,
    hpVariance: 4,
    getIntent: (turn: number): EnemyIntent => {
      if (turn % 3 === 0) return { type: 'attack', value: 10 };
      if (turn % 3 === 1) return { type: 'debuff' };
      return { type: 'attack', value: 7 };
    },
  },
  slime_l: {
    id: 'slime_l',
    name: 'Slime (L)',
    hp: 68,
    hpVariance: 4,
    getIntent: (turn: number): EnemyIntent => {
      if (turn % 2 === 0) return { type: 'attack', value: 16 };
      return { type: 'debuff' };
    },
  },
  fungi_beast: {
    id: 'fungi_beast',
    name: 'Fungi Beast',
    hp: 24,
    hpVariance: 4,
    getIntent: (turn: number): EnemyIntent => {
      if (turn % 2 === 0) return { type: 'attack', value: 6 };
      return { type: 'buff' };
    },
  },
  // ─── ELITES ──────────────────────────────────────
  gremlin_nob: {
    id: 'gremlin_nob',
    name: 'Gremlin Nob',
    hp: 110,
    hpVariance: 6,
    getIntent: (turn: number): EnemyIntent => {
      if (turn === 0) return { type: 'buff' }; // enrage
      if (turn % 2 === 1) return { type: 'attack', value: 14 };
      return { type: 'attack', value: 8 };
    },
  },
  lagavulin: {
    id: 'lagavulin',
    name: 'Lagavulin',
    hp: 112,
    hpVariance: 4,
    getIntent: (turn: number): EnemyIntent => {
      if (turn < 2) return { type: 'defend', value: 8 };
      if (turn % 3 === 2) return { type: 'debuff' };
      return { type: 'attack', value: 18 };
    },
  },
  sentry: {
    id: 'sentry',
    name: 'Sentry',
    hp: 40,
    hpVariance: 2,
    getIntent: (turn: number): EnemyIntent => {
      if (turn % 2 === 0) return { type: 'attack', value: 9 };
      return { type: 'debuff' };
    },
  },
  // ─── BOSS ──────────────────────────────────────
  the_guardian: {
    id: 'the_guardian',
    name: 'The Guardian',
    hp: 240,
    getIntent: (turn: number): EnemyIntent => {
      const cycle = turn % 4;
      if (cycle === 0) return { type: 'attack', value: 32 };
      if (cycle === 1) return { type: 'defend', value: 20 };
      if (cycle === 2) return { type: 'attack', value: 10, hits: 4 };
      return { type: 'buff' };
    },
  },
  hexaghost: {
    id: 'hexaghost',
    name: 'Hexaghost',
    hp: 250,
    getIntent: (turn: number): EnemyIntent => {
      const cycle = turn % 5;
      if (cycle === 0) return { type: 'buff' };
      if (cycle === 1) return { type: 'attack', value: 6, hits: 6 };
      if (cycle === 2) return { type: 'attack', value: 5 };
      if (cycle === 3) return { type: 'defend', value: 12 };
      return { type: 'attack', value: 2, hits: 6 };
    },
  },
  slime_boss: {
    id: 'slime_boss',
    name: 'Slime Boss',
    hp: 150,
    getIntent: (turn: number): EnemyIntent => {
      if (turn % 3 === 0) return { type: 'attack', value: 35 };
      if (turn % 3 === 1) return { type: 'debuff' };
      return { type: 'attack', value: 24 };
    },
  },
};

export type EncounterType = 'normal' | 'elite' | 'boss';

export interface Encounter {
  enemies: string[]; // enemy def IDs
}

const NORMAL_ENCOUNTERS: Encounter[] = [
  { enemies: ['jaw_worm'] },
  { enemies: ['cultist'] },
  { enemies: ['red_louse', 'green_louse'] },
  { enemies: ['slime_m'] },
  { enemies: ['red_louse', 'red_louse'] },
  { enemies: ['fungi_beast', 'fungi_beast'] },
  { enemies: ['green_louse', 'green_louse', 'red_louse'] },
  { enemies: ['slime_l'] },
];

const ELITE_ENCOUNTERS: Encounter[] = [
  { enemies: ['gremlin_nob'] },
  { enemies: ['lagavulin'] },
  { enemies: ['sentry', 'sentry'] },
];

const BOSS_ENCOUNTERS: Encounter[] = [
  { enemies: ['the_guardian'] },
  { enemies: ['hexaghost'] },
  { enemies: ['slime_boss'] },
];

export function getEncounter(type: EncounterType): Encounter {
  let pool: Encounter[];
  switch (type) {
    case 'elite': pool = ELITE_ENCOUNTERS; break;
    case 'boss': pool = BOSS_ENCOUNTERS; break;
    default: pool = NORMAL_ENCOUNTERS;
  }
  return pool[Math.floor(Math.random() * pool.length)];
}
