import { useState, useEffect, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SectionPosition {
  id: string;
  centerX: number;
  centerY: number;
}

export const SectionSpotlight = () => {
  const { reducedMotionEnabled } = useReducedMotion();
  const [activePosition, setActivePosition] = useState<SectionPosition>({
    id: 'hero',
    centerX: 50,
    centerY: 50,
  });

  // Spring-animated values for smooth movement
  const springConfig = { stiffness: 80, damping: 25, mass: 1 };
  const spotlightX = useSpring(50, springConfig);
  const spotlightY = useSpring(50, springConfig);

  const updateSpotlightPosition = useCallback((entries: IntersectionObserverEntry[]) => {
    let maxRatio = 0;
    let mostVisibleEntry: IntersectionObserverEntry | null = null;

    entries.forEach((entry) => {
      if (entry.intersectionRatio > maxRatio) {
        maxRatio = entry.intersectionRatio;
        mostVisibleEntry = entry;
      }
    });

    if (mostVisibleEntry && maxRatio > 0.2) {
      const rect = mostVisibleEntry.boundingClientRect;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // Calculate center position as percentage of viewport
      const centerX = ((rect.left + rect.width / 2) / viewportWidth) * 100;
      const centerY = ((rect.top + rect.height / 2 + window.scrollY) / document.documentElement.scrollHeight) * 100;

      setActivePosition({
        id: mostVisibleEntry.target.id,
        centerX: Math.max(20, Math.min(80, centerX)), // Clamp to avoid edge positions
        centerY: Math.max(10, Math.min(90, centerY)),
      });
    }
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(updateSpotlightPosition, {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin: '0px',
    });

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [updateSpotlightPosition]);

  // Update spring values when position changes
  useEffect(() => {
    if (!reducedMotionEnabled) {
      spotlightX.set(activePosition.centerX);
      spotlightY.set(activePosition.centerY);
    }
  }, [activePosition, spotlightX, spotlightY, reducedMotionEnabled]);

  if (reducedMotionEnabled) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 opacity-20"
          style={{
            left: '50%',
            top: '50%',
            background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.3), transparent 70%)',
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Main spotlight */}
      <motion.div
        className="absolute w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: spotlightX.get() + '%',
          top: spotlightY.get() + '%',
          x: spotlightX,
          y: spotlightY,
          background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.15), transparent 60%)',
        }}
      />

      {/* Secondary accent spotlight */}
      <motion.div
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: spotlightX.get() + '%',
          top: spotlightY.get() + '%',
          x: spotlightX,
          y: spotlightY,
          background: 'radial-gradient(ellipse at center, hsl(var(--accent) / 0.1), transparent 50%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Soft edge vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, hsl(var(--background) / 0.4) 100%)',
        }}
      />
    </div>
  );
};
