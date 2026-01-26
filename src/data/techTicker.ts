export interface TechItem {
  id: string;
  name: string;
  icon: string;
  color?: string;
}

export const techTicker: TechItem[] = [
  { id: 'react', name: 'React', icon: 'atom', color: '#61DAFB' },
  { id: 'typescript', name: 'TypeScript', icon: 'file-code', color: '#3178C6' },
  { id: 'nodejs', name: 'Node.js', icon: 'server', color: '#339933' },
  { id: 'nextjs', name: 'Next.js', icon: 'triangle', color: '#FFFFFF' },
  { id: 'tailwind', name: 'Tailwind', icon: 'palette', color: '#06B6D4' },
  { id: 'postgresql', name: 'PostgreSQL', icon: 'database', color: '#336791' },
  { id: 'docker', name: 'Docker', icon: 'container', color: '#2496ED' },
  { id: 'graphql', name: 'GraphQL', icon: 'share-2', color: '#E10098' },
  { id: 'redis', name: 'Redis', icon: 'zap', color: '#DC382D' },
  { id: 'aws', name: 'AWS', icon: 'cloud', color: '#FF9900' },
  { id: 'vue', name: 'Vue.js', icon: 'component', color: '#4FC08D' },
  { id: 'mongodb', name: 'MongoDB', icon: 'leaf', color: '#47A248' },
];
