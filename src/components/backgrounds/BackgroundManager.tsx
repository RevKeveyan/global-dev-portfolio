import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AuroraBackground } from './AuroraBackground';
import { TechGridBackground } from './TechGridBackground';
import { NoiseBackground } from './NoiseBackground';
import { PathBackground } from './PathBackground';
import { SectionSpotlight } from './SectionSpotlight';
import { ScrollPaths } from './ScrollPaths';
import { ReadabilityOverlay } from './ReadabilityOverlay';

export type SectionType = 'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'languages' | 'contact';

const sectionBackgrounds: Record<SectionType, React.ComponentType> = {
  hero: AuroraBackground,
  about: AuroraBackground,
  skills: TechGridBackground,
  projects: NoiseBackground,
  experience: PathBackground,
  languages: PathBackground,
  contact: AuroraBackground,
};

export const BackgroundManager = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('hero');
  const { reducedMotionEnabled } = useReducedMotion();

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    // Find the most visible section
    let maxRatio = 0;
    let mostVisibleSection: SectionType = 'hero';

    entries.forEach((entry) => {
      if (entry.intersectionRatio > maxRatio) {
        maxRatio = entry.intersectionRatio;
        mostVisibleSection = entry.target.id as SectionType;
      }
    });

    if (maxRatio > 0.3) {
      setActiveSection(mostVisibleSection);
    }
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: '-10% 0px -10% 0px',
    });

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [handleIntersection]);

  const BackgroundComponent = sectionBackgrounds[activeSection];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Layer 1: Base gradient */}
      <div 
        className="absolute inset-0"
        style={{ background: 'var(--gradient-hero)' }}
      />

      {/* Layer 2: Scroll-animated SVG paths */}
      <ScrollPaths />
      
      {/* Layer 3: Section-specific animated background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: reducedMotionEnabled ? 0 : 0.8,
            ease: 'easeInOut'
          }}
          className="absolute inset-0"
        >
          <BackgroundComponent />
        </motion.div>
      </AnimatePresence>

      {/* Layer 4: Section spotlight for contrast */}
      <SectionSpotlight />

      {/* Layer 5: Readability overlay - ensures text contrast */}
      <ReadabilityOverlay />
    </div>
  );
};
