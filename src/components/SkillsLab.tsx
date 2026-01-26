import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, AnimatePresence, Variants } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { skills, SKILL_CATEGORIES, getSkillsByCategory, type Skill, type SkillCategory } from '@/data/skills';
import { TechIcon } from '@/components/TechIcon';
import { Button } from '@/components/ui/button';
import { SkillDemo } from '@/components/skills/SkillDemo';

export const SkillsLab = () => {
  const { t } = useTranslation();
  const { reducedMotionEnabled } = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [activeCategory, setActiveCategory] = useState<SkillCategory>('frontend');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(skills[0]);
  const [isPlaying, setIsPlaying] = useState(true);

  const categorySkills = getSkillsByCategory(activeCategory);

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

  const handleCategoryChange = (category: SkillCategory) => {
    setActiveCategory(category);
    const newSkills = getSkillsByCategory(category);
    if (newSkills.length > 0) {
      setSelectedSkill(newSkills[0]);
    }
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(ellipse at bottom right, hsl(270 80% 50% / 0.1), transparent 60%)' }}
      />

      <div className="container-wide relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header with surface */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="surface-panel inline-block px-8 py-6">
              <h2 className="text-headline mb-4">
                <span className="text-gradient">{t('skills.title')}</span>
              </h2>
              <p className="text-body-lg max-w-2xl mx-auto">
                {t('skills.subtitle')}
              </p>
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {SKILL_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus-ring ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {t(`skills.categories.${category}`)}
              </button>
            ))}
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Skills Grid */}
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
                    {categorySkills.map((skill) => (
                      <button
                        key={skill.id}
                        onClick={() => setSelectedSkill(skill)}
                        className={`flex items-center gap-3 p-4 rounded-xl border transition-all focus-ring ${
                          selectedSkill?.id === skill.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border/50 bg-card/30 hover:border-primary/50 hover:bg-card/50'
                        }`}
                      >
                        <TechIcon 
                          name={skill.icon} 
                          className="w-5 h-5 shrink-0" 
                          style={{ color: skill.color }} 
                        />
                        <span className="text-sm font-medium truncate">
                          {t(`skills.items.${skill.labelKey}.name`)}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right: Preview Panel */}
            <motion.div variants={itemVariants} className="flex flex-col">
              <div className="surface-card flex-1 min-h-[400px] flex flex-col">
                {/* Demo Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-heading">
                    {selectedSkill ? t(`skills.items.${selectedSkill.labelKey}.name`) : 'Select a skill'}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 mr-1" />
                        {t('skills.playPause.pause')}
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-1" />
                        {t('skills.playPause.play')}
                      </>
                    )}
                  </Button>
                </div>

                {/* Demo Area */}
                <div className="flex-1 flex items-center justify-center surface-glass rounded-lg p-4">
                  <AnimatePresence mode="wait">
                    {selectedSkill && (
                      <SkillDemo 
                        key={selectedSkill.id}
                        skill={selectedSkill} 
                        isPlaying={isPlaying} 
                        reducedMotion={reducedMotionEnabled}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Use Cases */}
                {selectedSkill && (
                  <div className="mt-4 pt-4 border-t border-border/30">
                    <h4 className="text-caption mb-2">
                      {t('skills.useCases')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(t(`skills.items.${selectedSkill.labelKey}.useCases`, { returnObjects: true }) as string[]).map((useCase, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-muted/50 text-subtle"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
