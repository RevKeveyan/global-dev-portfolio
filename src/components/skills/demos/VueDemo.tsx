import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface VueDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const VueDemo = ({ isPlaying, reducedMotion }: VueDemoProps) => {
  const [count, setCount] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setIsUpdating(true);
      setTimeout(() => {
        setCount(c => (c + 1) % 10);
        setIsUpdating(false);
      }, 300);
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xs">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Vue Reactivity System
      </div>

      {/* Reactive data */}
      <div className="w-full p-4 rounded-xl bg-muted/30 border border-border/50">
        <div className="text-[10px] text-muted-foreground mb-2">Reactive State:</div>
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">ref()</div>
            <motion.div
              className="px-4 py-2 rounded-lg bg-primary/20 border border-primary/50 font-mono text-lg text-primary font-bold"
              animate={isUpdating && isPlaying && !reducedMotion ? {
                scale: [1, 1.1, 1],
                borderColor: ['hsl(var(--primary) / 0.5)', 'hsl(var(--primary))', 'hsl(var(--primary) / 0.5)']
              } : {}}
            >
              {count}
            </motion.div>
          </div>

          {/* Arrow */}
          <motion.div
            className="text-muted-foreground"
            animate={isUpdating && isPlaying && !reducedMotion ? { 
              rotate: 360,
              scale: [1, 1.2, 1]
            } : {}}
            transition={{ duration: 0.3 }}
          >
            <RefreshCw className="w-5 h-5 text-primary" />
          </motion.div>

          {/* Computed */}
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">computed()</div>
            <motion.div
              className="px-4 py-2 rounded-lg bg-accent/20 border border-accent/50 font-mono text-lg text-accent font-bold"
              animate={isUpdating && isPlaying && !reducedMotion ? {
                scale: [1, 1.1, 1],
                borderColor: ['hsl(var(--accent) / 0.5)', 'hsl(var(--accent))', 'hsl(var(--accent) / 0.5)']
              } : {}}
              transition={{ delay: 0.1 }}
            >
              {count * 2}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Template binding */}
      <motion.div
        className="w-full p-3 rounded-xl bg-muted/30 border border-border/50 font-mono text-[11px]"
        animate={isUpdating && isPlaying && !reducedMotion ? {
          borderColor: ['hsl(var(--border) / 0.5)', 'hsl(var(--primary) / 0.5)', 'hsl(var(--border) / 0.5)']
        } : {}}
      >
        <div className="text-muted-foreground">&lt;template&gt;</div>
        <div className="pl-2">
          <span className="text-foreground">&lt;p&gt;</span>
          <span className="text-muted-foreground">{'{{ '}</span>
          <motion.span
            className="text-primary"
            animate={isUpdating && isPlaying && !reducedMotion ? {
              color: ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--primary))']
            } : {}}
          >
            count
          </motion.span>
          <span className="text-muted-foreground">{' }}'}</span>
          <span className="text-foreground">&lt;/p&gt;</span>
        </div>
        <div className="text-muted-foreground">&lt;/template&gt;</div>
      </motion.div>

      {/* Flow indicator */}
      <div className="flex items-center gap-2 text-[10px]">
        {['State Change', 'Dependency Track', 'DOM Update'].map((step, i) => (
          <motion.div
            key={step}
            className={`px-2 py-0.5 rounded ${
              isUpdating ? 'bg-primary/20 text-primary' : 'bg-muted/30 text-muted-foreground'
            }`}
            animate={isUpdating && isPlaying && !reducedMotion ? {
              scale: [1, 1.05, 1]
            } : {}}
            transition={{ delay: i * 0.1 }}
          >
            {step}
          </motion.div>
        ))}
      </div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          Reactive state automatically updates the DOM
        </div>
      )}
    </div>
  );
};
