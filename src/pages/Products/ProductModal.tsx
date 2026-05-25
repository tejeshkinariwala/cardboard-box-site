import { useState } from 'react';
import { X, Package, Ruler, Layers, ShoppingBag, Palette, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui';
import type { Product } from '@/types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onRequestQuote: (product: Product) => void;
}

export function ProductModal({ product, onClose, onRequestQuote }: ProductModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = product.images.length > 0 ? product.images : (product.image ? [product.image] : []);
  const hasMultipleImages = images.length > 1;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-white rounded-3xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-white transition-all shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image Carousel Section */}
          <div className="relative h-64 md:h-auto md:min-h-[500px] bg-gradient-to-br from-primary-100 via-primary-50 to-white">
            {images.length > 0 ? (
              <>
                <img
                  src={images[currentIndex]}
                  alt={`${product.name} - Design ${currentIndex + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-white transition-all shadow-lg"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-white transition-all shadow-lg"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Dots Indicator */}
                {hasMultipleImages && (
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          index === currentIndex
                            ? 'bg-white w-6'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Image Counter */}
                {hasMultipleImages && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium">
                    {currentIndex + 1} / {images.length}
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-400/20 rounded-full blur-3xl scale-150" />
                  <Package className="relative w-32 h-32 md:w-48 md:h-48 text-primary-300" />
                </div>
              </div>
            )}

            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-white/90 backdrop-blur-sm text-primary-600 rounded-full">
                {product.category}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
              {product.name}
            </h2>

            <p className="text-neutral-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Features */}
            {product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                  Features
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1.5 text-sm bg-primary-50 text-primary-700 rounded-full font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Lamination Options */}
            {product.laminationOptions && product.laminationOptions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                  Lamination Options
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.laminationOptions.map((option) => (
                    <span
                      key={option}
                      className="px-3 py-1.5 text-sm bg-accent-50 text-accent-700 rounded-full font-medium border border-accent-200"
                    >
                      {option === 'Reg' ? 'Regular' : option === '1P' ? '1-Side Lamination' : option === '2P' ? '2-Side Lamination' : option === 'M-UV' ? 'Matt UV' : option}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications */}
            {product.specs && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-2 text-neutral-500 mb-1">
                      <Ruler className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase">Dimensions</span>
                    </div>
                    <p className="text-neutral-900 font-semibold">{product.specs.dimensions}</p>
                  </div>

                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-2 text-neutral-500 mb-1">
                      <Layers className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase">Material</span>
                    </div>
                    <p className="text-neutral-900 font-semibold text-sm">{product.specs.material}</p>
                  </div>

                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-2 text-neutral-500 mb-1">
                      <ShoppingBag className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase">Min. Order</span>
                    </div>
                    <p className="text-neutral-900 font-semibold">{product.specs.minOrder}</p>
                  </div>

                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-2 text-neutral-500 mb-1">
                      <Palette className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase">Printing</span>
                    </div>
                    <p className="text-neutral-900 font-semibold text-sm">{product.specs.printOptions}</p>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => onRequestQuote(product)}
                className="flex-1"
              >
                <MessageCircle className="w-4 h-4" />
                Request Quote
              </Button>
              <Button variant="secondary" onClick={onClose}>
                Continue Browsing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
