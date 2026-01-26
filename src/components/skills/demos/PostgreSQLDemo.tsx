import { motion } from 'framer-motion';
import { Database, Table } from 'lucide-react';

interface PostgreSQLDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const PostgreSQLDemo = ({ isPlaying, reducedMotion }: PostgreSQLDemoProps) => {
  const rows = [
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'User' },
    { id: 3, name: 'Carol', role: 'User' },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Relational Database
      </div>

      {/* PostgreSQL Icon */}
      <motion.div
        className="p-4 rounded-2xl bg-blue-600/20"
        animate={isPlaying && !reducedMotion ? {
          scale: [1, 1.05, 1],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Database className="w-8 h-8 text-blue-500" />
      </motion.div>

      {/* Table Visualization */}
      <div className="bg-muted/30 rounded-lg overflow-hidden w-full">
        {/* Header */}
        <div className="flex bg-blue-600/20 px-3 py-2 text-xs font-medium">
          <span className="flex-1 text-blue-400">id</span>
          <span className="flex-1 text-blue-400">name</span>
          <span className="flex-1 text-blue-400">role</span>
        </div>
        
        {/* Rows */}
        {rows.map((row, i) => (
          <motion.div
            key={row.id}
            className="flex px-3 py-2 text-xs border-t border-border/20"
            animate={isPlaying && !reducedMotion ? {
              backgroundColor: [
                'transparent',
                'hsl(220 70% 55% / 0.1)',
                'transparent',
              ],
            } : {}}
            transition={{
              duration: 1,
              delay: i * 0.5,
              repeat: Infinity,
              repeatDelay: rows.length * 0.5,
            }}
          >
            <span className="flex-1 text-muted-foreground">{row.id}</span>
            <span className="flex-1 text-foreground">{row.name}</span>
            <span className="flex-1 text-green-400">{row.role}</span>
          </motion.div>
        ))}
      </div>

      {/* Query */}
      <motion.div
        className="font-mono text-xs text-center"
        animate={isPlaying && !reducedMotion ? { opacity: [0.6, 1, 0.6] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-purple-400">SELECT</span>
        <span className="text-muted-foreground"> * </span>
        <span className="text-purple-400">FROM</span>
        <span className="text-blue-400"> users</span>
      </motion.div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          ACID Compliant • SQL Queries
        </div>
      )}
    </div>
  );
};
