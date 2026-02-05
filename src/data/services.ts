export type ServiceCategory = 
  | 'development' 
  | 'design' 
  | 'consulting';

export interface Service {
  id: string;
  labelKey: string;
  category: ServiceCategory;
  icon: string;
  color?: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  'development',
  'design',
  'consulting'
];

export const services: Service[] = [
  // Development
  { id: 'web-apps', labelKey: 'webApps', category: 'development', icon: 'globe', color: '#61DAFB' },
  { id: 'mobile-apps', labelKey: 'mobileApps', category: 'development', icon: 'smartphone', color: '#4FC08D' },
  { id: 'api-development', labelKey: 'apiDevelopment', category: 'development', icon: 'server', color: '#339933' },
  { id: 'ecommerce', labelKey: 'ecommerce', category: 'development', icon: 'shopping-cart', color: '#FF9900' },
  { id: 'saas', labelKey: 'saas', category: 'development', icon: 'cloud', color: '#3178C6' },
  { id: 'cms', labelKey: 'cms', category: 'development', icon: 'layout', color: '#E10098' },

  // Design
  { id: 'ui-design', labelKey: 'uiDesign', category: 'design', icon: 'palette', color: '#F24E1E' },
  { id: 'ux-design', labelKey: 'uxDesign', category: 'design', icon: 'users', color: '#BB4DFF' },
  { id: 'branding', labelKey: 'branding', category: 'design', icon: 'star', color: '#FFD859' },
  { id: 'prototyping', labelKey: 'prototyping', category: 'design', icon: 'figma', color: '#00DC82' },

  // Consulting
  { id: 'tech-consulting', labelKey: 'techConsulting', category: 'consulting', icon: 'lightbulb', color: '#06B6D4' },
  { id: 'code-review', labelKey: 'codeReview', category: 'consulting', icon: 'code', color: '#764ABC' },
  { id: 'architecture', labelKey: 'architecture', category: 'consulting', icon: 'layers', color: '#326CE5' },
  { id: 'seo-optimization', labelKey: 'seoOptimization', category: 'consulting', icon: 'search', color: '#4285F4' },
];

export const getServicesByCategory = (category: ServiceCategory): Service[] => {
  return services.filter(service => service.category === category);
};
