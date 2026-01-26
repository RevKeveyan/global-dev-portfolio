import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const NoiseBackground = () => {
  const { reducedMotionEnabled } = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle noise texture
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 200;
    const height = 200;
    canvas.width = width;
    canvas.height = height;

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 20;
      data[i] = noise;
      data[i + 1] = noise;
      data[i + 2] = noise;
      data[i + 3] = 15; // Very subtle alpha
    }

    ctx.putImageData(imageData, 0, 0);
  }, []);

  if (reducedMotionEnabled) {
    return (
      <div className="absolute inset-0">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full opacity-30"
          style={{ 
            imageRendering: 'pixelated',
            mixBlendMode: 'overlay'
          }}
        />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))'
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Noise texture */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ 
          imageRendering: 'pixelated',
          mixBlendMode: 'overlay'
        }}
      />

      {/* Moving diagonal lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <pattern 
            id="movingLines" 
            width="60" 
            height="60" 
            patternUnits="userSpaceOnUse"
          >
            <motion.line
              x1="0"
              y1="60"
              x2="60"
              y2="0"
              stroke="hsl(var(--primary) / 0.5)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <motion.rect 
          width="200%" 
          height="200%"
          x="-50%"
          y="-50%"
          fill="url(#movingLines)"
          animate={{
            x: ['-50%', '-25%', '-50%'],
            y: ['-50%', '-25%', '-50%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: 'hsl(var(--primary))',
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Gradient overlay */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(var(--background) / 0.3) 100%)'
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};
