import { motion } from 'framer-motion';

interface FramerDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

const springTransition = { type: 'spring' as const, stiffness: 300, damping: 20 };

export const FramerDemo = ({ isPlaying, reducedMotion }: FramerDemoProps) => {

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Motion Animations
      </div>

      <div className="flex gap-6 items-center">
        {/* Scale Animation */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            className="w-12 h-12 rounded-xl"
            style={{ backgroundColor: 'hsl(280 80% 60%)' }}
            animate={isPlaying && !reducedMotion ? {
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <span className="text-xs text-muted-foreground">scale</span>
        </div>

        {/* Spring Animation */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            className="w-12 h-12 rounded-full"
            style={{ backgroundColor: 'hsl(340 80% 55%)' }}
            animate={isPlaying && !reducedMotion ? {
              y: [0, -20, 0],
            } : {}}
            transition={{
              ...springTransition,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
          />
          <span className="text-xs text-muted-foreground">spring</span>
        </div>

        {/* Stagger Animation */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-12 rounded"
                style={{ backgroundColor: 'hsl(150 80% 50%)' }}
                animate={isPlaying && !reducedMotion ? {
                  scaleY: [1, 0.3, 1],
                } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  repeat: Infinity,
                  repeatDelay: 0.3,
                }}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">stagger</span>
        </div>
      </div>

      {/* Code Preview */}
      <motion.div
        className="bg-muted/30 rounded-lg p-3 font-mono text-xs w-full"
        animate={isPlaying && !reducedMotion ? {
          opacity: [0.7, 1, 0.7],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-purple-400">animate</span>
        <span className="text-muted-foreground">=</span>
        <span className="text-green-400">{`{{ scale: 1.3 }}`}</span>
      </motion.div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          scale • spring • stagger animations
        </div>
      )}
    </div>
  );
};
