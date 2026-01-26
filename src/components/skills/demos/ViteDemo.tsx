import { motion } from 'framer-motion';
import { Zap, RefreshCw } from 'lucide-react';

interface ViteDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const ViteDemo = ({ isPlaying, reducedMotion }: ViteDemoProps) => {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Lightning Fast Build
      </div>

      {/* Vite Logo */}
      <motion.div
        className="relative"
        animate={isPlaying && !reducedMotion ? {
          scale: [1, 1.1, 1],
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <motion.div
          className="p-5 rounded-2xl bg-purple-500/20"
          animate={isPlaying && !reducedMotion ? {
            boxShadow: [
              '0 0 0 0 hsl(270 80% 60% / 0)',
              '0 0 40px 15px hsl(270 80% 60% / 0.3)',
              '0 0 0 0 hsl(270 80% 60% / 0)',
            ],
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Zap className="w-10 h-10 text-purple-400" fill="hsl(270 80% 60%)" />
        </motion.div>

        {/* Speed lines */}
        {isPlaying && !reducedMotion && (
          <>
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute h-0.5 bg-gradient-to-r from-purple-400 to-transparent"
                style={{
                  width: 20 + i * 10,
                  top: 20 + i * 8,
                  left: -30 - i * 5,
                }}
                animate={{
                  x: [0, 20, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  repeat: Infinity,
                }}
              />
            ))}
          </>
        )}
      </motion.div>

      {/* HMR Demo */}
      <div className="flex items-center gap-4">
        <motion.div
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30"
          animate={isPlaying && !reducedMotion ? {
            borderColor: ['hsl(270 80% 60% / 0)', 'hsl(270 80% 60% / 0.5)', 'hsl(270 80% 60% / 0)'],
          } : {}}
          style={{ border: '1px solid transparent' }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            animate={isPlaying && !reducedMotion ? { rotate: 360 } : {}}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <RefreshCw className="w-4 h-4 text-purple-400" />
          </motion.div>
          <span className="text-xs text-muted-foreground">HMR</span>
        </motion.div>

        <motion.div
          className="text-xs font-mono"
          animate={isPlaying && !reducedMotion ? {
            opacity: [0.5, 1, 0.5],
          } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <span className="text-green-400">~50ms</span>
          <span className="text-muted-foreground"> update</span>
        </motion.div>
      </div>

      {/* Build comparison */}
      <div className="flex gap-6 text-xs">
        <div className="flex flex-col items-center gap-1">
          <motion.div
            className="h-2 rounded-full bg-purple-500"
            animate={isPlaying && !reducedMotion ? { width: [20, 40, 20] } : { width: 30 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-purple-400">Vite</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-24 h-2 rounded-full bg-muted-foreground/30" />
          <span className="text-muted-foreground">Traditional</span>
        </div>
      </div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          Instant HMR • ESM Native
        </div>
      )}
    </div>
  );
};
