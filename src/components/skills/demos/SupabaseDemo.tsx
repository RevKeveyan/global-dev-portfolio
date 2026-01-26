import { motion } from 'framer-motion';
import { Database, Lock, Zap } from 'lucide-react';

interface SupabaseDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const SupabaseDemo = ({ isPlaying, reducedMotion }: SupabaseDemoProps) => {
  const features = [
    { icon: Database, label: 'Database', color: 'hsl(155 80% 45%)' },
    { icon: Lock, label: 'Auth', color: 'hsl(155 60% 55%)' },
    { icon: Zap, label: 'Realtime', color: 'hsl(155 40% 65%)' },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Backend as a Service
      </div>

      {/* Supabase Logo */}
      <motion.div
        className="relative"
        animate={isPlaying && !reducedMotion ? {
          scale: [1, 1.05, 1],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="p-5 rounded-2xl bg-green-500/20"
          animate={isPlaying && !reducedMotion ? {
            boxShadow: [
              '0 0 0 0 hsl(155 80% 45% / 0)',
              '0 0 40px 10px hsl(155 80% 45% / 0.25)',
              '0 0 0 0 hsl(155 80% 45% / 0)',
            ],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Database className="w-10 h-10 text-green-400" />
        </motion.div>
      </motion.div>

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
                style={{ backgroundColor: `${feature.color}20` }}
              >
                <Icon className="w-5 h-5" style={{ color: feature.color }} />
              </div>
              <span className="text-xs text-muted-foreground">{feature.label}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Code Example */}
      <motion.div
        className="bg-muted/30 rounded-lg p-3 font-mono text-xs w-full"
        animate={isPlaying && !reducedMotion ? { opacity: [0.7, 1, 0.7] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div>
          <span className="text-purple-400">const</span>
          <span className="text-foreground"> {'{ data }'} = </span>
          <span className="text-blue-400">await</span>
        </div>
        <div className="ml-2">
          <span className="text-green-400">supabase</span>
          <span className="text-muted-foreground">.</span>
          <span className="text-yellow-400">from</span>
          <span className="text-muted-foreground">(</span>
          <span className="text-orange-400">'users'</span>
          <span className="text-muted-foreground">)</span>
        </div>
        <div className="ml-2">
          <span className="text-muted-foreground">.</span>
          <span className="text-yellow-400">select</span>
          <span className="text-muted-foreground">(</span>
          <span className="text-orange-400">'*'</span>
          <span className="text-muted-foreground">)</span>
        </div>
      </motion.div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          Database • Auth • Realtime
        </div>
      )}
    </div>
  );
};
