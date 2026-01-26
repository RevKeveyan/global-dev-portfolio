import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ReduxDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const ReduxDemo = ({ isPlaying, reducedMotion }: ReduxDemoProps) => {
  const boxes = [
    { label: 'Action', color: 'hsl(190 90% 50%)' },
    { label: 'Reducer', color: 'hsl(270 80% 60%)' },
    { label: 'Store', color: 'hsl(150 80% 45%)' },
    { label: 'UI', color: 'hsl(35 90% 55%)' },
  ];

  const animationDuration = 0.5;
  const staggerDelay = 0.4;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Redux Data Flow
      </div>
      
      <div className="flex items-center justify-between w-full gap-2">
        {boxes.map((box, index) => (
          <div key={box.label} className="flex items-center">
            <motion.div
              className="px-3 py-2 rounded-lg text-xs font-medium text-white shadow-lg"
              style={{ backgroundColor: box.color }}
              animate={isPlaying && !reducedMotion ? {
                scale: [1, 1.1, 1],
                boxShadow: [
                  `0 0 0 0 ${box.color}00`,
                  `0 0 20px 5px ${box.color}40`,
                  `0 0 0 0 ${box.color}00`
                ]
              } : {}}
              transition={{
                duration: animationDuration,
                delay: index * staggerDelay,
                repeat: Infinity,
                repeatDelay: boxes.length * staggerDelay
              }}
            >
              {box.label}
            </motion.div>
            {index < boxes.length - 1 && (
              <motion.div
                className="mx-1"
                animate={isPlaying && !reducedMotion ? { 
                  x: [0, 4, 0],
                  opacity: [0.3, 1, 0.3]
                } : {}}
                transition={{
                  duration: animationDuration,
                  delay: index * staggerDelay + 0.2,
                  repeat: Infinity,
                  repeatDelay: boxes.length * staggerDelay
                }}
              >
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Reduced motion fallback */}
      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          Action → Reducer → Store → UI
        </div>
      )}
    </div>
  );
};
