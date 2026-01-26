import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ReactDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const ReactDemo = ({ isPlaying, reducedMotion }: ReactDemoProps) => {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setActiveNode(n => (n + 1) % 4);
    }, 800);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const nodes = [
    { id: 'app', label: 'App', level: 0, x: 50 },
    { id: 'header', label: 'Header', level: 1, x: 25 },
    { id: 'main', label: 'Main', level: 1, x: 75 },
    { id: 'button', label: 'Button', level: 2, x: 75 },
  ];

  const connections = [
    { from: 'app', to: 'header' },
    { from: 'app', to: 'main' },
    { from: 'main', to: 'button' },
  ];

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xs">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        React Component Tree
      </div>

      <div className="relative w-full h-48">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          {connections.map((conn, i) => {
            const from = nodes.find(n => n.id === conn.from)!;
            const to = nodes.find(n => n.id === conn.to)!;
            const fromY = from.level * 50 + 20;
            const toY = to.level * 50 + 20;
            
            return (
              <motion.line
                key={i}
                x1={`${from.x}%`}
                y1={fromY}
                x2={`${to.x}%`}
                y2={toY}
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeDasharray="4 2"
                animate={isPlaying && !reducedMotion ? {
                  strokeDashoffset: [0, -12],
                  opacity: [0.3, 0.8, 0.3]
                } : {}}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            );
          })}
        </svg>

        {/* Component nodes */}
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            className="absolute flex flex-col items-center"
            style={{
              left: `${node.x}%`,
              top: node.level * 50,
              transform: 'translateX(-50%)'
            }}
          >
            <motion.div
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border-2 ${
                activeNode === index
                  ? 'bg-primary/20 border-primary text-primary'
                  : 'bg-muted/50 border-border text-muted-foreground'
              }`}
              animate={activeNode === index && isPlaying && !reducedMotion ? {
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 0 0 hsl(var(--primary) / 0)',
                  '0 0 15px 3px hsl(var(--primary) / 0.3)',
                  '0 0 0 0 hsl(var(--primary) / 0)'
                ]
              } : {}}
              transition={{ duration: 0.5 }}
            >
              &lt;{node.label}/&gt;
            </motion.div>
          </motion.div>
        ))}

        {/* Props flow indicator */}
        {isPlaying && !reducedMotion && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-accent text-accent-foreground text-[10px] font-mono"
            initial={{ top: 40, opacity: 0 }}
            animate={{
              top: [40, 90, 140],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            props ↓
          </motion.div>
        )}
      </div>

      {/* State indicator */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-muted-foreground">State:</span>
        <motion.span
          className="px-2 py-0.5 rounded bg-primary/20 text-primary font-mono"
          animate={isPlaying && !reducedMotion ? { opacity: [1, 0.5, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          count: {activeNode}
        </motion.span>
      </div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          Components render with props flowing down the tree
        </div>
      )}
    </div>
  );
};
