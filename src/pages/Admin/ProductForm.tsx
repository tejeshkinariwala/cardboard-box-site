import { useState, useRef } from 'react';
import { X, Upload, Plus, Trash2 } from 'lucide-react';
import { Button, Input, Textarea } from '@/components/ui';
import { categories } from '@/data/mock';
import type { DbProduct, DbProductInsert } from '@/types/database';

interface ProductFormProps {
  product?: DbProduct | null;
  onSubmit: (data: DbProductInsert, imageFiles?: File[]) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

interface ImageItem {
  url: string;
  file?: File;
  isExisting?: boolean;
}

export function ProductForm({ product, onSubmit, onCancel, isLoading }: ProductFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getInitialImages = (): ImageItem[] => {
    const images: ImageItem[] = [];
    if (product?.image_url) {
      images.push({ url: product.image_url, isExisting: true });
    }
    if (product?.image_urls) {
      product.image_urls.forEach(url => {
        images.push({ url, isExisting: true });
      });
    }
    return images;
  };

  const [images, setImages] = useState<ImageItem[]>(getInitialImages);
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    category: product?.category || categories[0].name,
    features: product?.features?.join(', ') || '',
    dimensions: product?.dimensions || '',
    material: product?.material || '',
    min_order: product?.min_order || '',
    print_options: product?.print_options || '',
    is_active: product?.is_active ?? true,
  });

  const [laminationOptions, setLaminationOptions] = useState<string[]>(
    product?.lamination_options || []
  );

  const allLaminationOptions = [
    { value: 'Reg', label: 'Regular' },
    { value: '1P', label: '1-Side Lamination (1P)' },
    { value: '2P', label: '2-Side Lamination (2P)' },
    { value: 'M-UV', label: 'Matt UV (M-UV)' },
  ];

  const toggleLamination = (value: string) => {
    setLaminationOptions(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, { url: reader.result as string, file }]);
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newFiles = images.filter(img => img.file).map(img => img.file!);
    const existingUrls = images.filter(img => img.isExisting).map(img => img.url);

    const productData: DbProductInsert = {
      name: formData.name,
      description: formData.description || null,
      category: formData.category,
      features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
      dimensions: formData.dimensions || null,
      material: formData.material || null,
      min_order: formData.min_order || null,
      print_options: formData.print_options || null,
      lamination_options: laminationOptions.length > 0 ? laminationOptions : null,
      is_active: formData.is_active,
      image_urls: existingUrls.length > 0 ? existingUrls : null,
    };

    await onSubmit(productData, newFiles.length > 0 ? newFiles : undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={onCancel} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-neutral-100 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <h2 className="text-xl font-bold text-neutral-900">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onCancel}
            className="w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Product Images ({images.length} uploaded)
            </label>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {/* Existing and new images */}
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden border-2 border-neutral-200 group"
                >
                  <img src={image.url} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {index === 0 && (
                    <span className="absolute bottom-1 left-1 px-2 py-0.5 bg-primary-500 text-white text-xs rounded-full">
                      Main
                    </span>
                  )}
                </div>
              ))}

              {/* Add more button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-xl border-2 border-dashed border-neutral-300 hover:border-primary-400 transition-colors flex flex-col items-center justify-center text-neutral-400 hover:text-primary-500"
              >
                <Plus className="w-8 h-8 mb-1" />
                <span className="text-xs font-medium">Add</span>
              </button>
            </div>

            {images.length === 0 && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 h-32 rounded-2xl border-2 border-dashed border-neutral-300 hover:border-primary-400 transition-colors cursor-pointer flex flex-col items-center justify-center text-neutral-400"
              >
                <Upload className="w-8 h-8 mb-2" />
                <p className="font-medium text-sm">Click to upload images</p>
                <p className="text-xs">PNG, JPG up to 5MB each</p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Basic Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Product Name *"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Premium Mithai Box"
              required
            />
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-200 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500"
                required
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the product..."
            rows={3}
          />

          <Input
            label="Features (comma-separated)"
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="Food-grade, Leak-proof, Custom branding"
          />

          {/* Lamination Options */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Lamination Options
            </label>
            <div className="flex flex-wrap gap-3">
              {allLaminationOptions.map(option => (
                <label
                  key={option.value}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 cursor-pointer transition-colors ${
                    laminationOptions.includes(option.value)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={laminationOptions.includes(option.value)}
                    onChange={() => toggleLamination(option.value)}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Dimensions"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              placeholder='e.g., 8" x 6" x 2.5"'
            />
            <Input
              label="Material"
              name="material"
              value={formData.material}
              onChange={handleChange}
              placeholder="e.g., Paperboard 350 GSM"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Minimum Order"
              name="min_order"
              value={formData.min_order}
              onChange={handleChange}
              placeholder="e.g., 500 pieces"
            />
            <Input
              label="Print Options"
              name="print_options"
              value={formData.print_options}
              onChange={handleChange}
              placeholder="e.g., Full color, Foil stamping"
            />
          </div>

          {/* Active Toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="w-5 h-5 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
            />
            <span className="text-neutral-700">Product is active and visible on catalog</span>
          </label>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-neutral-100">
            <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
