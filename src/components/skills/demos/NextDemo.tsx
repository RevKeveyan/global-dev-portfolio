import { motion } from 'framer-motion';
import { FileCode, Server, Globe } from 'lucide-react';

interface NextDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const NextDemo = ({ isPlaying, reducedMotion }: NextDemoProps) => {
  const features = [
    { icon: FileCode, label: 'App Router', color: 'hsl(0 0% 100%)' },
    { icon: Server, label: 'SSR/SSG', color: 'hsl(200 80% 60%)' },
    { icon: Globe, label: 'Edge', color: 'hsl(150 80% 50%)' },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        React Framework
      </div>

      {/* Next.js Logo Animation */}
      <div className="relative w-16 h-16">
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ 
            background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.3), hsl(0 0% 100% / 0.1))',
            boxShadow: '0 0 20px hsl(0 0% 100% / 0.2)'
          }}
          animate={isPlaying && !reducedMotion ? {
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.3, 0.6],
          } : {}}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Main circle */}
        <motion.div
          className="absolute inset-1 rounded-full bg-white flex items-center justify-center shadow-lg"
          animate={isPlaying && !reducedMotion ? {
            boxShadow: [
              '0 0 0 0 hsl(0 0% 100% / 0.4)',
              '0 0 20px 4px hsl(0 0% 100% / 0.2)',
              '0 0 0 0 hsl(0 0% 100% / 0.4)',
            ],
          } : {}}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-black font-bold text-xl">N</span>
        </motion.div>
      </div>

      {/* Features */}
      <div className="flex gap-4">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.label}
              className="flex flex-col items-center gap-2"
              animate={isPlaying && !reducedMotion ? {
                y: [0, -5, 0],
              } : {}}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            >
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <Icon className="w-5 h-5" style={{ color: feature.color }} />
              </div>
              <span className="text-xs text-muted-foreground">{feature.label}</span>
            </motion.div>
          );
        })}
      </div>

      {/* File-based routing */}
      <div className="bg-muted/30 rounded-lg p-3 font-mono text-xs w-full">
        <div className="text-muted-foreground">app/</div>
        <motion.div
          className="ml-3 text-white"
          animate={isPlaying && !reducedMotion ? { opacity: [0.5, 1, 0.5] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          └── page.tsx
        </motion.div>
        <motion.div
          className="ml-3 text-blue-400"
          animate={isPlaying && !reducedMotion ? { opacity: [0.5, 1, 0.5] } : {}}
          transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }}
        >
          └── layout.tsx
        </motion.div>
      </div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          App Router • SSR/SSG • Edge Runtime
        </div>
      )}
    </div>
  );
};
