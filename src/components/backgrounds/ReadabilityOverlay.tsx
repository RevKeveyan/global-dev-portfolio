import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useHighContrast } from '@/hooks/useHighContrast';

export const ReadabilityOverlay = () => {
  const { reducedMotionEnabled } = useReducedMotion();
  const { highContrastEnabled } = useHighContrast();

  // Higher opacity in high contrast mode
  const scrimOpacity = highContrastEnabled ? 0.7 : 0.45;
  const gradientOpacity = highContrastEnabled ? 0.5 : 0.3;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -5 }}>
      {/* Main dark scrim for consistent contrast */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `hsl(var(--background) / ${scrimOpacity})`,
        }}
      />

      {/* Top gradient fade for header area */}
      <div 
        className="absolute inset-x-0 top-0 h-40"
        style={{ 
          background: `linear-gradient(to bottom, hsl(var(--background) / ${gradientOpacity + 0.2}), transparent)`,
        }}
      />

      {/* Bottom gradient fade for footer area */}
      <div 
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ 
          background: `linear-gradient(to top, hsl(var(--background) / ${gradientOpacity + 0.2}), transparent)`,
        }}
      />

      {/* Subtle vignette for depth */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(var(--background) / 0.4) 100%)',
        }}
      />

      {/* Optional blur layer - only when not in reduced motion for performance */}
      {!reducedMotionEnabled && (
        <div 
          className="absolute inset-0 backdrop-blur-[1px]"
          style={{ opacity: highContrastEnabled ? 0.3 : 0.15 }}
        />
      )}
    </div>
  );
};
