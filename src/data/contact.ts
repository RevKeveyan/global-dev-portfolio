import { LucideIcon, Mail, Linkedin, Github, Send } from 'lucide-react';

export interface ContactLink {
  id: string;
  labelKey: string;
  url: string;
  icon: LucideIcon;
}

export const contactLinks: ContactLink[] = [
  {
    id: 'email',
    labelKey: 'email',
    url: 'mailto:hello@example.com',
    icon: Mail
  },
  {
    id: 'linkedin',
    labelKey: 'linkedin',
    url: 'https://linkedin.com/in/username',
    icon: Linkedin
  },
  {
    id: 'github',
    labelKey: 'github',
    url: 'https://github.com/username',
    icon: Github
  },
  {
    id: 'telegram',
    labelKey: 'telegram',
    url: 'https://t.me/username',
    icon: Send
  }
];
