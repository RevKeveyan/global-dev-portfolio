import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear}</span>
            <span className="text-gradient font-semibold">DevPortfolio</span>
            <span>• {t('footer.rights')}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md p-1"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md p-1"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md p-1"
              aria-label="Twitter"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
