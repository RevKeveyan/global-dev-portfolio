import { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PathConfig {
  id: string;
  d: string;
  strokeColor: string;
  strokeWidth: number;
  delay: number;
}

interface TravelingDot {
  id: string;
  pathId: string;
  speed: number;
  size: number;
  color: string;
}

export const ScrollPaths = () => {
  const { reducedMotionEnabled } = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  
  const [dotPositions, setDotPositions] = useState<Record<string, number>>({});

  // Define SVG paths
  const paths: PathConfig[] = useMemo(() => [
    {
      id: 'path1',
      d: 'M -50 100 Q 200 50, 400 150 T 800 100 T 1200 180 T 1600 120 T 2000 160',
      strokeColor: 'hsl(var(--primary) / 0.15)',
      strokeWidth: 2,
      delay: 0,
    },
    {
      id: 'path2',
      d: 'M -100 300 C 100 200, 300 400, 500 300 S 900 200, 1100 350 S 1500 250, 1800 320',
      strokeColor: 'hsl(var(--accent) / 0.12)',
      strokeWidth: 1.5,
      delay: 0.1,
    },
    {
      id: 'path3',
      d: 'M 0 500 Q 250 450, 500 520 T 1000 480 T 1500 550 T 2000 500',
      strokeColor: 'hsl(var(--primary) / 0.1)',
      strokeWidth: 1,
      delay: 0.2,
    },
    {
      id: 'path4',
      d: 'M -50 700 C 150 650, 350 750, 550 680 S 950 720, 1150 660 S 1550 700, 1900 680',
      strokeColor: 'hsl(var(--accent) / 0.08)',
      strokeWidth: 1.5,
      delay: 0.15,
    },
  ], []);

  // Define traveling dots
  const dots: TravelingDot[] = useMemo(() => [
    { id: 'dot1', pathId: 'path1', speed: 15, size: 4, color: 'hsl(var(--primary))' },
    { id: 'dot2', pathId: 'path1', speed: 20, size: 3, color: 'hsl(var(--primary) / 0.7)' },
    { id: 'dot3', pathId: 'path2', speed: 18, size: 3, color: 'hsl(var(--accent))' },
    { id: 'dot4', pathId: 'path3', speed: 25, size: 2, color: 'hsl(var(--primary) / 0.5)' },
    { id: 'dot5', pathId: 'path4', speed: 22, size: 3, color: 'hsl(var(--accent) / 0.6)' },
  ], []);

  // Animate dots along paths
  useEffect(() => {
    if (reducedMotionEnabled) return;

    let animationId: number;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const newPositions: Record<string, number> = {};

      dots.forEach((dot) => {
        // Create looping motion with different speeds
        newPositions[dot.id] = (elapsed / dot.speed) % 1;
      });

      setDotPositions(newPositions);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [dots, reducedMotionEnabled]);

  // Transform scroll progress to dash offset
  const dashOffset1 = useTransform(smoothProgress, [0, 1], [2000, 0]);
  const dashOffset2 = useTransform(smoothProgress, [0, 1], [2200, 200]);
  const dashOffset3 = useTransform(smoothProgress, [0, 1], [1800, -200]);
  const dashOffset4 = useTransform(smoothProgress, [0, 1], [2000, 100]);

  const dashOffsets = [dashOffset1, dashOffset2, dashOffset3, dashOffset4];

  if (reducedMotionEnabled) {
    return (
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
        >
          {paths.map((path) => (
            <path
              key={path.id}
              d={path.d}
              stroke={path.strokeColor}
              strokeWidth={path.strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
          ))}
        </svg>
        {/* Overlay for readability */}
        <div 
          className="absolute inset-0"
          style={{ background: 'hsl(var(--background) / 0.6)' }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Glow filter for dots */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated paths */}
        {paths.map((path, index) => (
          <motion.path
            key={path.id}
            id={path.id}
            d={path.d}
            stroke={path.strokeColor}
            strokeWidth={path.strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray="2000"
            style={{ strokeDashoffset: dashOffsets[index] }}
          />
        ))}

        {/* Traveling dots */}
        {dots.map((dot) => {
          const progress = dotPositions[dot.id] || 0;
          
          return (
            <g key={dot.id}>
              {/* Main dot */}
              <motion.circle
                r={dot.size}
                fill={dot.color}
                filter="url(#glow)"
                opacity={0.8}
              >
                <animateMotion
                  dur={`${dot.speed}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath href={`#${dot.pathId}`} />
                </animateMotion>
              </motion.circle>
              
              {/* Trail effect */}
              <motion.circle
                r={dot.size * 0.6}
                fill={dot.color}
                opacity={0.4}
              >
                <animateMotion
                  dur={`${dot.speed}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                  begin={`-${dot.speed * 0.02}s`}
                >
                  <mpath href={`#${dot.pathId}`} />
                </animateMotion>
              </motion.circle>
            </g>
          );
        })}
      </svg>

      {/* Overlay for readability */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(180deg, hsl(var(--background) / 0.3) 0%, hsl(var(--background) / 0.5) 50%, hsl(var(--background) / 0.3) 100%)'
        }}
      />
    </div>
  );
};
