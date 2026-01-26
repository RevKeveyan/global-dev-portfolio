import { motion } from 'framer-motion';
import { Search, TrendingUp, ArrowUp } from 'lucide-react';

interface SEODemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const SEODemo = ({ isPlaying, reducedMotion }: SEODemoProps) => {
  const searchResults = [
    { position: 1, highlight: true },
    { position: 2, highlight: false },
    { position: 3, highlight: false },
    { position: 4, highlight: false },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Search Ranking
      </div>

      {/* Search Bar */}
      <motion.div
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-border/50 w-full max-w-xs"
        animate={isPlaying && !reducedMotion ? {
          borderColor: ['hsl(var(--border) / 0.5)', 'hsl(220 80% 60% / 0.5)', 'hsl(var(--border) / 0.5)'],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Search className="w-4 h-4 text-muted-foreground" />
        <motion.span
          className="text-sm text-muted-foreground"
          animate={isPlaying && !reducedMotion ? {
            opacity: [0.5, 1, 0.5],
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          your website...
        </motion.span>
      </motion.div>

      {/* Search Results */}
      <div className="w-full space-y-2">
        {searchResults.map((result, i) => (
          <motion.div
            key={result.position}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
              result.highlight 
                ? 'bg-green-500/20 border border-green-500/30' 
                : 'bg-muted/20 border border-transparent'
            }`}
            animate={isPlaying && !reducedMotion && result.highlight ? {
              y: [20 * i, 0],
              scale: [0.95, 1],
              boxShadow: [
                '0 0 0 0 hsl(150 80% 50% / 0)',
                '0 0 20px 5px hsl(150 80% 50% / 0.2)',
                '0 0 0 0 hsl(150 80% 50% / 0)',
              ],
            } : {}}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            <span className={`text-xs font-bold w-5 ${
              result.highlight ? 'text-green-400' : 'text-muted-foreground'
            }`}>
              #{result.position}
            </span>
            <div className="flex-1">
              <motion.div
                className={`h-2 rounded-full ${
                  result.highlight ? 'bg-green-500/50' : 'bg-muted-foreground/20'
                }`}
                style={{ width: result.highlight ? '100%' : `${80 - i * 15}%` }}
                animate={isPlaying && !reducedMotion && result.highlight ? {
                  opacity: [0.5, 1, 0.5],
                } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.div
                className="h-1.5 rounded-full bg-muted-foreground/10 mt-1"
                style={{ width: `${60 - i * 10}%` }}
              />
            </div>
            {result.highlight && (
              <motion.div
                animate={isPlaying && !reducedMotion ? {
                  y: [0, -3, 0],
                } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <ArrowUp className="w-4 h-4 text-green-400" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4">
        <motion.div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/20"
          animate={isPlaying && !reducedMotion ? {
            scale: [1, 1.05, 1],
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-xs font-medium text-green-400">
            <motion.span
              animate={isPlaying && !reducedMotion ? {
                opacity: [1, 0.5, 1],
              } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              +12
            </motion.span>
            {' '}positions
          </span>
        </motion.div>

        <motion.div
          className="text-xs text-muted-foreground"
          animate={isPlaying && !reducedMotion ? {
            opacity: [0.5, 1, 0.5],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          → Page 1
        </motion.div>
      </div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          Rising to #1 Position
        </div>
      )}
    </div>
  );
};
