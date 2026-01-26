import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, Variants } from 'framer-motion';
import { Star } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { languages } from '@/data/languages';

export const Languages = () => {
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
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      };

  return (
    <section 
      id="languages" 
      ref={sectionRef}
      className="section-padding-sm relative overflow-hidden"
    >
      <div className="container-wide relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-headline mb-4">
              <span className="text-gradient">{t('languages.title')}</span>
            </h2>
            <p className="text-body-lg text-muted-foreground">
              {t('languages.subtitle')}
            </p>
          </motion.div>

          {/* Languages Grid */}
          <motion.div 
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto"
          >
            {languages.map((lang, index) => (
              <motion.div
                key={lang.id}
                variants={itemVariants}
                className="card-premium flex-1 min-w-[200px] max-w-[280px] text-center"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t(`languages.names.${lang.nameKey}`)}
                </h3>
                
                {/* Star Rating */}
                <div className="flex justify-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div
                      key={star}
                      initial={reducedMotionEnabled ? {} : { opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ 
                        delay: reducedMotionEnabled ? 0 : index * 0.15 + star * 0.1,
                        type: 'spring',
                        stiffness: 300
                      }}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= lang.rating 
                            ? 'fill-primary text-primary' 
                            : 'fill-muted/30 text-muted/30'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Level Label */}
                <p className="text-sm text-primary font-medium mb-1">
                  {t(`languages.level.${lang.rating}`)}
                </p>
                
                {/* Note */}
                <p className="text-xs text-muted-foreground">
                  {t(`languages.notes.${lang.noteKey}`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
