import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface GraphQLDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const GraphQLDemo = ({ isPlaying, reducedMotion }: GraphQLDemoProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setStep(s => (s + 1) % 4);
    }, 1200);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const queryFields = ['name', 'email', 'avatar'];
  const allFields = ['id', 'name', 'email', 'avatar', 'role', 'createdAt'];

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        GraphQL Selective Fetching
      </div>

      <div className="flex items-start justify-between w-full gap-4">
        {/* Query */}
        <motion.div
          className={`flex-1 p-3 rounded-xl font-mono text-[10px] leading-relaxed transition-colors ${
            step === 0 ? 'bg-primary/20 border border-primary/50' : 'bg-muted/30 border border-transparent'
          }`}
          animate={step === 0 && isPlaying && !reducedMotion ? { scale: [1, 1.02, 1] } : {}}
        >
          <div className="text-primary">query {'{'}</div>
          <div className="pl-2 text-foreground">user {'{'}</div>
          {queryFields.map((field, i) => (
            <motion.div
              key={field}
              className="pl-4 text-accent"
              animate={step === 0 && isPlaying && !reducedMotion ? {
                opacity: [0.5, 1, 0.5]
              } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {field}
            </motion.div>
          ))}
          <div className="pl-2 text-foreground">{'}'}</div>
          <div className="text-primary">{'}'}</div>
        </motion.div>

        {/* Arrow */}
        <div className="flex flex-col items-center pt-8">
          <motion.div
            className="text-muted-foreground text-lg"
            animate={step === 1 && isPlaying && !reducedMotion ? { 
              x: [0, 5, 0],
              opacity: [0.5, 1, 0.5]
            } : {}}
            transition={{ duration: 0.5, repeat: step === 1 ? Infinity : 0 }}
          >
            →
          </motion.div>
        </div>

        {/* Database Fields */}
        <motion.div
          className={`flex-1 p-3 rounded-xl transition-colors ${
            step === 1 || step === 2 ? 'bg-accent/20 border border-accent/50' : 'bg-muted/30 border border-transparent'
          }`}
        >
          <div className="text-[10px] text-muted-foreground mb-2">All Fields:</div>
          <div className="space-y-1">
            {allFields.map((field) => {
              const isSelected = queryFields.includes(field);
              return (
                <motion.div
                  key={field}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                    isSelected
                      ? 'bg-primary/30 text-primary'
                      : 'bg-muted/30 text-muted-foreground line-through opacity-50'
                  }`}
                  animate={(step === 1 || step === 2) && isSelected && isPlaying && !reducedMotion ? {
                    scale: [1, 1.05, 1],
                    opacity: [0.7, 1, 0.7]
                  } : {}}
                  transition={{ duration: 0.8 }}
                >
                  {field}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Result */}
      <motion.div
        className={`w-full p-3 rounded-xl font-mono text-[10px] transition-colors ${
          step === 3 ? 'bg-primary/20 border border-primary/50' : 'bg-muted/30 border border-transparent'
        }`}
        animate={step === 3 && isPlaying && !reducedMotion ? { scale: [1, 1.01, 1] } : {}}
      >
        <span className="text-muted-foreground">Response: </span>
        <span className="text-primary">{'{ '}</span>
        {queryFields.map((field, i) => (
          <span key={field}>
            <span className="text-accent">{field}</span>
            {i < queryFields.length - 1 ? ', ' : ''}
          </span>
        ))}
        <span className="text-primary">{' }'}</span>
        <span className="text-muted-foreground ml-2">// Only requested data!</span>
      </motion.div>

      {/* Step indicator */}
      <div className="flex gap-2">
        {['Query', 'Fetch', 'Filter', 'Return'].map((label, i) => (
          <div
            key={label}
            className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
              step === i ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground'
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          Request only the fields you need, get exactly that data
        </div>
      )}
    </div>
  );
};
