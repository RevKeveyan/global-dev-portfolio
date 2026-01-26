import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface HighContrastContextType {
  highContrastEnabled: boolean;
  toggleHighContrast: () => void;
}

const HighContrastContext = createContext<HighContrastContextType | undefined>(undefined);

export const HighContrastProvider = ({ children }: { children: ReactNode }) => {
  const [highContrastEnabled, setHighContrastEnabled] = useState(false);

  const toggleHighContrast = useCallback(() => {
    setHighContrastEnabled(prev => !prev);
  }, []);

  return (
    <HighContrastContext.Provider value={{ highContrastEnabled, toggleHighContrast }}>
      <div className={highContrastEnabled ? 'high-contrast' : ''}>
        {children}
      </div>
    </HighContrastContext.Provider>
  );
};

export const useHighContrast = () => {
  const context = useContext(HighContrastContext);
  if (!context) {
    throw new Error('useHighContrast must be used within a HighContrastProvider');
  }
  return context;
};
