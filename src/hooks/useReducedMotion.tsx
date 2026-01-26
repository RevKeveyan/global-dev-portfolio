import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ReducedMotionContextType {
  prefersReducedMotion: boolean;
  reducedMotionEnabled: boolean;
  setReducedMotionEnabled: (enabled: boolean) => void;
}

const ReducedMotionContext = createContext<ReducedMotionContextType | undefined>(undefined);

export const ReducedMotionProvider = ({ children }: { children: ReactNode }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [reducedMotionEnabled, setReducedMotionEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    setReducedMotionEnabled(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setReducedMotionEnabled(true);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ReducedMotionContext.Provider value={{ prefersReducedMotion, reducedMotionEnabled, setReducedMotionEnabled }}>
      {children}
    </ReducedMotionContext.Provider>
  );
};

export const useReducedMotion = () => {
  const context = useContext(ReducedMotionContext);
  if (!context) {
    throw new Error('useReducedMotion must be used within ReducedMotionProvider');
  }
  return context;
};
