import { Link } from 'react-router-dom';
import { ArrowRight, Gift, Cake, Sandwich } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button, Card } from '@/components/ui';

const categories = [
  {
    id: 'indian-sweets',
    translationKey: 'indianSweets',
    icon: Gift,
    featureKeys: ['foodGrade', 'festiveDesigns', 'customBranding'],
  },
  {
    id: 'cake-bakery',
    translationKey: 'cakeBakery',
    icon: Cake,
    featureKeys: ['windowDisplay', 'stackable', 'greaseProof'],
  },
  {
    id: 'fast-food',
    translationKey: 'fastFood',
    icon: Sandwich,
    featureKeys: ['ecoFriendly', 'greaseProof', 'trendyDesigns'],
  },
];

export function Products() {
  const { t } = useTranslation();

  return (
    <section id="products" className="py-24 lg:py-32 bg-neutral-100/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
              {t('products.sectionLabel')}
            </span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
              {t('products.title')}
            </h2>
            <p className="mt-4 text-lg text-neutral-600 leading-relaxed">
              {t('products.subtitle')}
            </p>
          </div>
          <Link to="/products">
            <Button variant="secondary">
              {t('products.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to="/products">
              <Card
                variant="solid"
                hover
                className="group overflow-hidden h-full"
              >
                <div className="h-40 rounded-2xl bg-gradient-to-br from-primary-100 via-primary-50 to-white flex items-center justify-center mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary-400/10 group-hover:bg-primary-400/20 transition-colors" />
                  <category.icon className="w-16 h-16 text-primary-400 group-hover:scale-110 transition-transform duration-300" />
                </div>

                <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {t(`products.categories.${category.translationKey}.name`)}
                </h3>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  {t(`products.categories.${category.translationKey}.description`)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.featureKeys.map((featureKey) => (
                    <span
                      key={featureKey}
                      className="px-3 py-1 text-xs font-medium bg-primary-50 text-primary-600 rounded-full"
                    >
                      {t(`products.features.${featureKey}`)}
                    </span>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
