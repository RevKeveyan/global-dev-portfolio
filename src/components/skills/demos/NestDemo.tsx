import { motion } from 'framer-motion';
import { Box, ArrowRight, Layers } from 'lucide-react';

interface NestDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const NestDemo = ({ isPlaying, reducedMotion }: NestDemoProps) => {
  const modules = [
    { label: 'Controller', color: 'hsl(350 80% 55%)' },
    { label: 'Service', color: 'hsl(350 70% 60%)' },
    { label: 'Module', color: 'hsl(350 60% 65%)' },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Modular Architecture
      </div>

      {/* NestJS Logo */}
      <motion.div
        className="relative"
        animate={isPlaying && !reducedMotion ? {
          scale: [1, 1.05, 1],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="p-5 rounded-2xl bg-red-500/20"
          animate={isPlaying && !reducedMotion ? {
            boxShadow: [
              '0 0 0 0 hsl(350 80% 55% / 0)',
              '0 0 40px 10px hsl(350 80% 55% / 0.25)',
              '0 0 0 0 hsl(350 80% 55% / 0)',
            ],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Layers className="w-10 h-10 text-red-400" />
        </motion.div>
      </motion.div>

      {/* Module Flow */}
      <div className="flex items-center gap-2">
        {modules.map((mod, i) => (
          <div key={mod.label} className="flex items-center gap-2">
            <motion.div
              className="px-3 py-2 rounded-lg text-xs font-medium"
              style={{ 
                backgroundColor: `${mod.color}20`,
                color: mod.color,
              }}
              animate={isPlaying && !reducedMotion ? {
                scale: [1, 1.1, 1],
                boxShadow: [
                  `0 0 0 0 ${mod.color}00`,
                  `0 0 15px 3px ${mod.color}30`,
                  `0 0 0 0 ${mod.color}00`,
                ],
              } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: modules.length * 0.3 + 0.5,
              }}
            >
              {mod.label}
            </motion.div>
            {i < modules.length - 1 && (
              <motion.div
                animate={isPlaying && !reducedMotion ? { x: [0, 3, 0] } : {}}
                transition={{ duration: 0.5, delay: i * 0.3 + 0.2, repeat: Infinity, repeatDelay: modules.length * 0.3 + 0.5 }}
              >
                <ArrowRight className="w-3 h-3 text-muted-foreground" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Decorator Example */}
      <motion.div
        className="bg-muted/30 rounded-lg p-3 font-mono text-xs w-full"
        animate={isPlaying && !reducedMotion ? { opacity: [0.7, 1, 0.7] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div><span className="text-yellow-400">@Controller</span><span className="text-muted-foreground">(</span><span className="text-orange-400">'users'</span><span className="text-muted-foreground">)</span></div>
        <div><span className="text-purple-400">export class</span> <span className="text-blue-400">UsersController</span> <span className="text-muted-foreground">{'{'}</span></div>
        <div className="ml-2"><span className="text-yellow-400">@Get</span><span className="text-muted-foreground">()</span></div>
        <div className="ml-2"><span className="text-green-400">findAll</span><span className="text-muted-foreground">() {'{ ... }'}</span></div>
        <div className="text-muted-foreground">{'}'}</div>
      </motion.div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          Controller → Service → Module
        </div>
      )}
    </div>
  );
};
