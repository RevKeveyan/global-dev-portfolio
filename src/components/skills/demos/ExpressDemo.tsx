import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ExpressDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const ExpressDemo = ({ isPlaying, reducedMotion }: ExpressDemoProps) => {
  const middleware = [
    { label: 'auth', color: 'hsl(35 90% 55%)' },
    { label: 'parse', color: 'hsl(200 80% 55%)' },
    { label: 'route', color: 'hsl(150 80% 50%)' },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Middleware Pipeline
      </div>

      {/* Request Flow */}
      <div className="flex items-center gap-2 w-full justify-center">
        {/* Request */}
        <motion.div
          className="px-3 py-2 rounded-lg bg-muted/50 text-xs font-mono"
          animate={isPlaying && !reducedMotion ? {
            opacity: [0.5, 1, 0.5],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          req
        </motion.div>

        <ArrowRight className="w-3 h-3 text-muted-foreground" />

        {/* Middleware chain */}
        {middleware.map((mw, i) => (
          <div key={mw.label} className="flex items-center gap-2">
            <motion.div
              className="px-3 py-2 rounded-lg text-xs font-medium"
              style={{ 
                backgroundColor: `${mw.color}20`,
                color: mw.color,
              }}
              animate={isPlaying && !reducedMotion ? {
                scale: [1, 1.1, 1],
                boxShadow: [
                  `0 0 0 0 ${mw.color}00`,
                  `0 0 15px 3px ${mw.color}30`,
                  `0 0 0 0 ${mw.color}00`,
                ],
              } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.4,
                repeat: Infinity,
                repeatDelay: middleware.length * 0.4 + 0.5,
              }}
            >
              {mw.label}
            </motion.div>
            {i < middleware.length - 1 && (
              <motion.div
                animate={isPlaying && !reducedMotion ? { x: [0, 3, 0] } : {}}
                transition={{ duration: 0.5, delay: i * 0.4 + 0.2, repeat: Infinity, repeatDelay: middleware.length * 0.4 + 0.5 }}
              >
                <ArrowRight className="w-3 h-3 text-muted-foreground" />
              </motion.div>
            )}
          </div>
        ))}

        <ArrowRight className="w-3 h-3 text-muted-foreground" />

        {/* Response */}
        <motion.div
          className="px-3 py-2 rounded-lg bg-green-500/20 text-green-400 text-xs font-mono"
          animate={isPlaying && !reducedMotion ? {
            opacity: [0.5, 1, 0.5],
          } : {}}
          transition={{ duration: 2, delay: 1.5, repeat: Infinity }}
        >
          res
        </motion.div>
      </div>

      {/* Code Preview */}
      <motion.div
        className="bg-muted/30 rounded-lg p-3 font-mono text-xs w-full"
        animate={isPlaying && !reducedMotion ? { opacity: [0.7, 1, 0.7] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div>app.<span className="text-yellow-400">use</span>(<span className="text-green-400">middleware</span>)</div>
        <div>app.<span className="text-blue-400">get</span>(<span className="text-orange-400">'/api'</span>, handler)</div>
      </motion.div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          req → auth → parse → route → res
        </div>
      )}
    </div>
  );
};
