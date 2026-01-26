import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const PathBackground = () => {
  const { reducedMotionEnabled } = useReducedMotion();

  if (reducedMotionEnabled) {
    return (
      <div className="absolute inset-0">
        {/* Static vertical paths */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <line
            x1="20%"
            y1="0"
            x2="20%"
            y2="100%"
            stroke="hsl(var(--primary) / 0.3)"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
          <line
            x1="80%"
            y1="0"
            x2="80%"
            y2="100%"
            stroke="hsl(var(--accent) / 0.2)"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main vertical path - left side */}
      <svg className="absolute left-[20%] top-0 w-1 h-full">
        <motion.line
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          stroke="hsl(var(--primary) / 0.4)"
          strokeWidth="2"
          strokeDasharray="8 8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        
        {/* Traveling dot */}
        <motion.circle
          cx="50%"
          r="4"
          fill="hsl(var(--primary))"
          animate={{
            cy: ['0%', '100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>

      {/* Secondary path - right side */}
      <svg className="absolute right-[20%] top-0 w-1 h-full">
        <motion.line
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          stroke="hsl(var(--accent) / 0.3)"
          strokeWidth="2"
          strokeDasharray="12 6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut', delay: 0.3 }}
        />
        
        {/* Traveling dot - opposite direction */}
        <motion.circle
          cx="50%"
          r="3"
          fill="hsl(var(--accent))"
          animate={{
            cy: ['100%', '0%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>

      {/* Center decorative path */}
      <svg className="absolute left-1/2 top-0 -translate-x-1/2 w-2 h-full opacity-30">
        <motion.path
          d="M 1 0 Q 1 50%, 1 100%"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4 4"
          animate={{
            strokeDashoffset: [0, -16],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>

      {/* Connection nodes */}
      {[15, 35, 55, 75, 95].map((top, i) => (
        <motion.div
          key={i}
          className="absolute left-[20%] w-2 h-2 rounded-full -translate-x-1/2"
          style={{
            top: `${top}%`,
            background: 'hsl(var(--primary))',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Horizontal connectors */}
      <svg className="absolute inset-0 w-full h-full opacity-15">
        {[25, 50, 75].map((top, i) => (
          <motion.line
            key={i}
            x1="20%"
            y1={`${top}%`}
            x2="80%"
            y2={`${top}%`}
            stroke="hsl(var(--primary) / 0.3)"
            strokeWidth="1"
            strokeDasharray="4 8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.5,
              delay: 0.5 + i * 0.2,
              ease: 'easeOut',
            }}
          />
        ))}
      </svg>

      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at bottom left, hsl(var(--accent) / 0.1), transparent 60%)'
        }}
      />
    </div>
  );
};
