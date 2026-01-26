import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface GridNode {
  id: number;
  x: number;
  y: number;
  delay: number;
}

export const TechGridBackground = () => {
  const { reducedMotionEnabled } = useReducedMotion();
  const [activeNodes, setActiveNodes] = useState<Set<number>>(new Set());

  // Generate grid nodes
  const nodes: GridNode[] = useMemo(() => {
    const result: GridNode[] = [];
    const cols = 12;
    const rows = 8;
    let id = 0;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        result.push({
          id: id++,
          x: (col / (cols - 1)) * 100,
          y: (row / (rows - 1)) * 100,
          delay: Math.random() * 2,
        });
      }
    }
    return result;
  }, []);

  // Randomly highlight nodes
  useEffect(() => {
    if (reducedMotionEnabled) return;

    const interval = setInterval(() => {
      const newActive = new Set<number>();
      const numActive = 3 + Math.floor(Math.random() * 5);
      
      for (let i = 0; i < numActive; i++) {
        newActive.add(Math.floor(Math.random() * nodes.length));
      }
      
      setActiveNodes(newActive);
    }, 1500);

    return () => clearInterval(interval);
  }, [nodes.length, reducedMotionEnabled]);

  if (reducedMotionEnabled) {
    return (
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="hsl(var(--primary) / 0.3)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      {/* Grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <pattern id="techGrid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="hsl(var(--primary) / 0.3)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#techGrid)" />
      </svg>

      {/* Animated nodes */}
      <svg className="absolute inset-0 w-full h-full">
        {nodes.map((node) => (
          <motion.g key={node.id}>
            {/* Node circle */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={activeNodes.has(node.id) ? 6 : 3}
              fill={activeNodes.has(node.id) ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.3)'}
              animate={{
                r: activeNodes.has(node.id) ? [3, 6, 3] : 3,
                opacity: activeNodes.has(node.id) ? [0.3, 1, 0.3] : 0.3,
              }}
              transition={{
                duration: 1.5,
                ease: 'easeInOut',
              }}
            />
            
            {/* Glow effect for active nodes */}
            {activeNodes.has(node.id) && (
              <motion.circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={20}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                initial={{ r: 6, opacity: 0.8 }}
                animate={{ r: 30, opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            )}
          </motion.g>
        ))}

        {/* Connection lines between nearby active nodes */}
        {Array.from(activeNodes).map((nodeId, idx) => {
          const nextNodeId = Array.from(activeNodes)[(idx + 1) % activeNodes.size];
          if (nextNodeId === undefined || nodeId === nextNodeId) return null;
          
          const node1 = nodes[nodeId];
          const node2 = nodes[nextNodeId];
          if (!node1 || !node2) return null;

          return (
            <motion.line
              key={`line-${nodeId}-${nextNodeId}`}
              x1={`${node1.x}%`}
              y1={`${node1.y}%`}
              x2={`${node2.x}%`}
              y2={`${node2.y}%`}
              stroke="hsl(var(--primary) / 0.4)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          );
        })}
      </svg>
    </div>
  );
};
