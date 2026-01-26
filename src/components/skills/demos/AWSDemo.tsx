import { motion } from 'framer-motion';
import { Cloud, Database, Server, HardDrive } from 'lucide-react';

interface AWSDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const AWSDemo = ({ isPlaying, reducedMotion }: AWSDemoProps) => {
  const services = [
    { icon: Server, label: 'EC2', color: 'hsl(30 90% 55%)' },
    { icon: Database, label: 'RDS', color: 'hsl(200 80% 55%)' },
    { icon: HardDrive, label: 'S3', color: 'hsl(140 70% 50%)' },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Cloud Services
      </div>

      {/* AWS Cloud */}
      <motion.div
        className="relative"
        animate={isPlaying && !reducedMotion ? {
          y: [0, -5, 0],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="p-5 rounded-2xl bg-orange-500/20"
          animate={isPlaying && !reducedMotion ? {
            boxShadow: [
              '0 0 0 0 hsl(30 90% 55% / 0)',
              '0 0 40px 10px hsl(30 90% 55% / 0.2)',
              '0 0 0 0 hsl(30 90% 55% / 0)',
            ],
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Cloud className="w-10 h-10 text-orange-500" />
        </motion.div>
      </motion.div>

      {/* Services */}
      <div className="flex gap-4">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.label}
              className="flex flex-col items-center gap-2"
              animate={isPlaying && !reducedMotion ? {
                scale: [1, 1.05, 1],
              } : {}}
              transition={{
                duration: 1.5,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            >
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: `${service.color}20` }}
              >
                <Icon className="w-5 h-5" style={{ color: service.color }} />
              </div>
              <span className="text-xs font-medium" style={{ color: service.color }}>
                {service.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Connection Lines */}
      <svg className="w-full h-8" viewBox="0 0 200 30">
        {[50, 100, 150].map((x, i) => (
          <motion.line
            key={x}
            x1="100"
            y1="0"
            x2={x}
            y2="30"
            stroke="hsl(30 90% 55%)"
            strokeWidth="1"
            strokeDasharray="4 2"
            opacity="0.5"
            animate={isPlaying && !reducedMotion ? {
              strokeDashoffset: [0, -12],
            } : {}}
            transition={{ duration: 1, delay: i * 0.2, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </svg>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          EC2 • RDS • S3 • Lambda
        </div>
      )}
    </div>
  );
};
