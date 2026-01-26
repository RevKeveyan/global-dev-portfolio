import { motion } from 'framer-motion';
import { Box, Server } from 'lucide-react';

interface KubernetesDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const KubernetesDemo = ({ isPlaying, reducedMotion }: KubernetesDemoProps) => {
  const pods = [
    { id: 1, status: 'running', color: 'hsl(150 80% 45%)' },
    { id: 2, status: 'running', color: 'hsl(150 80% 45%)' },
    { id: 3, status: 'pending', color: 'hsl(45 90% 55%)' },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Container Orchestration
      </div>

      {/* Kubernetes Wheel */}
      <motion.div
        className="relative w-20 h-20"
        animate={isPlaying && !reducedMotion ? { rotate: [0, 360] } : {}}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 80 80" className="w-full h-full">
          {/* Outer ring */}
          <circle cx="40" cy="40" r="35" fill="none" stroke="hsl(220 80% 55%)" strokeWidth="2" opacity="0.3" />
          
          {/* Spokes */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <motion.line
              key={angle}
              x1="40"
              y1="40"
              x2={40 + 30 * Math.cos((angle * Math.PI) / 180)}
              y2={40 + 30 * Math.sin((angle * Math.PI) / 180)}
              stroke="hsl(220 80% 55%)"
              strokeWidth="2"
              animate={isPlaying && !reducedMotion ? {
                opacity: [0.3, 1, 0.3],
              } : {}}
              transition={{ duration: 1, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
          
          {/* Center */}
          <circle cx="40" cy="40" r="10" fill="hsl(220 80% 55%)" />
        </svg>
      </motion.div>

      {/* Pods */}
      <div className="flex gap-3">
        {pods.map((pod, i) => (
          <motion.div
            key={pod.id}
            className="flex flex-col items-center gap-1"
            animate={isPlaying && !reducedMotion ? {
              y: [0, -3, 0],
            } : {}}
            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
          >
            <motion.div
              className="p-3 rounded-lg relative"
              style={{ backgroundColor: `${pod.color}20` }}
              animate={isPlaying && !reducedMotion ? {
                boxShadow: [
                  `0 0 0 0 ${pod.color}00`,
                  `0 0 10px 2px ${pod.color}40`,
                  `0 0 0 0 ${pod.color}00`,
                ],
              } : {}}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            >
              <Box className="w-5 h-5" style={{ color: pod.color }} />
              <motion.div
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: pod.color }}
                animate={isPlaying && !reducedMotion ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
            <span className="text-xs text-muted-foreground">pod-{pod.id}</span>
          </motion.div>
        ))}
      </div>

      {/* Status */}
      <div className="flex gap-4 text-xs">
        <span className="text-green-400">● 2 running</span>
        <span className="text-yellow-400">● 1 pending</span>
      </div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          Pod Management • Auto-scaling
        </div>
      )}
    </div>
  );
};
