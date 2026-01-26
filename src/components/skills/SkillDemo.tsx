import { motion } from 'framer-motion';
import { type Skill } from '@/data/skills';
import { ReduxDemo } from './demos/ReduxDemo';
import { WebSocketsDemo } from './demos/WebSocketsDemo';
import { RedisDemo } from './demos/RedisDemo';
import { DockerDemo } from './demos/DockerDemo';
import { RestDemo } from './demos/RestDemo';
import { ReactDemo } from './demos/ReactDemo';
import { GraphQLDemo } from './demos/GraphQLDemo';
import { TypeScriptDemo } from './demos/TypeScriptDemo';
import { GitDemo } from './demos/GitDemo';
import { VueDemo } from './demos/VueDemo';
import { NodeDemo } from './demos/NodeDemo';
import { DefaultDemo } from './demos/DefaultDemo';
import { FigmaDemo } from './demos/FigmaDemo';
import { FramerDemo } from './demos/FramerDemo';
import { TailwindDemo } from './demos/TailwindDemo';
import { NextDemo } from './demos/NextDemo';
import { NuxtDemo } from './demos/NuxtDemo';
import { PiniaDemo } from './demos/PiniaDemo';
import { ExpressDemo } from './demos/ExpressDemo';
import { MongoDBDemo } from './demos/MongoDBDemo';
import { PostgreSQLDemo } from './demos/PostgreSQLDemo';
import { KubernetesDemo } from './demos/KubernetesDemo';
import { AWSDemo } from './demos/AWSDemo';
import { WebpackDemo } from './demos/WebpackDemo';
import { ViteDemo } from './demos/ViteDemo';
import { VercelDemo } from './demos/VercelDemo';
import { SupabaseDemo } from './demos/SupabaseDemo';

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
      case 'react':
        return <ReactDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'graphql':
        return <GraphQLDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'typescript':
        return <TypeScriptDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'git':
        return <GitDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'vue':
        return <VueDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'nodejs':
        return <NodeDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'figma':
        return <FigmaDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'framer':
        return <FramerDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'tailwind':
        return <TailwindDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'nextjs':
        return <NextDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'nuxt':
        return <NuxtDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'pinia':
        return <PiniaDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'express':
        return <ExpressDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'mongodb':
        return <MongoDBDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'postgresql':
        return <PostgreSQLDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'kubernetes':
        return <KubernetesDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'aws':
        return <AWSDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'webpack':
        return <WebpackDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'vite':
        return <ViteDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'vercel':
        return <VercelDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
      case 'supabase':
        return <SupabaseDemo isPlaying={isPlaying} reducedMotion={reducedMotion} />;
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
