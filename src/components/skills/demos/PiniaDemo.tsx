import { motion } from 'framer-motion';
import { Database, ArrowRight } from 'lucide-react';

interface PiniaDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const PiniaDemo = ({ isPlaying, reducedMotion }: PiniaDemoProps) => {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Vue Store
      </div>

      {/* Pinia Pineapple Icon */}
      <motion.div
        className="relative"
        animate={isPlaying && !reducedMotion ? {
          rotate: [-5, 5, -5],
        } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center">
          <span className="text-3xl">🍍</span>
        </div>
      </motion.div>

      {/* Store Flow */}
      <div className="flex items-center gap-3">
        {/* State */}
        <motion.div
          className="flex flex-col items-center gap-1"
          animate={isPlaying && !reducedMotion ? {
            scale: [1, 1.05, 1],
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="p-2 rounded-lg bg-yellow-500/20">
            <Database className="w-5 h-5 text-yellow-500" />
          </div>
          <span className="text-xs text-muted-foreground">state</span>
        </motion.div>

        <motion.div
          animate={isPlaying && !reducedMotion ? { x: [0, 3, 0], opacity: [0.5, 1, 0.5] } : {}}
          transition={{ duration: 1, delay: 0.3, repeat: Infinity }}
        >
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
        </motion.div>

        {/* Getters */}
        <motion.div
          className="flex flex-col items-center gap-1"
          animate={isPlaying && !reducedMotion ? {
            scale: [1, 1.05, 1],
          } : {}}
          transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }}
        >
          <div className="p-2 rounded-lg bg-green-500/20">
            <span className="text-green-500 font-mono text-sm">get</span>
          </div>
          <span className="text-xs text-muted-foreground">getters</span>
        </motion.div>

        <motion.div
          animate={isPlaying && !reducedMotion ? { x: [0, 3, 0], opacity: [0.5, 1, 0.5] } : {}}
          transition={{ duration: 1, delay: 0.6, repeat: Infinity }}
        >
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col items-center gap-1"
          animate={isPlaying && !reducedMotion ? {
            scale: [1, 1.05, 1],
          } : {}}
          transition={{ duration: 1.5, delay: 0.6, repeat: Infinity }}
        >
          <div className="p-2 rounded-lg bg-blue-500/20">
            <span className="text-blue-500 font-mono text-sm">fn</span>
          </div>
          <span className="text-xs text-muted-foreground">actions</span>
        </motion.div>
      </div>

      {/* Code Preview */}
      <motion.div
        className="bg-muted/30 rounded-lg p-3 font-mono text-xs w-full"
        animate={isPlaying && !reducedMotion ? { opacity: [0.7, 1, 0.7] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div><span className="text-purple-400">const</span> store = <span className="text-yellow-400">useStore</span>()</div>
        <div className="text-muted-foreground mt-1">store.<span className="text-green-400">count</span> // reactive</div>
      </motion.div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          state → getters → actions
        </div>
      )}
    </div>
  );
};
