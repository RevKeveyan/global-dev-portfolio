import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring, useTransform, Variants } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { techTicker } from '@/data/techTicker';
import { TechIcon } from '@/components/TechIcon';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const { t } = useTranslation();
  const { reducedMotionEnabled } = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 30 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (reducedMotionEnabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY, reducedMotionEnabled]);

  useEffect(() => {
    if (reducedMotionEnabled) return;
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, reducedMotionEnabled]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotionEnabled ? 0 : 0.15,
        delayChildren: reducedMotionEnabled ? 0 : 0.2,
      }
    }
  };

  const itemVariants: Variants = reducedMotionEnabled
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6, ease: 'easeOut' }
        }
      };

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="container-wide relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Hero content surface for readability */}
          <div className="surface-hero p-8 sm:p-12 md:p-16">
            {/* Availability Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="badge-available">
                {t('hero.availability')}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-display mb-6"
            >
              <span className="text-gradient">{t('hero.title')}</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={itemVariants}
              className="text-body-lg max-w-2xl mx-auto mb-10"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Button 
                asChild
                size="lg" 
                className="min-w-[180px] bg-primary text-primary-foreground hover:bg-primary/90 glow-sm text-cta"
              >
                <a href="#projects">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {t('hero.cta.projects')}
                </a>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="min-w-[180px] border-muted-foreground/30 hover:bg-muted/50 text-cta"
              >
                <a href="#contact">
                  {t('hero.cta.contact')}
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Tech Ticker - outside surface for visual interest */}
          <motion.div 
            variants={itemVariants}
            className="relative overflow-hidden py-6 mt-8"
          >
            <div className="surface-panel px-4 py-3 mx-auto max-w-3xl overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-card to-transparent z-10 rounded-l-xl" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-card to-transparent z-10 rounded-r-xl" />
              
              <div className={`flex gap-4 ${reducedMotionEnabled ? 'flex-wrap justify-center' : 'animate-ticker'}`}>
                {/* Duplicate items for seamless loop */}
                {[...techTicker, ...techTicker].map((tech, index) => (
                  <div key={`${tech.id}-${index}`} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-background border border-border text-foreground shrink-0">
                    <TechIcon name={tech.icon} className="w-4 h-4" style={{ color: tech.color }} />
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={reducedMotionEnabled ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a 
          href="#about" 
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md p-2"
          aria-label="Scroll to about section"
        >
          <motion.div
            animate={reducedMotionEnabled ? {} : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};
