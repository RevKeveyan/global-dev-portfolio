import { type SupportedLanguage } from '@/i18n';

interface FlagIconProps {
  lang: SupportedLanguage;
  className?: string;
}

const UKFlag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 30" className={className} style={{ display: 'block' }}>
    <defs>
      <clipPath id="uk-flag-clip">
        <rect width="60" height="30" rx="2" />
      </clipPath>
    </defs>
    <g clipPath="url(#uk-flag-clip)">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
      <path d="M0,0 L30,15 M30,15 L60,30" stroke="#C8102E" strokeWidth="2" />
      <path d="M60,0 L30,15 M30,15 L0,30" stroke="#C8102E" strokeWidth="2" />
    </g>
  </svg>
);

const RussiaFlag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 30" className={className} style={{ display: 'block' }}>
    <defs>
      <clipPath id="ru-flag-clip">
        <rect width="60" height="30" rx="2" />
      </clipPath>
    </defs>
    <g clipPath="url(#ru-flag-clip)">
      <rect width="60" height="10" y="0" fill="#fff" />
      <rect width="60" height="10" y="10" fill="#0039A6" />
      <rect width="60" height="10" y="20" fill="#D52B1E" />
    </g>
  </svg>
);

const ArmeniaFlag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 30" className={className} style={{ display: 'block' }}>
    <defs>
      <clipPath id="am-flag-clip">
        <rect width="60" height="30" rx="2" />
      </clipPath>
    </defs>
    <g clipPath="url(#am-flag-clip)">
      <rect width="60" height="10" y="0" fill="#D90012" />
      <rect width="60" height="10" y="10" fill="#0033A0" />
      <rect width="60" height="10" y="20" fill="#F2A800" />
    </g>
  </svg>
);

export const FlagIcon = ({ lang, className = "w-6 h-4" }: FlagIconProps) => {
  const baseClass = `${className} flex-shrink-0`;
  
  switch (lang) {
    case 'en':
      return <UKFlag className={baseClass} />;
    case 'ru':
      return <RussiaFlag className={baseClass} />;
    case 'am':
      return <ArmeniaFlag className={baseClass} />;
    default:
      return null;
  }
};
