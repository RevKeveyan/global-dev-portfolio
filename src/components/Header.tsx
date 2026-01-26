import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AccessibilityToggle } from '@/components/AccessibilityToggle';
import { 
  SUPPORTED_LANGUAGES, 
  LANGUAGE_NAMES, 
  LANGUAGE_FLAGS, 
  changeLanguage,
  type SupportedLanguage 
} from '@/i18n';

const navLinks = [
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'projects', href: '#projects' },
  { key: 'experience', href: '#experience' },
  { key: 'languages', href: '#languages' },
  { key: 'contact', href: '#contact' },
];

export const Header = () => {
  const { t, i18n } = useTranslation();
  const { reducedMotionEnabled } = useReducedMotion();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const currentLang = i18n.language as SupportedLanguage;

  const handleLanguageChange = useCallback((lang: SupportedLanguage) => {
    changeLanguage(lang);
    setIsLangMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const animationProps = reducedMotionEnabled 
    ? {} 
    : {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 }
      };

  const mobileMenuVariants: Variants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
      {...animationProps}
    >
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center gap-2 text-xl font-display font-bold text-foreground focus-ring rounded-md"
            aria-label="Home"
          >
            <span className="text-gradient">Dev</span>
            <span>Portfolio</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.key}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md link-underline"
                initial={reducedMotionEnabled ? {} : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {t(`nav.${link.key}`)}
              </motion.a>
            ))}
          </div>

          {/* Right side: Accessibility + Language Switcher + Mobile Menu */}
          <div className="flex items-center gap-1">
            {/* Accessibility Toggle */}
            <AccessibilityToggle />
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(prev => !prev)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md"
                aria-label={t('accessibility.languageSwitch')}
                aria-expanded={isLangMenuOpen}
              >
                <span className="text-base">{LANGUAGE_FLAGS[currentLang]}</span>
                <span className="hidden sm:inline">{currentLang.toUpperCase()}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={reducedMotionEnabled ? { opacity: 1 } : { opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotionEnabled ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-40 py-2 glass-strong rounded-lg shadow-lg z-50"
                  >
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => handleLanguageChange(lang)}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-muted/50 focus-ring ${
                          lang === currentLang ? 'text-primary font-medium' : 'text-muted-foreground'
                        }`}
                        aria-current={lang === currentLang ? 'true' : undefined}
                      >
                        <span>{LANGUAGE_FLAGS[lang]}</span>
                        <span>{LANGUAGE_NAMES[lang]}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md"
              aria-label={isMobileMenuOpen ? t('accessibility.menuClose') : t('accessibility.menuOpen')}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
            <motion.div
              variants={reducedMotionEnabled ? undefined : mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm glass-strong border-l border-border md:hidden"
            >
              <div className="flex flex-col h-full pt-20 pb-8 px-6">
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.key}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors focus-ring"
                      initial={reducedMotionEnabled ? {} : { opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {t(`nav.${link.key}`)}
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
