import { useTranslation } from 'react-i18next';
import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Zap, Rocket } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { stats } from '@/data/about';

const cardIcons = [Code2, Zap, Rocket];

export const About = () => {
  const { t } = useTranslation();
  const { reducedMotionEnabled } = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotionEnabled ? 0 : 0.15,
      }
    }
  };

  const itemVariants: Variants = reducedMotionEnabled
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 40 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6, ease: 'easeOut' }
        }
      };

  const cards = t('about.cards', { returnObjects: true }) as Array<{ title: string; desc: string }>;

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="container-wide relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-5xl mx-auto surface-panel p-8 sm:p-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-headline mb-4">
              <span className="text-gradient">{t('about.title')}</span>
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              {t('about.desc')}
            </p>
          </motion.div>

          {/* Value Cards */}
          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {cards.map((card, index) => {
              const Icon = cardIcons[index];
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="card-interactive group"
                  whileHover={reducedMotionEnabled ? {} : { y: -8 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-title text-foreground">{card.title}</h3>
                  </div>
                  <p className="text-body text-muted-foreground">{card.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-small text-muted-foreground uppercase tracking-wider">
                  {t(`about.stats.${stat.labelKey}`)}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
