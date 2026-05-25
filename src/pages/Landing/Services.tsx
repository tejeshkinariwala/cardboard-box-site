import { Palette, Sparkles, Leaf, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui';

const services = [
  { id: '1', icon: Palette, translationKey: 'customDesign' },
  { id: '2', icon: Sparkles, translationKey: 'festiveCollections' },
  { id: '3', icon: Leaf, translationKey: 'sustainableSolutions' },
  { id: '4', icon: Package, translationKey: 'bulkOrders' },
];

export function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
            {t('services.sectionLabel')}
          </span>
          <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
            {t('services.title')}
          </h2>
          <p className="mt-4 text-lg text-neutral-600 leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.id} hover className="group">
                <div className="w-14 h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-primary-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {t(`services.${service.translationKey}.title`)}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {t(`services.${service.translationKey}.description`)}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
