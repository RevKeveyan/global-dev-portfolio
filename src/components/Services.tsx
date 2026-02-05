import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { services, SERVICE_CATEGORIES, getServicesByCategory, type Service, type ServiceCategory } from '@/data/services';
import { TechIcon } from '@/components/TechIcon';
import { Button } from '@/components/ui/button';

export const Services = () => {
  const { t } = useTranslation();
  const { reducedMotionEnabled } = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('development');
  const [selectedService, setSelectedService] = useState<Service | null>(services[0]);

  const categoryServices = getServicesByCategory(activeCategory);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotionEnabled ? 0 : 0.05,
      }
    }
  };

  const itemVariants: Variants = reducedMotionEnabled
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.4 }
        }
      };

  const handleCategoryChange = (category: ServiceCategory) => {
    setActiveCategory(category);
    const newServices = getServicesByCategory(category);
    if (newServices.length > 0) {
      setSelectedService(newServices[0]);
    }
  };

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(ellipse at bottom left, hsl(190 90% 50% / 0.1), transparent 60%)' }}
      />

      <div className="container-wide relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-headline mb-3">
              <span className="text-gradient font-extrabold">{t('services.title')}</span>
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {SERVICE_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus-ring ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {t(`services.categories.${category}`)}
              </button>
            ))}
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Services Grid */}
            <motion.div variants={itemVariants}>
              <div className="surface-card">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={reducedMotionEnabled ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotionEnabled ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                  >
                    {categoryServices.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        className={`flex items-center gap-3 p-4 rounded-xl border transition-all focus-ring ${
                          selectedService?.id === service.id
                            ? 'border-primary bg-primary/10 text-foreground'
                            : 'border-border bg-card/50 hover:border-primary/50 hover:bg-card/70 text-foreground'
                        }`}
                      >
                        <TechIcon 
                          name={service.icon} 
                          className="w-5 h-5 shrink-0" 
                          style={{ color: service.color }} 
                        />
                        <span className="text-sm font-medium truncate text-foreground">
                          {t(`services.items.${service.labelKey}.name`)}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right: Service Details Panel */}
            <motion.div variants={itemVariants} className="flex flex-col">
              <div className="surface-card flex-1 min-h-[400px] flex flex-col">
                {/* Service Header */}
                <AnimatePresence mode="wait">
                  {selectedService && (
                    <motion.div
                      key={selectedService.id}
                      initial={reducedMotionEnabled ? { opacity: 1 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reducedMotionEnabled ? { opacity: 0 } : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col h-full"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div 
                          className="p-4 rounded-2xl"
                          style={{ 
                            backgroundColor: `${selectedService.color}15`,
                            color: selectedService.color 
                          }}
                        >
                          <TechIcon name={selectedService.icon} className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">
                            {t(`services.items.${selectedService.labelKey}.name`)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {t(`services.categories.${selectedService.category}`)}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-body text-muted-foreground mb-6">
                        {t(`services.items.${selectedService.labelKey}.description`)}
                      </p>

                      {/* Features List */}
                      <div className="flex-1">
                        <h4 className="text-caption mb-3 text-muted-foreground">
                          {t('services.includes')}
                        </h4>
                        <ul className="space-y-2">
                          {(t(`services.items.${selectedService.labelKey}.features`, { returnObjects: true }) as string[]).map((feature, index) => (
                            <li 
                              key={index}
                              className="flex items-center gap-2 text-sm text-foreground"
                            >
                              <Check className="w-4 h-4 text-primary shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-6 pt-4 border-t border-border/30">
                        <Button 
                          className="w-full group"
                          onClick={() => {
                            const contactSection = document.getElementById('contact');
                            contactSection?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          {t('services.getStarted')}
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
