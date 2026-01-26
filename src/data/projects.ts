export interface ProjectLink {
  type: 'live' | 'github' | 'case-study';
  url: string;
}

export interface Project {
  id: string;
  titleKey: string;
  descKey: string;
  stack: string[];
  roleKey: string;
  year: number;
  links: ProjectLink[];
  image?: string;
  caseStudy: {
    problemKey: string;
    solutionKey: string;
    resultKey: string;
    screenshots: string[];
    ownedKey: string[];
  };
}

export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    titleKey: 'ecommerce',
    descKey: 'ecommerce',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    roleKey: 'ecommerce',
    year: 2024,
    links: [
      { type: 'live', url: 'https://example.com' },
      { type: 'github', url: 'https://github.com' }
    ],
    caseStudy: {
      problemKey: 'ecommerce',
      solutionKey: 'ecommerce',
      resultKey: 'ecommerce',
      screenshots: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      ownedKey: ['ecommerce.owned1', 'ecommerce.owned2', 'ecommerce.owned3']
    }
  },
  {
    id: 'analytics-dashboard',
    titleKey: 'analytics',
    descKey: 'analytics',
    stack: ['Vue.js', 'Nuxt', 'D3.js', 'GraphQL', 'MongoDB'],
    roleKey: 'analytics',
    year: 2023,
    links: [
      { type: 'live', url: 'https://example.com' }
    ],
    caseStudy: {
      problemKey: 'analytics',
      solutionKey: 'analytics',
      resultKey: 'analytics',
      screenshots: ['/placeholder.svg', '/placeholder.svg'],
      ownedKey: ['analytics.owned1', 'analytics.owned2']
    }
  },
  {
    id: 'mobile-app',
    titleKey: 'mobileApp',
    descKey: 'mobileApp',
    stack: ['React Native', 'TypeScript', 'Firebase', 'Redux'],
    roleKey: 'mobileApp',
    year: 2023,
    links: [
      { type: 'github', url: 'https://github.com' }
    ],
    caseStudy: {
      problemKey: 'mobileApp',
      solutionKey: 'mobileApp',
      resultKey: 'mobileApp',
      screenshots: ['/placeholder.svg', '/placeholder.svg'],
      ownedKey: ['mobileApp.owned1', 'mobileApp.owned2']
    }
  }
];
