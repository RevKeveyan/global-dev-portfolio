import { motion } from 'framer-motion';
import { Globe, GitBranch, Rocket } from 'lucide-react';

interface VercelDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const VercelDemo = ({ isPlaying, reducedMotion }: VercelDemoProps) => {
  const steps = [
    { icon: GitBranch, label: 'Push', color: 'hsl(0 0% 70%)' },
    { icon: Rocket, label: 'Build', color: 'hsl(0 0% 85%)' },
    { icon: Globe, label: 'Deploy', color: 'hsl(0 0% 100%)' },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Deploy in Seconds
      </div>

      {/* Vercel Triangle */}
      <motion.div
        className="relative"
        animate={isPlaying && !reducedMotion ? {
          y: [0, -5, 0],
        } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60">
          <motion.path
            d="M30 5 L55 50 H5 Z"
            fill="white"
            animate={isPlaying && !reducedMotion ? {
              filter: [
                'drop-shadow(0 0 0 transparent)',
                'drop-shadow(0 0 20px rgba(255,255,255,0.5))',
                'drop-shadow(0 0 0 transparent)',
              ],
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      {/* Deploy Pipeline */}
      <div className="flex items-center gap-3">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="flex items-center gap-3">
              <motion.div
                className="flex flex-col items-center gap-2"
                animate={isPlaying && !reducedMotion ? {
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <motion.div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${step.color}15` }}
                  animate={isPlaying && !reducedMotion ? {
                    boxShadow: [
                      `0 0 0 0 ${step.color}00`,
                      `0 0 15px 3px ${step.color}40`,
                      `0 0 0 0 ${step.color}00`,
                    ],
                  } : {}}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: step.color }} />
                </motion.div>
                <span className="text-xs text-muted-foreground">{step.label}</span>
              </motion.div>

              {i < steps.length - 1 && (
                <motion.div
                  className="w-6 h-0.5 bg-white/30"
                  animate={isPlaying && !reducedMotion ? {
                    scaleX: [0, 1, 1],
                    opacity: [0, 1, 0.5],
                  } : {}}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.5 + 0.3,
                    repeat: Infinity,
                    repeatDelay: 2.2,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* URL */}
      <motion.div
        className="px-4 py-2 rounded-full bg-white/10 text-xs font-mono"
        animate={isPlaying && !reducedMotion ? {
          opacity: [0, 1, 1, 0],
        } : {}}
        transition={{ duration: 3, delay: 1.5, repeat: Infinity }}
      >
        <span className="text-green-400">✓</span>
        <span className="text-white/80 ml-2">app.vercel.app</span>
      </motion.div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          Push → Build → Deploy
        </div>
      )}
    </div>
  );
};
