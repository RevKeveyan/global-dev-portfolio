import { motion } from 'framer-motion';
import { Folder, FileCode, Zap } from 'lucide-react';

interface NuxtDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const NuxtDemo = ({ isPlaying, reducedMotion }: NuxtDemoProps) => {
  const directories = [
    { name: 'pages/', icon: Folder, color: 'hsl(155 80% 45%)' },
    { name: 'composables/', icon: FileCode, color: 'hsl(155 60% 55%)' },
    { name: 'server/', icon: Zap, color: 'hsl(155 40% 65%)' },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Vue Meta-Framework
      </div>

      {/* Nuxt Logo */}
      <motion.div
        className="relative"
        animate={isPlaying && !reducedMotion ? {
          scale: [1, 1.05, 1],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60">
          <motion.path
            d="M30 10 L50 45 H10 Z"
            fill="none"
            stroke="hsl(155 80% 45%)"
            strokeWidth="3"
            strokeLinejoin="round"
            animate={isPlaying && !reducedMotion ? {
              strokeDashoffset: [0, -100],
            } : {}}
            strokeDasharray="20 5"
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          <motion.path
            d="M35 25 L48 45 H22 Z"
            fill="hsl(155 80% 45% / 0.3)"
            stroke="hsl(155 60% 55%)"
            strokeWidth="2"
            animate={isPlaying && !reducedMotion ? {
              opacity: [0.5, 1, 0.5],
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      {/* Auto-imports visualization */}
      <div className="flex flex-col gap-2 w-full">
        {directories.map((dir, i) => {
          const Icon = dir.icon;
          return (
            <motion.div
              key={dir.name}
              className="flex items-center gap-3 px-3 py-2 rounded-lg"
              style={{ backgroundColor: `${dir.color}15` }}
              animate={isPlaying && !reducedMotion ? {
                x: [0, 5, 0],
                opacity: [0.7, 1, 0.7],
              } : {}}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            >
              <Icon className="w-4 h-4" style={{ color: dir.color }} />
              <span className="text-sm font-mono" style={{ color: dir.color }}>
                {dir.name}
              </span>
              <motion.span
                className="ml-auto text-xs text-muted-foreground"
                animate={isPlaying && !reducedMotion ? { opacity: [0, 1, 0] } : {}}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              >
                auto-import
              </motion.span>
            </motion.div>
          );
        })}
      </div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          Auto-imports • File-based routing • SSR
        </div>
      )}
    </div>
  );
};
