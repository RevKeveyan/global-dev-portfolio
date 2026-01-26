import { motion } from 'framer-motion';
import { Database, Zap, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface RedisDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const RedisDemo = ({ isPlaying, reducedMotion }: RedisDemoProps) => {
  const [phase, setPhase] = useState<'miss' | 'hit'>('miss');

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setPhase(p => p === 'miss' ? 'hit' : 'miss');
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Redis Cache Demo
      </div>

      <div className="flex items-center justify-between w-full gap-4">
        {/* Request */}
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 rounded-xl bg-muted text-muted-foreground">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-xs text-muted-foreground">Request</span>
        </div>

        {/* Arrow to Cache */}
        <motion.div
          animate={isPlaying && !reducedMotion ? { 
            x: [0, 10, 0],
            opacity: [0.5, 1, 0.5]
          } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-muted-foreground"
        >
          →
        </motion.div>

        {/* Cache */}
        <div className="flex flex-col items-center gap-2">
          <motion.div 
            className={`p-3 rounded-xl transition-colors ${
              phase === 'hit' 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-red-500/20 text-red-400'
            }`}
            animate={isPlaying && !reducedMotion ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Zap className="w-5 h-5" />
          </motion.div>
          <span className="text-xs text-muted-foreground">Cache</span>
          <span className={`text-[10px] font-medium ${
            phase === 'hit' ? 'text-green-400' : 'text-red-400'
          }`}>
            {phase === 'hit' ? 'HIT ⚡' : 'MISS'}
          </span>
        </div>

        {/* Arrow to DB (only on miss) */}
        <motion.div
          animate={phase === 'miss' && isPlaying && !reducedMotion ? { 
            x: [0, 10, 0],
            opacity: [0.5, 1, 0.5]
          } : { opacity: 0.2 }}
          transition={{ duration: 0.5, repeat: phase === 'miss' ? Infinity : 0 }}
          className="text-muted-foreground"
        >
          →
        </motion.div>

        {/* Database */}
        <div className="flex flex-col items-center gap-2">
          <motion.div 
            className={`p-3 rounded-xl transition-all ${
              phase === 'miss' 
                ? 'bg-primary/20 text-primary' 
                : 'bg-muted/50 text-muted-foreground'
            }`}
            animate={phase === 'miss' && isPlaying && !reducedMotion ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Database className="w-5 h-5" />
          </motion.div>
          <span className="text-xs text-muted-foreground">DB</span>
          <span className="text-[10px] text-muted-foreground">
            {phase === 'miss' ? '~100ms' : 'skipped'}
          </span>
        </div>
      </div>

      {/* Speed indicator */}
      <div className="flex items-center gap-4 text-xs">
        <span className={phase === 'miss' ? 'text-red-400' : 'text-muted-foreground'}>
          Slow: ~100ms
        </span>
        <span className={phase === 'hit' ? 'text-green-400' : 'text-muted-foreground'}>
          Fast: ~1ms
        </span>
      </div>

      {/* Reduced motion fallback */}
      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          Cache miss → DB query | Cache hit → Instant response
        </div>
      )}
    </div>
  );
};
