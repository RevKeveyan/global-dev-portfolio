import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface HighContrastContextType {
  highContrastEnabled: boolean;
  setHighContrastEnabled: (enabled: boolean) => void;
  toggleHighContrast: () => void;
}

const HighContrastContext = createContext<HighContrastContextType | undefined>(undefined);

const STORAGE_KEY = 'high-contrast-mode';

export const HighContrastProvider = ({ children }: { children: ReactNode }) => {
  const [highContrastEnabled, setHighContrastEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === 'true';
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(highContrastEnabled));
    
    // Toggle class on document for global styling
    if (highContrastEnabled) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrastEnabled]);

  const toggleHighContrast = () => setHighContrastEnabled(prev => !prev);

  return (
    <HighContrastContext.Provider value={{ highContrastEnabled, setHighContrastEnabled, toggleHighContrast }}>
      {children}
    </HighContrastContext.Provider>
  );
};

export const useHighContrast = () => {
  const context = useContext(HighContrastContext);
  if (!context) {
    throw new Error('useHighContrast must be used within HighContrastProvider');
  }
  return context;
};
