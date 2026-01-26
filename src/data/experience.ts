export interface ExperienceItem {
  id: string;
  companyKey: string;
  roleKey: string;
  periodKey: string;
  bulletsKey: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: 'senior-dev',
    companyKey: 'techCorp',
    roleKey: 'seniorDev',
    periodKey: 'techCorp',
    bulletsKey: ['techCorp.bullet1', 'techCorp.bullet2', 'techCorp.bullet3']
  },
  {
    id: 'fullstack-dev',
    companyKey: 'startupInc',
    roleKey: 'fullstackDev',
    periodKey: 'startupInc',
    bulletsKey: ['startupInc.bullet1', 'startupInc.bullet2', 'startupInc.bullet3']
  },
  {
    id: 'frontend-dev',
    companyKey: 'agencyPro',
    roleKey: 'frontendDev',
    periodKey: 'agencyPro',
    bulletsKey: ['agencyPro.bullet1', 'agencyPro.bullet2']
  }
];
