import { useTranslation } from 'react-i18next';

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  const toggleLanguage = () => {
    i18n.changeLanguage(isHindi ? 'en' : 'hi');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors text-sm font-medium"
      aria-label={isHindi ? 'Switch to English' : 'Switch to Hindi'}
    >
      <span className={isHindi ? 'text-neutral-400' : 'text-neutral-900'}>EN</span>
      <div className="relative w-10 h-5 rounded-full bg-neutral-300">
        <div
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-primary-500 transition-transform ${
            isHindi ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </div>
      <span className={isHindi ? 'text-neutral-900' : 'text-neutral-400'}>हि</span>
    </button>
  );
}
