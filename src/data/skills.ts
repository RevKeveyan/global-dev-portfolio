export type SkillCategory = 
  | 'frontend' 
  | 'ui' 
  | 'vue' 
  | 'backend' 
  | 'data' 
  | 'devops' 
  | 'tooling' 
  | 'platforms' 
  | 'seo';

export type DemoType = 
  | 'redux' 
  | 'websockets' 
  | 'redis' 
  | 'docker' 
  | 'rest' 
  | 'react' 
  | 'graphql'
  | 'typescript'
  | 'git'
  | 'vue'
  | 'nodejs'
  | 'default';

export interface Skill {
  id: string;
  labelKey: string;
  category: SkillCategory;
  icon: string;
  demoType: DemoType;
  color?: string;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  'frontend',
  'ui',
  'vue',
  'backend',
  'data',
  'devops',
  'tooling',
  'platforms',
  'seo'
];

export const skills: Skill[] = [
  // Frontend
  { id: 'react', labelKey: 'react', category: 'frontend', icon: 'atom', demoType: 'react', color: '#61DAFB' },
  { id: 'typescript', labelKey: 'typescript', category: 'frontend', icon: 'file-code', demoType: 'typescript', color: '#3178C6' },
  { id: 'nextjs', labelKey: 'nextjs', category: 'frontend', icon: 'triangle', demoType: 'default', color: '#FFFFFF' },
  { id: 'tailwind', labelKey: 'tailwind', category: 'frontend', icon: 'palette', demoType: 'default', color: '#06B6D4' },
  { id: 'redux', labelKey: 'redux', category: 'frontend', icon: 'layers', demoType: 'redux', color: '#764ABC' },

  // UI/UX
  { id: 'figma', labelKey: 'figma', category: 'ui', icon: 'figma', demoType: 'default', color: '#F24E1E' },
  { id: 'framer', labelKey: 'framer', category: 'ui', icon: 'sparkles', demoType: 'default', color: '#BB4DFF' },

  // Vue Ecosystem
  { id: 'vue', labelKey: 'vue', category: 'vue', icon: 'component', demoType: 'vue', color: '#4FC08D' },
  { id: 'nuxt', labelKey: 'nuxt', category: 'vue', icon: 'hexagon', demoType: 'default', color: '#00DC82' },
  { id: 'pinia', labelKey: 'pinia', category: 'vue', icon: 'database', demoType: 'default', color: '#FFD859' },

  // Backend
  { id: 'nodejs', labelKey: 'nodejs', category: 'backend', icon: 'server', demoType: 'nodejs', color: '#339933' },
  { id: 'express', labelKey: 'express', category: 'backend', icon: 'route', demoType: 'default', color: '#FFFFFF' },
  { id: 'graphql', labelKey: 'graphql', category: 'backend', icon: 'share-2', demoType: 'graphql', color: '#E10098' },
  { id: 'websockets', labelKey: 'websockets', category: 'backend', icon: 'radio', demoType: 'websockets', color: '#00D4FF' },
  { id: 'rest', labelKey: 'rest', category: 'backend', icon: 'arrow-right-left', demoType: 'rest', color: '#FF6B6B' },

  // Data
  { id: 'postgresql', labelKey: 'postgresql', category: 'data', icon: 'database', demoType: 'default', color: '#336791' },
  { id: 'mongodb', labelKey: 'mongodb', category: 'data', icon: 'leaf', demoType: 'default', color: '#47A248' },
  { id: 'redis', labelKey: 'redis', category: 'data', icon: 'zap', demoType: 'redis', color: '#DC382D' },

  // DevOps/Cloud
  { id: 'docker', labelKey: 'docker', category: 'devops', icon: 'container', demoType: 'docker', color: '#2496ED' },
  { id: 'kubernetes', labelKey: 'kubernetes', category: 'devops', icon: 'network', demoType: 'default', color: '#326CE5' },
  { id: 'aws', labelKey: 'aws', category: 'devops', icon: 'cloud', demoType: 'default', color: '#FF9900' },

  // Tooling
  { id: 'git', labelKey: 'git', category: 'tooling', icon: 'git-branch', demoType: 'git', color: '#F05032' },
  { id: 'webpack', labelKey: 'webpack', category: 'tooling', icon: 'package', demoType: 'default', color: '#8DD6F9' },
  { id: 'vite', labelKey: 'vite', category: 'tooling', icon: 'bolt', demoType: 'default', color: '#646CFF' },

  // Platforms
  { id: 'vercel', labelKey: 'vercel', category: 'platforms', icon: 'triangle', demoType: 'default', color: '#FFFFFF' },
  { id: 'supabase', labelKey: 'supabase', category: 'platforms', icon: 'database', demoType: 'default', color: '#3ECF8E' },

  // SEO
  { id: 'seo', labelKey: 'seo', category: 'seo', icon: 'search', demoType: 'default', color: '#4285F4' },
];

export const getSkillsByCategory = (category: SkillCategory): Skill[] => {
  return skills.filter(skill => skill.category === category);
};
