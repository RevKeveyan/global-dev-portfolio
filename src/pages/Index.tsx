import '@/i18n';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { SkillsLab } from '@/components/SkillsLab';
import { Footer } from '@/components/Footer';
import { ReducedMotionProvider } from '@/hooks/useReducedMotion';

const Index = () => {
  return (
    <ReducedMotionProvider>
      <div className="min-h-screen bg-background dark">
        <Header />
        <main>
          <Hero />
          <About />
          <SkillsLab />
          {/* Placeholder sections */}
          <section id="projects" className="section-padding">
            <div className="container-wide text-center">
              <h2 className="text-headline text-gradient mb-4">Projects</h2>
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </section>
          <section id="experience" className="section-padding">
            <div className="container-wide text-center">
              <h2 className="text-headline text-gradient mb-4">Experience</h2>
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </section>
          <section id="contact" className="section-padding">
            <div className="container-wide text-center">
              <h2 className="text-headline text-gradient mb-4">Contact</h2>
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ReducedMotionProvider>
  );
};

export default Index;
