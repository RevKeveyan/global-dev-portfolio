import { motion } from 'framer-motion';
import { type Skill } from '@/data/skills';
import { ReduxDemo } from './demos/ReduxDemo';
import { WebSocketsDemo } from './demos/WebSocketsDemo';
import { RedisDemo } from './demos/RedisDemo';
import { DockerDemo } from './demos/DockerDemo';
import { RestDemo } from './demos/RestDemo';
import { DefaultDemo } from './demos/DefaultDemo';

interface SkillDemoProps {
  skill: Skill;
  isPlaying: boolean;
  reducedMotion: boolean;
}

export const SkillDemo = ({ skill, isPlaying, reducedMotion }: SkillDemoProps) => {
  const getDemoComponent = () => {
    switch (skill.demoType) {
      case 'redux':
        return <ReduxDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'websockets':
        return <WebSocketsDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'redis':
        return <RedisDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'docker':
        return <DockerDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'rest':
        return <RestDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      default:
        return <DefaultDemo skill={skill} reducedMotion={reducedMotion} />;
    }
  };

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex items-center justify-center"
    >
      {getDemoComponent()}
    </motion.div>
  );
};
