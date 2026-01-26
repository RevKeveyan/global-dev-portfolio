import { motion } from 'framer-motion';

interface TailwindDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const TailwindDemo = ({ isPlaying, reducedMotion }: TailwindDemoProps) => {
  const classes = ['bg-primary', 'rounded-xl', 'shadow-lg', 'p-4'];
  
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Utility-First CSS
      </div>

      {/* Visual Demo */}
      <div className="relative">
        <motion.div
          className="w-24 h-24 bg-primary rounded-xl flex items-center justify-center"
          animate={isPlaying && !reducedMotion ? {
            borderRadius: ['12px', '24px', '50%', '24px', '12px'],
            boxShadow: [
              '0 0 0 0 hsl(var(--primary) / 0)',
              '0 10px 30px -5px hsl(var(--primary) / 0.4)',
              '0 20px 40px -10px hsl(var(--primary) / 0.3)',
              '0 10px 30px -5px hsl(var(--primary) / 0.4)',
              '0 0 0 0 hsl(var(--primary) / 0)',
            ],
          } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.span
            className="text-primary-foreground font-bold text-lg"
            animate={isPlaying && !reducedMotion ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            tw
          </motion.span>
        </motion.div>
      </div>

      {/* Class Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {classes.map((cls, i) => (
          <motion.span
            key={cls}
            className="px-2 py-1 rounded-full text-xs font-mono bg-cyan-500/20 text-cyan-400"
            animate={isPlaying && !reducedMotion ? {
              opacity: [0.5, 1, 0.5],
              scale: [0.95, 1, 0.95],
            } : {}}
            transition={{
              duration: 1.5,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          >
            {cls}
          </motion.span>
        ))}
      </div>

      {/* Code Preview */}
      <div className="bg-muted/30 rounded-lg p-3 font-mono text-xs w-full text-center">
        <span className="text-muted-foreground">&lt;div </span>
        <span className="text-cyan-400">className</span>
        <span className="text-muted-foreground">="</span>
        <motion.span
          className="text-green-400"
          animate={isPlaying && !reducedMotion ? { opacity: [0.6, 1, 0.6] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {classes.join(' ')}
        </motion.span>
        <span className="text-muted-foreground">"&gt;</span>
      </div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          Utility classes → Styled component
        </div>
      )}
    </div>
  );
};
