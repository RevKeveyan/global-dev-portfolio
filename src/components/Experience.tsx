import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { experience } from '@/data/experience';

export const Experience = () => {
  const { t } = useTranslation();
  const { reducedMotionEnabled } = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (isInView && !reducedMotionEnabled) {
      const timeout = setTimeout(() => setPathLength(1), 300);
      return () => clearTimeout(timeout);
    } else if (reducedMotionEnabled) {
      setPathLength(1);
    }
  }, [isInView, reducedMotionEnabled]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotionEnabled ? 0 : 0.2,
        delayChildren: reducedMotionEnabled ? 0 : 0.3,
      }
    }
  };

  const itemVariants: Variants = reducedMotionEnabled
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
      };

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background handled by BackgroundManager */}

      <div className="container-wide relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-headline mb-4">
              <span className="text-gradient">{t('experience.title')}</span>
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              {t('experience.subtitle')}
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-3xl mx-auto relative">
            {/* SVG Line */}
            <svg
              className="absolute left-8 top-0 h-full w-0.5"
              style={{ transform: 'translateX(-50%)' }}
            >
              <motion.line
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength }}
                transition={{ duration: reducedMotionEnabled ? 0 : 1.5, ease: 'easeOut' }}
                style={{ 
                  strokeDasharray: 1,
                  strokeDashoffset: 1 - pathLength
                }}
              />
              {/* Background line */}
              <line
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>

            {/* Timeline Items */}
            <div className="space-y-12">
              {experience.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="relative pl-20"
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className="absolute left-8 top-2 w-4 h-4 rounded-full bg-primary border-4 border-background"
                    style={{ transform: 'translateX(-50%)' }}
                    initial={reducedMotionEnabled ? {} : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.5, type: 'spring' }}
                  />

                  {/* Content */}
                  <div className="card-interactive">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {t(`experience.roles.${item.roleKey}`)}
                        </h3>
                        <p className="text-primary font-medium">
                          {t(`experience.companies.${item.companyKey}`)}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground shrink-0">
                        {t(`experience.periods.${item.periodKey}`)}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {item.bulletsKey.map((bulletKey, bulletIndex) => {
                        const [company, bullet] = bulletKey.split('.');
                        return (
                          <li key={bulletIndex} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {t(`experience.bullets.${company}.${bullet}`)}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
