import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface NodeDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const NodeDemo = ({ isPlaying, reducedMotion }: NodeDemoProps) => {
  const [phase, setPhase] = useState(0);
  const [callbackQueue, setCallbackQueue] = useState<string[]>([]);

  useEffect(() => {
    if (!isPlaying) return;
    
    const phases = 6;
    const interval = setInterval(() => {
      setPhase(p => {
        const next = (p + 1) % phases;
        // Simulate callbacks being added/processed
        if (next === 1) setCallbackQueue(['timer']);
        else if (next === 2) setCallbackQueue(['timer', 'I/O']);
        else if (next === 3) setCallbackQueue(['I/O']);
        else if (next === 4) setCallbackQueue([]);
        else setCallbackQueue([]);
        return next;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const eventLoopSteps = [
    { id: 'timers', label: 'Timers', active: phase === 1 },
    { id: 'pending', label: 'Pending', active: phase === 2 },
    { id: 'poll', label: 'Poll', active: phase === 3 },
    { id: 'check', label: 'Check', active: phase === 4 },
    { id: 'close', label: 'Close', active: phase === 5 },
  ];

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Node.js Event Loop
      </div>

      <div className="flex items-start gap-6 w-full">
        {/* Event Loop Circle */}
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="4"
            />
            
            {/* Animated progress */}
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="251.2"
              animate={isPlaying && !reducedMotion ? {
                strokeDashoffset: [251.2, 251.2 - (phase / 6) * 251.2]
              } : { strokeDashoffset: 251.2 - (phase / 6) * 251.2 }}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
            />

            {/* Center indicator */}
            <motion.circle
              cx="50"
              cy="50"
              r="8"
              fill="hsl(var(--primary))"
              animate={isPlaying && !reducedMotion ? { 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              } : {}}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </svg>

          {/* Loop label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-medium text-primary mt-6">Loop</span>
          </div>
        </div>

        {/* Phases list */}
        <div className="flex-1 space-y-1.5">
          {eventLoopSteps.map((step, i) => (
            <motion.div
              key={step.id}
              className={`flex items-center gap-2 px-2 py-1 rounded text-[10px] transition-colors ${
                step.active 
                  ? 'bg-primary/20 text-primary border border-primary/50' 
                  : 'bg-muted/30 text-muted-foreground border border-transparent'
              }`}
              animate={step.active && isPlaying && !reducedMotion ? {
                x: [0, 4, 0],
                scale: [1, 1.02, 1]
              } : {}}
            >
              <motion.div
                className={`w-2 h-2 rounded-full ${step.active ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                animate={step.active && isPlaying && !reducedMotion ? { scale: [1, 1.5, 1] } : {}}
              />
              {step.label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Callback Queue */}
      <div className="w-full p-3 rounded-xl bg-muted/30 border border-border/50">
        <div className="text-[10px] text-muted-foreground mb-2">Callback Queue:</div>
        <div className="flex gap-2 min-h-[24px]">
          {callbackQueue.length === 0 ? (
            <span className="text-[10px] text-muted-foreground italic">Empty</span>
          ) : (
            callbackQueue.map((cb, i) => (
              <motion.div
                key={`${cb}-${i}`}
                className="px-2 py-0.5 rounded bg-accent/20 text-accent text-[10px] font-mono"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                {cb}()
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Current action */}
      <div className="text-xs text-muted-foreground">
        {phase === 0 && 'Starting event loop...'}
        {phase === 1 && 'Processing timer callbacks'}
        {phase === 2 && 'Handling I/O callbacks'}
        {phase === 3 && 'Polling for new I/O'}
        {phase === 4 && 'Running setImmediate'}
        {phase === 5 && 'Close callbacks'}
      </div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          Event loop processes async callbacks in phases
        </div>
      )}
    </div>
  );
};
