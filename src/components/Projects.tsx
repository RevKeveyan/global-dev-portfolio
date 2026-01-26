import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, AnimatePresence, Variants } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { projects, type Project } from '@/data/projects';
import { CaseStudyModal } from './CaseStudyModal';

export const Projects = () => {
  const { t } = useTranslation();
  const { reducedMotionEnabled } = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotionEnabled ? 0 : 0.1,
      }
    }
  };

  const itemVariants: Variants = reducedMotionEnabled
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="container-wide relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="surface-panel p-6 sm:p-10"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-headline mb-4">
              <span className="text-gradient">{t('projects.title')}</span>
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </motion.div>

          {/* Project Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="card-interactive group cursor-pointer"
                onClick={() => setSelectedProject(project)}
                whileHover={reducedMotionEnabled ? {} : { y: -8, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {/* Project Image Placeholder */}
                <div className="aspect-video rounded-lg bg-muted/30 mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-display font-bold text-muted-foreground/30">
                      {project.year}
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>

                {/* Project Info */}
                <h3 className="text-title text-foreground mb-2 group-hover:text-primary transition-colors">
                  {t(`projects.items.${project.titleKey}.title`)}
                </h3>
                <p className="text-small text-muted-foreground mb-3 line-clamp-2">
                  {t(`projects.items.${project.descKey}.desc`)}
                </p>

                {/* Role */}
                <p className="text-xs text-primary mb-3">
                  {t(`projects.items.${project.roleKey}.role`)}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 rounded text-xs font-medium bg-muted/50 text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="px-2 py-1 rounded text-xs font-medium bg-muted/50 text-muted-foreground">
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-3 border-t border-border/30">
                  {project.links.map((link) => (
                    <a
                      key={link.type}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors focus-ring rounded"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {link.type === 'live' && <ExternalLink className="w-3.5 h-3.5" />}
                      {link.type === 'github' && <Github className="w-3.5 h-3.5" />}
                      {link.type === 'live' ? t('projects.viewLive') : t('projects.viewCode')}
                    </a>
                  ))}
                  <button 
                    className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors focus-ring rounded ml-auto"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {t('projects.viewCase')}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};
