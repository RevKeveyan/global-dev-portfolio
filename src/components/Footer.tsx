import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const navLinks = [
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'projects', href: '#projects' },
  { key: 'experience', href: '#experience' },
  { key: 'contact', href: '#contact' },
];

export const Footer = () => {
  const { t } = useTranslation();
  const { reducedMotionEnabled } = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer 
      className="py-12 relative"
      initial={reducedMotionEnabled ? {} : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-wide">
        <div className="surface-panel px-6 py-8 sm:px-10 sm:py-10">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            {/* Logo */}
            <a 
              href="#" 
              className="flex items-center gap-2 text-xl font-display font-bold text-foreground focus-ring rounded-md"
            >
              <span className="text-gradient">Revik</span>
              <span>Keveyan</span>
            </a>

            {/* Nav Links */}
            <nav className="flex flex-wrap justify-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors focus-ring rounded link-underline"
                >
                  {t(`nav.${link.key}`)}
                </a>
              ))}
            </nav>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors focus-ring rounded p-2"
              aria-label={t('footer.backToTop')}
            >
              <span className="hidden sm:inline">{t('footer.backToTop')}</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50 mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground/70">
            <div className="flex items-center gap-2">
              <span>© {currentYear}</span>
              <span className="text-gradient font-semibold">Revik Keveyan</span>
              <span>•</span>
              <span>{t('footer.rights')}</span>
            </div>
            
            <div className="text-xs text-foreground/60">
              {t('footer.builtWith')}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
