import { motion } from 'framer-motion';
import { Monitor, Server } from 'lucide-react';

interface WebSocketsDemoProps {
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const WebSocketsDemo = ({ isPlaying, reducedMotion }: WebSocketsDemoProps) => {
  const messages = [
    { id: 1, direction: 'right', label: 'ping', delay: 0 },
    { id: 2, direction: 'left', label: 'pong', delay: 1.2 },
    { id: 3, direction: 'right', label: 'data', delay: 2.4 },
    { id: 4, direction: 'left', label: 'ack', delay: 3.6 },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
        WebSocket Communication
      </div>

      <div className="flex items-center justify-between w-full">
        {/* Client */}
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 rounded-xl bg-primary/20 text-primary">
            <Monitor className="w-6 h-6" />
          </div>
          <span className="text-xs text-muted-foreground">Client</span>
        </div>

        {/* Connection Line with Messages */}
        <div className="flex-1 mx-4 relative h-20">
          {/* Base line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border/50 -translate-y-1/2" />
          
          {/* Animated messages */}
          {isPlaying && !reducedMotion && messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`absolute top-1/2 -translate-y-1/2 px-2 py-1 rounded text-[10px] font-medium ${
                msg.direction === 'right' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-accent text-accent-foreground'
              }`}
              initial={{ 
                left: msg.direction === 'right' ? '0%' : '100%',
                opacity: 0
              }}
              animate={{
                left: msg.direction === 'right' ? '100%' : '0%',
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 1,
                delay: msg.delay,
                repeat: Infinity,
                repeatDelay: 4,
                ease: 'easeInOut'
              }}
            >
              {msg.label}
            </motion.div>
          ))}
        </div>

        {/* Server */}
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 rounded-xl bg-accent/20 text-accent">
            <Server className="w-6 h-6" />
          </div>
          <span className="text-xs text-muted-foreground">Server</span>
        </div>
      </div>

      {/* Reduced motion fallback */}
      {reducedMotion && (
        <div className="text-xs text-muted-foreground text-center">
          Bi-directional real-time communication
        </div>
      )}
    </div>
  );
};
