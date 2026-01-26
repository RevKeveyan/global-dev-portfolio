export interface Stat {
  id: string;
  value: number;
  suffix?: string;
  labelKey: string;
}

export const stats: Stat[] = [
  { id: 'years', value: 8, suffix: '+', labelKey: 'years' },
  { id: 'projects', value: 50, suffix: '+', labelKey: 'projects' },
  { id: 'clients', value: 30, suffix: '+', labelKey: 'clients' },
];
