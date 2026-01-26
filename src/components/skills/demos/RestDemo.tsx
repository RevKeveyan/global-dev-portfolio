import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight, FileJson, Layout } from 'lucide-react';

interface RestDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const RestDemo = ({ isPlaying, reducedMotion }: RestDemoProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setStep(s => (s + 1) % 4);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        REST API Flow
      </div>

      <div className="flex items-center justify-between w-full gap-2">
        {/* Request */}
        <motion.div
          className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-colors ${
            step === 0 ? 'bg-primary/20' : 'bg-muted/30'
          }`}
          animate={step === 0 && isPlaying && !reducedMotion ? { scale: [1, 1.05, 1] } : {}}
        >
          <code className="text-[10px] text-primary font-mono">GET</code>
          <span className="text-xs text-muted-foreground">/api/users</span>
        </motion.div>

        {/* Arrow */}
        <motion.div
          animate={step === 0 && isPlaying && !reducedMotion ? { x: [0, 5, 0], opacity: [0.5, 1, 0.5] } : {}}
          transition={{ duration: 0.5 }}
        >
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
        </motion.div>

        {/* JSON Response */}
        <motion.div
          className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-colors ${
            (step === 1 || step === 2) ? 'bg-accent/20' : 'bg-muted/30'
          }`}
          animate={(step === 1 || step === 2) && isPlaying && !reducedMotion ? { scale: [1, 1.05, 1] } : {}}
        >
          <FileJson className="w-5 h-5 text-accent" />
          <code className="text-[10px] font-mono text-muted-foreground">JSON</code>
        </motion.div>

        {/* Arrow */}
        <motion.div
          animate={step === 2 && isPlaying && !reducedMotion ? { x: [0, 5, 0], opacity: [0.5, 1, 0.5] } : {}}
          transition={{ duration: 0.5 }}
        >
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
        </motion.div>

        {/* UI */}
        <motion.div
          className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-colors ${
            step === 3 ? 'bg-primary/20' : 'bg-muted/30'
          }`}
          animate={step === 3 && isPlaying && !reducedMotion ? { scale: [1, 1.05, 1] } : {}}
        >
          <Layout className={`w-5 h-5 ${step === 3 ? 'text-primary' : 'text-muted-foreground'}`} />
          <span className="text-xs text-muted-foreground">UI</span>
        </motion.div>
      </div>

      {/* Current step indicator */}
      <div className="flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              step === i ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Reduced motion fallback */}
      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          Request → JSON Response → UI Update
        </div>
      )}
    </div>
  );
};
