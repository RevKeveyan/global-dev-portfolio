import { motion } from 'framer-motion';
import { type Skill } from '@/data/skills';
import { TechIcon } from '@/components/TechIcon';

interface DefaultDemoProps {
  skill: Skill;
  reducedMotion: boolean;
}

export const DefaultDemo = ({ skill, reducedMotion }: DefaultDemoProps) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        className="p-8 rounded-2xl"
        style={{ backgroundColor: `${skill.color}15` }}
        animate={reducedMotion ? {} : {
          scale: [1, 1.05, 1],
          boxShadow: [
            `0 0 0 0 ${skill.color}00`,
            `0 0 40px 10px ${skill.color}20`,
            `0 0 0 0 ${skill.color}00`
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <TechIcon 
          name={skill.icon} 
          className="w-16 h-16"
          style={{ color: skill.color }}
        />
      </motion.div>
      
      <div className="text-sm text-muted-foreground text-center">
        Click a skill with an interactive demo
      </div>
    </div>
  );
};
