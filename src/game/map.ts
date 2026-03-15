import type { MapNode, MapNodeType } from '../types';

const ROWS = 15;
const COLS_PER_ROW = 7;

function pickNodeType(row: number, totalRows: number): MapNodeType {
  if (row === 0) return 'combat';
  if (row === totalRows - 1) return 'boss';
  if (row === totalRows - 2) return 'rest'; // rest before boss
  
  const roll = Math.random();
  // Elite at mid-to-late rows
  if (row >= 6 && roll < 0.12) return 'elite';
  if (roll < 0.55) return 'combat';
  if (roll < 0.72) return 'event';
  if (roll < 0.82) return 'rest';
  if (roll < 0.90) return 'shop';
  if (roll < 0.96) return 'elite';
  return 'combat';
}

export function generateMap(): MapNode[] {
  const nodes: MapNode[] = [];
  const grid: (string | null)[][] = [];

  // Generate nodes per row
  for (let row = 0; row < ROWS; row++) {
    grid[row] = [];
    
    let nodesInRow: number;
    if (row === 0) {
      nodesInRow = 3 + Math.floor(Math.random() * 2); // 3-4
    } else if (row === ROWS - 1) {
      nodesInRow = 1; // single boss
    } else if (row === ROWS - 2) {
      nodesInRow = 2 + Math.floor(Math.random() * 2); // 2-3 rest sites
    } else {
      nodesInRow = 2 + Math.floor(Math.random() * 3); // 2-4
    }

    // Pick random column positions
    const positions: number[] = [];
    const allCols = Array.from({ length: COLS_PER_ROW }, (_, i) => i);
    const shuffled = allCols.sort(() => Math.random() - 0.5);
    for (let i = 0; i < nodesInRow; i++) {
      positions.push(shuffled[i]);
    }
    positions.sort((a, b) => a - b);

    for (const col of positions) {
      const id = `node-${row}-${col}`;
      const type = pickNodeType(row, ROWS);
      grid[row][col] = id;
      nodes.push({
        id,
        row,
        col,
        type,
        connections: [],
        visited: false,
      });
    }
  }

  // Connect nodes: each node connects to 1-2 nodes in the next row
  for (let row = 0; row < ROWS - 1; row++) {
    const currentNodes = nodes.filter(n => n.row === row);
    const nextNodes = nodes.filter(n => n.row === row + 1);
    if (nextNodes.length === 0) continue;

    for (const node of currentNodes) {
      // Sort next nodes by distance to current node's column
      const sorted = [...nextNodes].sort(
        (a, b) => Math.abs(a.col - node.col) - Math.abs(b.col - node.col)
      );

      // Always connect to nearest
      node.connections.push(sorted[0].id);

      // Randomly connect to second nearest
      if (sorted.length > 1 && Math.random() < 0.4) {
        node.connections.push(sorted[1].id);
      }
    }

    // Ensure every next-row node has at least one incoming connection
    for (const next of nextNodes) {
      const hasIncoming = currentNodes.some(n => n.connections.includes(next.id));
      if (!hasIncoming) {
        const closest = [...currentNodes].sort(
          (a, b) => Math.abs(a.col - next.col) - Math.abs(b.col - next.col)
        )[0];
        if (closest) closest.connections.push(next.id);
      }
    }
  }

  return nodes;
}
