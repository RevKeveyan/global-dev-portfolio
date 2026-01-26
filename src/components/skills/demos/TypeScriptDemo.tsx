import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface TypeScriptDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const TypeScriptDemo = ({ isPlaying, reducedMotion }: TypeScriptDemoProps) => {
  const [phase, setPhase] = useState<'error' | 'fix' | 'success'>('error');

  useEffect(() => {
    if (!isPlaying) return;
    
    const phases: Array<'error' | 'fix' | 'success'> = ['error', 'fix', 'success'];
    let index = 0;
    
    const interval = setInterval(() => {
      index = (index + 1) % phases.length;
      setPhase(phases[index]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        TypeScript Type Safety
      </div>

      {/* Code block */}
      <motion.div
        className="w-full rounded-xl bg-muted/30 border border-border/50 overflow-hidden"
        animate={isPlaying && !reducedMotion ? {
          borderColor: phase === 'error' 
            ? 'hsl(0 70% 50% / 0.5)' 
            : phase === 'success' 
              ? 'hsl(150 70% 50% / 0.5)'
              : 'hsl(var(--border) / 0.5)'
        } : {}}
      >
        {/* Editor header */}
        <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b border-border/30">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">user.ts</span>
        </div>

        {/* Code content */}
        <div className="p-3 font-mono text-[11px] leading-relaxed">
          <div className="text-muted-foreground">
            <span className="text-primary">interface</span> User {'{'}
          </div>
          <div className="pl-3">
            <span className="text-accent">name</span>: <span className="text-primary">string</span>;
          </div>
          <div className="pl-3">
            <span className="text-accent">age</span>: <span className="text-primary">number</span>;
          </div>
          <div className="text-muted-foreground">{'}'}</div>
          <div className="h-2" />
          
          {/* Variable declaration with error/fix */}
          <div className="relative">
            <span className="text-primary">const</span>
            <span className="text-foreground"> user: User = {'{'}</span>
            <div className="pl-3">
              <span className="text-accent">name</span>: 
              <span className="text-green-400"> "John"</span>,
            </div>
            <div className="pl-3 relative">
              <span className="text-accent">age</span>: 
              <motion.span
                className={phase === 'error' ? 'text-red-400' : 'text-green-400'}
                animate={phase === 'error' && isPlaying && !reducedMotion ? {
                  opacity: [1, 0.5, 1]
                } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {phase === 'error' ? ' "25"' : ' 25'}
              </motion.span>
              
              {/* Error squiggle */}
              {phase === 'error' && (
                <motion.div
                  className="absolute bottom-0 left-10 right-4 h-0.5"
                  style={{
                    background: 'repeating-linear-gradient(90deg, hsl(0 70% 50%), hsl(0 70% 50%) 2px, transparent 2px, transparent 4px)'
                  }}
                  animate={isPlaying && !reducedMotion ? { opacity: [0.5, 1, 0.5] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </div>
            <span className="text-foreground">{'};'}</span>
          </div>
        </div>
      </motion.div>

      {/* Status indicator */}
      <motion.div
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium ${
          phase === 'error' 
            ? 'bg-red-500/20 text-red-400' 
            : phase === 'success'
              ? 'bg-green-500/20 text-green-400'
              : 'bg-yellow-500/20 text-yellow-400'
        }`}
        animate={isPlaying && !reducedMotion ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {phase === 'error' ? (
          <>
            <X className="w-4 h-4" />
            Type 'string' is not assignable to type 'number'
          </>
        ) : phase === 'fix' ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              ⚙️
            </motion.div>
            Fixing type error...
          </>
        ) : (
          <>
            <Check className="w-4 h-4" />
            No type errors found!
          </>
        )}
      </motion.div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          TypeScript catches type errors at compile time
        </div>
      )}
    </div>
  );
};
