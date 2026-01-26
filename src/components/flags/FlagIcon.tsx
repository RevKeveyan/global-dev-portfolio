import { type SupportedLanguage } from '@/i18n';

interface FlagIconProps {
  lang: SupportedLanguage;
  className?: string;
}

const UKFlag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 30" className={className}>
    <clipPath id="uk-clip">
      <rect width="60" height="30" rx="2" />
    </clipPath>
    <g clipPath="url(#uk-clip)">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#uk-center)" />
      <clipPath id="uk-center">
        <polygon points="30,0 30,15 60,15 60,30 30,30 30,15 0,15 0,0" />
      </clipPath>
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

const RussiaFlag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 30" className={className}>
    <clipPath id="ru-clip">
      <rect width="60" height="30" rx="2" />
    </clipPath>
    <g clipPath="url(#ru-clip)">
      <rect width="60" height="10" y="0" fill="#fff" />
      <rect width="60" height="10" y="10" fill="#0039A6" />
      <rect width="60" height="10" y="20" fill="#D52B1E" />
    </g>
  </svg>
);

const ArmeniaFlag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 30" className={className}>
    <clipPath id="am-clip">
      <rect width="60" height="30" rx="2" />
    </clipPath>
    <g clipPath="url(#am-clip)">
      <rect width="60" height="10" y="0" fill="#D90012" />
      <rect width="60" height="10" y="10" fill="#0033A0" />
      <rect width="60" height="10" y="20" fill="#F2A800" />
    </g>
  </svg>
);

export const FlagIcon = ({ lang, className = "w-6 h-4" }: FlagIconProps) => {
  switch (lang) {
    case 'en':
      return <UKFlag className={className} />;
    case 'ru':
      return <RussiaFlag className={className} />;
    case 'am':
      return <ArmeniaFlag className={className} />;
    default:
      return null;
  }
};
