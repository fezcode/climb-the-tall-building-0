import { useGameStore } from '../game/store';
import type { MapNode, MapNodeType } from '../types';
import { useMemo } from 'react';

const nodeConfig: Record<MapNodeType, { color: string; emoji: string; label: string }> = {
  combat: { color: '#ef4444', emoji: '⚔️', label: 'Combat' },
  elite: { color: '#f59e0b', emoji: '🔥', label: 'Elite' },
  rest: { color: '#22c55e', emoji: '🏕️', label: 'Rest' },
  event: { color: '#3b82f6', emoji: '❓', label: 'Event' },
  shop: { color: '#a855f7', emoji: '🛒', label: 'Shop' },
  boss: { color: '#dc2626', emoji: '💀', label: 'BOSS' },
  start: { color: '#6b7280', emoji: '🏠', label: 'Start' },
};

const MAP_WIDTH = 600;
const MAP_ROW_HEIGHT = 70;
const NODE_SIZE = 36;
const COLS = 7;

function getNodePosition(node: MapNode): { x: number; y: number } {
  const colWidth = MAP_WIDTH / (COLS + 1);
  const x = (node.col + 1) * colWidth;
  const y = node.row * MAP_ROW_HEIGHT + 40;
  return { x, y };
}

export function GameMap() {
  const map = useGameStore(s => s.map);
  const currentRow = useGameStore(s => s.currentRow);
  const currentNodeId = useGameStore(s => s.currentNodeId);
  const selectMapNode = useGameStore(s => s.selectMapNode);

  // Find available nodes (in the next row, connected to current)
  const availableNodeIds = useMemo(() => {
    if (currentRow === -1) {
      // First move: all row-0 nodes are available
      return map.filter(n => n.row === 0).map(n => n.id);
    }
    const currentNode = map.find(n => n.id === currentNodeId);
    return currentNode?.connections || [];
  }, [map, currentRow, currentNodeId]);

  const totalHeight = 15 * MAP_ROW_HEIGHT + 80;

  return (
    <div className="w-full h-full flex flex-col items-center fade-in"
      style={{ background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #08080f 70%)' }}>
      
      {/* Header */}
      <div className="pt-16 pb-4 text-center">
        <h2 className="font-cinzel text-2xl font-bold text-amber-400">Choose Your Path</h2>
        <p className="text-white/40 text-sm mt-1">Select the next node on the map</p>
      </div>

      {/* Map container - scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 pb-8" style={{ maxWidth: MAP_WIDTH + 40 }}>
        <svg width={MAP_WIDTH} height={totalHeight} className="mx-auto">
          {/* Draw connections */}
          {map.map(node => 
            node.connections.map(targetId => {
              const target = map.find(n => n.id === targetId);
              if (!target) return null;
              const from = getNodePosition(node);
              const to = getNodePosition(target);
              const isOnPath = node.visited || node.id === currentNodeId;
              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={isOnPath ? 'rgba(245, 158, 11, 0.4)' : 'rgba(255,255,255,0.08)'}
                  strokeWidth={isOnPath ? 2 : 1}
                  strokeDasharray={isOnPath ? 'none' : '4 4'}
                />
              );
            })
          )}

          {/* Draw nodes */}
          {map.map(node => {
            const { x, y } = getNodePosition(node);
            const config = nodeConfig[node.type];
            const isAvailable = availableNodeIds.includes(node.id);
            const isCurrent = node.id === currentNodeId;
            const isVisited = node.visited;

            return (
              <g key={node.id}>
                {/* Glow for available nodes */}
                {isAvailable && (
                  <circle
                    cx={x}
                    cy={y}
                    r={NODE_SIZE / 2 + 6}
                    fill="none"
                    stroke={config.color}
                    strokeWidth={2}
                    opacity={0.4}
                  >
                    <animate attributeName="r" values={`${NODE_SIZE / 2 + 4};${NODE_SIZE / 2 + 10};${NODE_SIZE / 2 + 4}`} dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* Node circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={NODE_SIZE / 2}
                  fill={isCurrent ? config.color : isVisited ? 'rgba(255,255,255,0.1)' : `${config.color}20`}
                  stroke={isAvailable ? config.color : isVisited ? 'rgba(255,255,255,0.2)' : `${config.color}40`}
                  strokeWidth={isAvailable ? 2 : 1}
                  style={{
                    cursor: isAvailable ? 'pointer' : 'default',
                    filter: isAvailable ? `drop-shadow(0 0 8px ${config.color}60)` : 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => isAvailable && selectMapNode(node.id)}
                  onMouseEnter={(e) => {
                    if (isAvailable) {
                      (e.target as SVGCircleElement).style.transform = `scale(1.15)`;
                      (e.target as SVGCircleElement).style.transformOrigin = `${x}px ${y}px`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.target as SVGCircleElement).style.transform = 'scale(1)';
                  }}
                />

                {/* Emoji icon */}
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  fontSize={node.type === 'boss' ? 16 : 14}
                  style={{
                    pointerEvents: 'none',
                    opacity: isVisited && !isCurrent ? 0.3 : 1,
                  }}
                >
                  {config.emoji}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="pb-4 flex gap-4 text-xs text-white/40">
        {(['combat', 'elite', 'rest', 'event', 'boss'] as MapNodeType[]).map(type => (
          <div key={type} className="flex items-center gap-1">
            <span>{nodeConfig[type].emoji}</span>
            <span>{nodeConfig[type].label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
