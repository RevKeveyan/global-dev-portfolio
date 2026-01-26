import { motion } from 'framer-motion';
import { Container, Database, Server } from 'lucide-react';

interface DockerDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const DockerDemo = ({ isPlaying, reducedMotion }: DockerDemoProps) => {
  const containers = [
    { id: 'api', label: 'API', icon: Server, color: 'hsl(190 90% 50%)' },
    { id: 'db', label: 'PostgreSQL', icon: Database, color: 'hsl(220 70% 55%)' },
    { id: 'cache', label: 'Redis', icon: Container, color: 'hsl(0 70% 55%)' },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Docker Containers
      </div>

      <div className="relative w-full">
        {/* Docker network box */}
        <div className="border-2 border-dashed border-primary/30 rounded-2xl p-6">
          <div className="absolute -top-3 left-4 px-2 bg-background text-xs text-primary font-medium">
            docker-compose
          </div>

          <div className="flex justify-around items-center">
            {containers.map((container, index) => {
              const Icon = container.icon;
              return (
                <motion.div
                  key={container.id}
                  className="flex flex-col items-center gap-2"
                  animate={isPlaying && !reducedMotion ? {
                    y: [0, -5, 0],
                  } : {}}
                  transition={{
                    duration: 2,
                    delay: index * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <motion.div
                    className="p-4 rounded-xl relative"
                    style={{ backgroundColor: `${container.color}20` }}
                    animate={isPlaying && !reducedMotion ? {
                      boxShadow: [
                        `0 0 0 0 ${container.color}00`,
                        `0 0 15px 3px ${container.color}30`,
                        `0 0 0 0 ${container.color}00`
                      ]
                    } : {}}
                    transition={{
                      duration: 2,
                      delay: index * 0.3,
                      repeat: Infinity
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: container.color }} />
                    
                    {/* Status dot */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500"
                      animate={isPlaying && !reducedMotion ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </motion.div>
                  <span className="text-xs text-muted-foreground">{container.label}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: '60%' }}>
            <motion.line
              x1="30%" y1="0" x2="50%" y2="0"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeDasharray="4 2"
              animate={isPlaying && !reducedMotion ? { strokeDashoffset: [0, -12] } : {}}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <motion.line
              x1="50%" y1="0" x2="70%" y2="0"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeDasharray="4 2"
              animate={isPlaying && !reducedMotion ? { strokeDashoffset: [0, -12] } : {}}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
        </div>
      </div>

      {/* Reduced motion fallback */}
      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          Containers: API ↔ PostgreSQL ↔ Redis
        </div>
      )}
    </div>
  );
};
