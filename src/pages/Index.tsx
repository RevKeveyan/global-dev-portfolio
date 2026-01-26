import '@/i18n';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { SkillsLab } from '@/components/SkillsLab';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Languages } from '@/components/Languages';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { ReducedMotionProvider } from '@/hooks/useReducedMotion';
import { HighContrastProvider } from '@/hooks/useHighContrast';
import { BackgroundManager } from '@/components/backgrounds';

const Index = () => {
  return (
    <HelmetProvider>
      <ReducedMotionProvider>
        <HighContrastProvider>
          <div className="min-h-screen dark relative">
            <BackgroundManager />
            <SEOHead />
            <Header />
            <main>
              <Hero />
              <About />
              <SkillsLab />
              <Projects />
              <Experience />
              <Languages />
              <Contact />
            </main>
            <Footer />
          </div>
        </HighContrastProvider>
      </ReducedMotionProvider>
    </HelmetProvider>
  );
};

export default Index;
