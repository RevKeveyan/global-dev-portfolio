import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const AuroraBackground = () => {
  const { reducedMotionEnabled } = useReducedMotion();

  if (reducedMotionEnabled) {
    return (
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{ background: 'hsl(var(--primary))' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
          style={{ background: 'hsl(var(--accent))' }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      {/* Primary aurora blob */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-[100px]"
        style={{ background: 'hsl(var(--primary))' }}
        animate={{
          x: ['-10%', '20%', '-10%'],
          y: ['10%', '-15%', '10%'],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary aurora blob */}
      <motion.div
        className="absolute right-0 w-[600px] h-[600px] rounded-full opacity-15 blur-[80px]"
        style={{ background: 'hsl(var(--accent))' }}
        animate={{
          x: ['10%', '-20%', '10%'],
          y: ['-10%', '20%', '-10%'],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Tertiary subtle glow */}
      <motion.div
        className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px]"
        style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))' }}
        animate={{
          x: ['0%', '15%', '0%'],
          y: ['0%', '-10%', '0%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};
