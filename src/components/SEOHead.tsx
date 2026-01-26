import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/i18n';

interface SEOHeadProps {
  path?: string;
}

export const SEOHead = ({ path = '/' }: SEOHeadProps) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as SupportedLanguage;

  const title = t('meta.title');
  const description = t('meta.description');
  const keywords = t('meta.keywords');
  
  // Base URL - in production, this would come from environment variables
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://example.com';
  const currentUrl = `${baseUrl}${path}`;

  // Generate alternate language links
  const alternateLinks = SUPPORTED_LANGUAGES.map((lang) => ({
    lang,
    href: `${baseUrl}/${lang}${path === '/' ? '' : path}`
  }));

  useEffect(() => {
    // Set document language
    document.documentElement.lang = currentLang;
    
    // Set direction for RTL languages if needed
    document.documentElement.dir = 'ltr';
  }, [currentLang]);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Revik Keveyan" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Language */}
      <html lang={currentLang} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Alternate Language Links (hreflang) */}
      {alternateLinks.map(({ lang, href }) => (
        <link 
          key={lang}
          rel="alternate" 
          hrefLang={lang} 
          href={href} 
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/en${path === '/' ? '' : path}`} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}/og-image.png`} />
      <meta property="og:locale" content={currentLang} />
      {SUPPORTED_LANGUAGES.filter(lang => lang !== currentLang).map(lang => (
        <meta key={lang} property="og:locale:alternate" content={lang} />
      ))}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}/twitter-image.png`} />
      
      {/* Additional SEO */}
      <meta name="theme-color" content="#0a0f1e" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      
      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Revik Keveyan",
          "url": baseUrl,
          "jobTitle": "Full-Stack Developer",
          "description": description,
          "sameAs": [
            "https://github.com/username",
            "https://linkedin.com/in/username",
            "https://twitter.com/username"
          ],
          "knowsAbout": [
            "React",
            "TypeScript",
            "Node.js",
            "PostgreSQL",
            "Web Development"
          ]
        })}
      </script>
    </Helmet>
  );
};

/*
SEO CHECKLIST FOR MULTILINGUAL PORTFOLIO:

✅ Technical SEO:
  - Proper <html lang="xx"> attribute
  - Canonical URLs
  - hreflang tags for all language versions
  - x-default hreflang for fallback
  - Mobile-friendly viewport meta
  - Robots meta tag

✅ Content SEO:
  - Unique title per locale (under 60 chars)
  - Unique meta description per locale (under 160 chars)
  - Keywords meta tag

✅ Social SEO:
  - Open Graph tags (og:title, og:description, og:image, og:url, og:type)
  - Twitter Card tags
  - Locale variations in OG tags

✅ Structured Data:
  - JSON-LD for Person schema
  - Include relevant professional info

📝 TODO for Production:
  1. Generate sitemap.xml with all language versions
  2. Create robots.txt allowing crawlers
  3. Add actual OG and Twitter images (1200x630 recommended)
  4. Replace placeholder URLs with real ones
  5. Add Google Search Console verification
  6. Consider adding Article schema for blog posts
  7. Add BreadcrumbList schema if applicable
*/
