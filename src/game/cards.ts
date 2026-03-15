import type { CardDef } from '../types';

export const CARD_DEFS: Record<string, CardDef> = {
  strike: {
    id: 'strike',
    name: 'Strike',
    cost: 1,
    type: 'attack',
    rarity: 'starter',
    description: 'Deal 6 damage.',
    damage: 6,
    upgradedVersion: { damage: 9, description: 'Deal 9 damage.' },
  },
  defend: {
    id: 'defend',
    name: 'Defend',
    cost: 1,
    type: 'skill',
    rarity: 'starter',
    description: 'Gain 5 Block.',
    block: 5,
    upgradedVersion: { block: 8, description: 'Gain 8 Block.' },
  },
  bash: {
    id: 'bash',
    name: 'Bash',
    cost: 2,
    type: 'attack',
    rarity: 'starter',
    description: 'Deal 8 damage. Apply 2 Vulnerable.',
    damage: 8,
    applyVulnerable: 2,
    upgradedVersion: { damage: 10, applyVulnerable: 3, description: 'Deal 10 damage. Apply 3 Vulnerable.' },
  },
  cleave: {
    id: 'cleave',
    name: 'Cleave',
    cost: 1,
    type: 'attack',
    rarity: 'common',
    description: 'Deal 8 damage to ALL enemies.',
    damage: 8,
    aoe: true,
    upgradedVersion: { damage: 11, description: 'Deal 11 damage to ALL enemies.' },
  },
  iron_wave: {
    id: 'iron_wave',
    name: 'Iron Wave',
    cost: 1,
    type: 'attack',
    rarity: 'common',
    description: 'Gain 5 Block. Deal 5 damage.',
    damage: 5,
    block: 5,
    upgradedVersion: { damage: 7, block: 7, description: 'Gain 7 Block. Deal 7 damage.' },
  },
  pommel_strike: {
    id: 'pommel_strike',
    name: 'Pommel Strike',
    cost: 1,
    type: 'attack',
    rarity: 'common',
    description: 'Deal 9 damage. Draw 1 card.',
    damage: 9,
    draw: 1,
    upgradedVersion: { damage: 10, draw: 2, description: 'Deal 10 damage. Draw 2 cards.' },
  },
  shrug_it_off: {
    id: 'shrug_it_off',
    name: 'Shrug It Off',
    cost: 1,
    type: 'skill',
    rarity: 'common',
    description: 'Gain 8 Block. Draw 1 card.',
    block: 8,
    draw: 1,
    upgradedVersion: { block: 11, description: 'Gain 11 Block. Draw 1 card.' },
  },
  carnage: {
    id: 'carnage',
    name: 'Carnage',
    cost: 2,
    type: 'attack',
    rarity: 'uncommon',
    description: 'Deal 20 damage.',
    damage: 20,
    upgradedVersion: { damage: 28, description: 'Deal 28 damage.' },
  },
  uppercut: {
    id: 'uppercut',
    name: 'Uppercut',
    cost: 2,
    type: 'attack',
    rarity: 'uncommon',
    description: 'Deal 13 damage. Apply 1 Weak. Apply 1 Vulnerable.',
    damage: 13,
    applyWeak: 1,
    applyVulnerable: 1,
    upgradedVersion: { applyWeak: 2, applyVulnerable: 2, description: 'Deal 13 damage. Apply 2 Weak. Apply 2 Vulnerable.' },
  },
  body_slam: {
    id: 'body_slam',
    name: 'Body Slam',
    cost: 1,
    type: 'attack',
    rarity: 'uncommon',
    description: 'Deal damage equal to your Block.',
    damage: 0, // special: uses block
    upgradedVersion: { cost: 0, description: 'Deal damage equal to your Block.' },
  },
  twin_strike: {
    id: 'twin_strike',
    name: 'Twin Strike',
    cost: 1,
    type: 'attack',
    rarity: 'common',
    description: 'Deal 5 damage twice.',
    damage: 5,
    hits: 2,
    upgradedVersion: { damage: 7, description: 'Deal 7 damage twice.' },
  },
  flame_barrier: {
    id: 'flame_barrier',
    name: 'Flame Barrier',
    cost: 2,
    type: 'skill',
    rarity: 'uncommon',
    description: 'Gain 12 Block. Gain 4 Thorns.',
    block: 12,
    upgradedVersion: { block: 16, description: 'Gain 16 Block. Gain 4 Thorns.' },
  },
  inflame: {
    id: 'inflame',
    name: 'Inflame',
    cost: 1,
    type: 'power',
    rarity: 'uncommon',
    description: 'Gain 2 Strength.',
    applyStrength: 2,
    upgradedVersion: { applyStrength: 3, description: 'Gain 3 Strength.' },
  },
  clothesline: {
    id: 'clothesline',
    name: 'Clothesline',
    cost: 2,
    type: 'attack',
    rarity: 'common',
    description: 'Deal 12 damage. Apply 2 Weak.',
    damage: 12,
    applyWeak: 2,
    upgradedVersion: { damage: 14, applyWeak: 3, description: 'Deal 14 damage. Apply 3 Weak.' },
  },
  headbutt: {
    id: 'headbutt',
    name: 'Headbutt',
    cost: 1,
    type: 'attack',
    rarity: 'common',
    description: 'Deal 9 damage.',
    damage: 9,
    upgradedVersion: { damage: 12, description: 'Deal 12 damage.' },
  },
  thunderclap: {
    id: 'thunderclap',
    name: 'Thunderclap',
    cost: 1,
    type: 'attack',
    rarity: 'common',
    description: 'Deal 4 damage to ALL. Apply 1 Vulnerable to ALL.',
    damage: 4,
    aoe: true,
    applyVulnerable: 1,
    upgradedVersion: { damage: 7, description: 'Deal 7 damage to ALL. Apply 1 Vulnerable to ALL.' },
  },
  bloodletting: {
    id: 'bloodletting',
    name: 'Bloodletting',
    cost: 0,
    type: 'skill',
    rarity: 'uncommon',
    description: 'Lose 3 HP. Gain 2 Energy.',
    upgradedVersion: { description: 'Lose 3 HP. Gain 3 Energy.' },
  },
  sentinel: {
    id: 'sentinel',
    name: 'Sentinel',
    cost: 1,
    type: 'skill',
    rarity: 'uncommon',
    description: 'Gain 5 Block. Gain 5 Metallicize.',
    block: 5,
    upgradedVersion: { block: 8, description: 'Gain 8 Block. Gain 5 Metallicize.' },
  },
};

export function getCardDef(defId: string, upgraded: boolean): CardDef {
  const base = CARD_DEFS[defId];
  if (!base) throw new Error(`Unknown card: ${defId}`);
  if (!upgraded || !base.upgradedVersion) return base;
  return { ...base, ...base.upgradedVersion, name: base.name + '+', upgraded: true };
}

export function getStarterDeck(): { defId: string; upgraded: boolean }[] {
  const deck: { defId: string; upgraded: boolean }[] = [];
  // 5 Strikes, 4 Defends, 1 Bash
  for (let i = 0; i < 5; i++) deck.push({ defId: 'strike', upgraded: false });
  for (let i = 0; i < 4; i++) deck.push({ defId: 'defend', upgraded: false });
  deck.push({ defId: 'bash', upgraded: false });
  return deck;
}

export function getRewardCards(count: number = 3): string[] {
  const rewardPool = Object.values(CARD_DEFS)
    .filter(c => c.rarity !== 'starter')
    .map(c => c.id);
  const shuffled = [...rewardPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
