import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { type Project } from '@/data/projects';
import { Button } from '@/components/ui/button';

interface CaseStudyModalProps {
  project: Project;
  onClose: () => void;
}

export const CaseStudyModal = ({ project, onClose }: CaseStudyModalProps) => {
  const { t } = useTranslation();
  const { reducedMotionEnabled } = useReducedMotion();

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = reducedMotionEnabled
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.9, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, y: 20 }
      };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/90 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <motion.div
        variants={modalVariants}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-strong rounded-2xl shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors focus-ring z-10"
          aria-label={t('projects.close')}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="text-xs text-primary uppercase tracking-wider mb-2">
              {project.year} • {t(`projects.items.${project.roleKey}.role`)}
            </div>
            <h2 id="modal-title" className="text-headline text-foreground mb-4">
              {t(`projects.items.${project.titleKey}.title`)}
            </h2>
            <p className="text-body text-muted-foreground">
              {t(`projects.items.${project.descKey}.desc`)}
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-3 mb-8">
            {project.links.map((link) => (
              <Button
                key={link.type}
                variant={link.type === 'live' ? 'default' : 'outline'}
                size="sm"
                asChild
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.type === 'live' && <ExternalLink className="w-4 h-4 mr-2" />}
                  {link.type === 'github' && <Github className="w-4 h-4 mr-2" />}
                  {link.type === 'live' ? t('projects.viewLive') : t('projects.viewCode')}
                </a>
              </Button>
            ))}
          </div>

          {/* Case Study Content */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Problem */}
            <div className="card-premium">
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-destructive/20 text-destructive flex items-center justify-center text-sm">1</span>
                {t('projects.problem')}
              </h3>
              <p className="text-body text-muted-foreground">
                {t(`projects.items.${project.caseStudy.problemKey}.problem`)}
              </p>
            </div>

            {/* Solution */}
            <div className="card-premium">
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">2</span>
                {t('projects.solution')}
              </h3>
              <p className="text-body text-muted-foreground">
                {t(`projects.items.${project.caseStudy.solutionKey}.solution`)}
              </p>
            </div>
          </div>

          {/* Result */}
          <div className="card-premium mb-8 border-primary/30">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm">✓</span>
              {t('projects.result')}
            </h3>
            <p className="text-body text-muted-foreground">
              {t(`projects.items.${project.caseStudy.resultKey}.result`)}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {t('projects.stack')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-muted/50 text-foreground border border-border/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Screenshots */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {t('projects.screenshots')}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {project.caseStudy.screenshots.map((_, index) => (
                <div 
                  key={index}
                  className="aspect-video rounded-lg bg-muted/30 border border-border/50 flex items-center justify-center"
                >
                  <span className="text-xs text-muted-foreground">Screenshot {index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What I Owned */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {t('projects.owned')}
            </h3>
            <ul className="space-y-2">
              {project.caseStudy.ownedKey.map((key, index) => {
                const ownedKey = key.split('.')[1];
                return (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-body text-muted-foreground">
                      {t(`projects.items.${project.titleKey}.${ownedKey}`)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
