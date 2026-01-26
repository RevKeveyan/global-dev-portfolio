import { motion } from 'framer-motion';
import { FileJson } from 'lucide-react';

interface MongoDBDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const MongoDBDemo = ({ isPlaying, reducedMotion }: MongoDBDemoProps) => {
  const documents = [
    { id: 1, field: 'name', value: '"John"' },
    { id: 2, field: 'age', value: '28' },
    { id: 3, field: 'active', value: 'true' },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        Document Database
      </div>

      {/* MongoDB Leaf Icon */}
      <motion.div
        className="p-4 rounded-2xl bg-green-500/20"
        animate={isPlaying && !reducedMotion ? {
          scale: [1, 1.05, 1],
          boxShadow: [
            '0 0 0 0 hsl(140 60% 45% / 0)',
            '0 0 30px 10px hsl(140 60% 45% / 0.2)',
            '0 0 0 0 hsl(140 60% 45% / 0)',
          ],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FileJson className="w-8 h-8 text-green-500" />
      </motion.div>

      {/* Document Visualization */}
      <div className="bg-muted/30 rounded-lg p-4 font-mono text-xs w-full">
        <div className="text-muted-foreground">{'{'}</div>
        {documents.map((doc, i) => (
          <motion.div
            key={doc.id}
            className="ml-4 flex gap-2"
            animate={isPlaying && !reducedMotion ? {
              opacity: [0.5, 1, 0.5],
              x: [0, 2, 0],
            } : {}}
            transition={{
              duration: 1.5,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          >
            <span className="text-purple-400">{doc.field}</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-green-400">{doc.value}</span>
            {i < documents.length - 1 && <span className="text-muted-foreground">,</span>}
          </motion.div>
        ))}
        <div className="text-muted-foreground">{'}'}</div>
      </div>

      {/* Query Animation */}
      <motion.div
        className="flex items-center gap-2"
        animate={isPlaying && !reducedMotion ? { opacity: [0.6, 1, 0.6] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs text-muted-foreground">db.collection.</span>
        <motion.span
          className="text-xs text-green-400 font-medium"
          animate={isPlaying && !reducedMotion ? {
            textShadow: [
              '0 0 0 hsl(140 60% 45% / 0)',
              '0 0 10px hsl(140 60% 45% / 0.5)',
              '0 0 0 hsl(140 60% 45% / 0)',
            ],
          } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          find()
        </motion.span>
      </motion.div>

      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          BSON Documents • Flexible Schema
        </div>
      )}
    </div>
  );
};
