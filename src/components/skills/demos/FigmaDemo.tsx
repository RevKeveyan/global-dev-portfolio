import { motion } from 'framer-motion';

interface FigmaDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const FigmaDemo = ({ isPlaying, reducedMotion }: FigmaDemoProps) => {
  const layers = [
    { id: 'frame', label: 'Frame', x: 0, y: 0, w: 120, h: 80, color: 'hsl(262 80% 55%)' },
    { id: 'rect', label: 'Rectangle', x: 10, y: 10, w: 40, h: 30, color: 'hsl(340 80% 55%)' },
    { id: 'circle', label: 'Ellipse', x: 70, y: 40, w: 35, h: 35, color: 'hsl(150 80% 45%)' },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Design Collaboration
      </div>

      <div className="relative w-full flex justify-center">
        {/* Canvas */}
        <div className="relative bg-muted/20 rounded-xl p-4 border border-border/30">
          <svg width="140" height="100" viewBox="0 0 140 100">
            {/* Frame */}
            <motion.rect
              x={layers[0].x}
              y={layers[0].y}
              width={layers[0].w}
              height={layers[0].h}
              fill="none"
              stroke={layers[0].color}
              strokeWidth="2"
              strokeDasharray="4 2"
              rx="4"
              animate={isPlaying && !reducedMotion ? {
                strokeDashoffset: [0, -12],
              } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Rectangle */}
            <motion.rect
              x={layers[1].x}
              y={layers[1].y}
              width={layers[1].w}
              height={layers[1].h}
              fill={`${layers[1].color}`}
              rx="2"
              animate={isPlaying && !reducedMotion ? {
                x: [10, 15, 10],
                y: [10, 15, 10],
              } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            {/* Circle */}
            <motion.ellipse
              cx={layers[2].x + layers[2].w / 2}
              cy={layers[2].y}
              rx={layers[2].w / 2}
              ry={layers[2].h / 2}
              fill={layers[2].color}
              animate={isPlaying && !reducedMotion ? {
                scale: [1, 1.1, 1],
              } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
          </svg>

          {/* Cursor */}
          <motion.div
            className="absolute w-4 h-4"
            style={{ top: 30, left: 50 }}
            animate={isPlaying && !reducedMotion ? {
              x: [0, 40, 40, 0],
              y: [0, 0, 30, 30],
            } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg viewBox="0 0 24 24" fill="hsl(262 80% 55%)" className="w-4 h-4">
              <path d="M4 4l16 8-8 2-2 8z" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Layer Panel */}
      <div className="flex gap-2">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.id}
            className="px-2 py-1 rounded text-xs font-medium"
            style={{ backgroundColor: `${layer.color}20`, color: layer.color }}
            animate={isPlaying && !reducedMotion ? {
              opacity: [0.5, 1, 0.5],
            } : {}}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          >
            {layer.label}
          </motion.div>
        ))}
      </div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          Frame → Rectangle → Ellipse
        </div>
      )}
    </div>
  );
};
