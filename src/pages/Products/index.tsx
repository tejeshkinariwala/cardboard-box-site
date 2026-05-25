import { useState } from 'react';
import { Header, Footer } from '@/components/layout';
import { ProductModal } from './ProductModal';
import { Card } from '@/components/ui';
import { Package, Gift, Cake, Sandwich } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { categories } from '@/data/mock';
import type { Product } from '@/types';

const iconMap: Record<string, typeof Package> = {
  Gift,
  Cake,
  Sandwich,
};

export function Products() {
  const { products, isLoading } = useProducts();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  const handleRequestQuote = (product: Product) => {
    setSelectedProduct(null);
    window.location.href = `/inquiry?product=${encodeURIComponent(product.name)}`;
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
                Product Catalog
              </span>
              <h1 className="mt-4 text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight">
                Packaging for every
                <span className="text-gradient"> occasion</span>
              </h1>
              <p className="mt-6 text-xl text-neutral-600 leading-relaxed">
                Explore our range of food-grade packaging solutions designed for
                Indian sweets, bakeries, and fast food businesses.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 sticky top-20 z-30 bg-neutral-50/80 backdrop-blur-lg border-b border-neutral-200/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all ${
                  activeCategory === null
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : 'glass text-neutral-600 hover:text-neutral-900'
                }`}
              >
                All Products
              </button>

              {categories.map((category) => {
                const Icon = iconMap[category.icon] || Package;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.name)}
                    className={`px-6 py-3 rounded-2xl font-medium transition-all flex items-center gap-2 ${
                      activeCategory === category.name
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                        : 'glass text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full" />
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    variant="solid"
                    hover
                    className="cursor-pointer group overflow-hidden p-0"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="h-48 bg-gradient-to-br from-primary-100 via-primary-50 to-white relative overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Package className="w-20 h-20 text-primary-200 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 text-xs font-semibold bg-white/90 backdrop-blur-sm text-primary-600 rounded-full">
                          {product.category.split(' ')[0]}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-neutral-500 line-clamp-2 mb-3">
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.features.slice(0, 2).map((feature) => (
                          <span
                            key={feature}
                            className="px-2 py-0.5 text-xs bg-neutral-100 text-neutral-600 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                        {product.features.length > 2 && (
                          <span className="px-2 py-0.5 text-xs bg-neutral-100 text-neutral-500 rounded-full">
                            +{product.features.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {!isLoading && filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <Package className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-500">No products found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onRequestQuote={handleRequestQuote}
        />
      )}
    </div>
  );
}
