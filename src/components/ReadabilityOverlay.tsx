import { useReducedMotion } from '@/hooks/useReducedMotion';

export const ReadabilityOverlay = () => {
  const { reducedMotionEnabled } = useReducedMotion();

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]" aria-hidden="true">
      {/* Base dark scrim for consistent contrast */}
      <div 
        className="absolute inset-0 bg-background/40"
        style={{
          backdropFilter: reducedMotionEnabled ? 'none' : 'blur(1px)',
        }}
      />
      
      {/* Top gradient for header area */}
      <div 
        className="absolute top-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to bottom, hsl(var(--background) / 0.7), transparent)',
        }}
      />
      
      {/* Bottom gradient for footer area */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{
          background: 'linear-gradient(to top, hsl(var(--background) / 0.6), transparent)',
        }}
      />

      {/* Subtle vignette for edge contrast */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(var(--background) / 0.3) 100%)',
        }}
      />
    </div>
  );
};
