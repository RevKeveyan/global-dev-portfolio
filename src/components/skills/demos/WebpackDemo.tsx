import { motion } from 'framer-motion';
import { Package, FileCode, Image, FileType } from 'lucide-react';

interface WebpackDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const WebpackDemo = ({ isPlaying, reducedMotion }: WebpackDemoProps) => {
  const inputs = [
    { icon: FileCode, label: '.js', color: 'hsl(50 90% 55%)' },
    { icon: FileType, label: '.css', color: 'hsl(200 80% 55%)' },
    { icon: Image, label: '.png', color: 'hsl(280 70% 60%)' },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Module Bundler
      </div>

      <div className="flex items-center gap-4 w-full justify-center">
        {/* Input Files */}
        <div className="flex flex-col gap-2">
          {inputs.map((input, i) => {
            const Icon = input.icon;
            return (
              <motion.div
                key={input.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{ backgroundColor: `${input.color}20` }}
                animate={isPlaying && !reducedMotion ? {
                  x: [0, 10, 0],
                  opacity: [1, 0.5, 1],
                } : {}}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                <Icon className="w-4 h-4" style={{ color: input.color }} />
                <span className="text-xs font-mono" style={{ color: input.color }}>
                  {input.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Arrow */}
        <motion.div
          className="flex flex-col items-center"
          animate={isPlaying && !reducedMotion ? { opacity: [0.5, 1, 0.5] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <svg width="40" height="20" viewBox="0 0 40 20">
            <motion.path
              d="M0 10 L30 10 M25 5 L30 10 L25 15"
              fill="none"
              stroke="hsl(200 80% 60%)"
              strokeWidth="2"
              animate={isPlaying && !reducedMotion ? {
                strokeDashoffset: [20, 0],
              } : {}}
              strokeDasharray="20"
              transition={{ duration: 1, repeat: Infinity }}
            />
          </svg>
        </motion.div>

        {/* Webpack */}
        <motion.div
          className="p-4 rounded-xl bg-blue-400/20"
          animate={isPlaying && !reducedMotion ? {
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Package className="w-8 h-8 text-blue-400" />
        </motion.div>

        {/* Arrow */}
        <motion.div
          animate={isPlaying && !reducedMotion ? { opacity: [0.5, 1, 0.5] } : {}}
          transition={{ duration: 1, delay: 0.5, repeat: Infinity }}
        >
          <svg width="40" height="20" viewBox="0 0 40 20">
            <motion.path
              d="M0 10 L30 10 M25 5 L30 10 L25 15"
              fill="none"
              stroke="hsl(150 80% 50%)"
              strokeWidth="2"
              animate={isPlaying && !reducedMotion ? {
                strokeDashoffset: [20, 0],
              } : {}}
              strokeDasharray="20"
              transition={{ duration: 1, delay: 0.5, repeat: Infinity }}
            />
          </svg>
        </motion.div>

        {/* Output */}
        <motion.div
          className="px-4 py-3 rounded-lg bg-green-500/20"
          animate={isPlaying && !reducedMotion ? {
            boxShadow: [
              '0 0 0 0 hsl(150 80% 50% / 0)',
              '0 0 20px 5px hsl(150 80% 50% / 0.3)',
              '0 0 0 0 hsl(150 80% 50% / 0)',
            ],
          } : {}}
          transition={{ duration: 2, delay: 1, repeat: Infinity }}
        >
          <span className="text-xs font-mono text-green-400">bundle.js</span>
        </motion.div>
      </div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          .js + .css + .png → bundle.js
        </div>
      )}
    </div>
  );
};
