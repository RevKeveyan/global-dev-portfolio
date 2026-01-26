import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GitBranch, GitCommit, GitMerge } from 'lucide-react';

interface GitDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const GitDemo = ({ isPlaying, reducedMotion }: GitDemoProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setStep(s => (s + 1) % 5);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const commits = [
    { id: 'c1', branch: 'main', x: 20, active: step >= 0 },
    { id: 'c2', branch: 'main', x: 35, active: step >= 1 },
    { id: 'c3', branch: 'feature', x: 50, y: -30, active: step >= 2 },
    { id: 'c4', branch: 'feature', x: 65, y: -30, active: step >= 3 },
    { id: 'c5', branch: 'main', x: 80, active: step >= 4, isMerge: true },
  ];

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Git Branch & Merge
      </div>

      <div className="relative w-full h-32">
        {/* Main branch line */}
        <svg className="absolute inset-0 w-full h-full">
          {/* Main branch */}
          <motion.line
            x1="15%" y1="70%" x2="85%" y2="70%"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isPlaying && !reducedMotion ? { pathLength: 1 } : { pathLength: 1 }}
            transition={{ duration: 1 }}
          />
          
          {/* Feature branch (curved path) */}
          <motion.path
            d="M 35% 70% Q 42% 40%, 50% 40% L 65% 40% Q 73% 40%, 80% 70%"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="200"
            animate={isPlaying && !reducedMotion ? {
              strokeDashoffset: step >= 2 ? [200, 0] : 200
            } : { strokeDashoffset: step >= 2 ? 0 : 200 }}
            transition={{ duration: 1.5 }}
          />
        </svg>

        {/* Commit nodes */}
        {commits.map((commit, i) => (
          <motion.div
            key={commit.id}
            className="absolute flex flex-col items-center"
            style={{
              left: `${commit.x}%`,
              top: commit.y ? `calc(70% + ${commit.y}px)` : '70%',
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={commit.active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={`p-2 rounded-full ${
                commit.isMerge 
                  ? 'bg-green-500/30 border-2 border-green-500'
                  : commit.branch === 'feature'
                    ? 'bg-accent/30 border-2 border-accent'
                    : 'bg-primary/30 border-2 border-primary'
              }`}
              animate={step === i && isPlaying && !reducedMotion ? {
                scale: [1, 1.2, 1],
                boxShadow: [
                  '0 0 0 0 hsl(var(--primary) / 0)',
                  '0 0 15px 5px hsl(var(--primary) / 0.3)',
                  '0 0 0 0 hsl(var(--primary) / 0)'
                ]
              } : {}}
            >
              {commit.isMerge ? (
                <GitMerge className="w-3 h-3 text-green-400" />
              ) : (
                <GitCommit className="w-3 h-3 text-primary" />
              )}
            </motion.div>
          </motion.div>
        ))}

        {/* Branch labels */}
        <div className="absolute left-[5%] top-[70%] -translate-y-1/2 text-[10px] text-primary font-medium">
          main
        </div>
        <motion.div
          className="absolute left-[42%] top-[25%] text-[10px] text-accent font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 2 ? 1 : 0 }}
        >
          feature
        </motion.div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {[
          { icon: GitCommit, label: 'Commit', active: step < 2 },
          { icon: GitBranch, label: 'Branch', active: step === 2 },
          { icon: GitCommit, label: 'Work', active: step === 3 },
          { icon: GitMerge, label: 'Merge', active: step === 4 },
        ].map(({ icon: Icon, label, active }, i) => (
          <motion.div
            key={label}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] transition-colors ${
              active ? 'bg-primary/20 text-primary' : 'bg-muted/30 text-muted-foreground'
            }`}
            animate={active && isPlaying && !reducedMotion ? { scale: [1, 1.05, 1] } : {}}
          >
            <Icon className="w-3 h-3" />
            {label}
          </motion.div>
        ))}
      </div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          Branch → Commit → Merge workflow
        </div>
      )}
    </div>
  );
};
