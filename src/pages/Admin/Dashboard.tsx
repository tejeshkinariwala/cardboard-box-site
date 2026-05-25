import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package, MessageSquare, Plus, Edit, Trash2, LogOut,
  Eye, EyeOff, ExternalLink, ChevronRight, AlertCircle
} from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { ProductForm } from './ProductForm';
import { useAuth } from '@/hooks/useAuth';
import { useProductsAdmin } from '@/hooks/useProducts';
import { useInquiries } from '@/hooks/useInquiries';
import { isSupabaseConfigured } from '@/lib/supabase';
import { companyInfo } from '@/data/mock';
import type { DbProduct, DbProductInsert } from '@/types/database';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { signOut, isAdmin, isLoading: authLoading } = useAuth();
  const { products, isLoading, addProduct, updateProduct, deleteProduct, uploadImage, refetch } = useProductsAdmin();
  const { inquiries } = useInquiries();

  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<DbProduct | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'inquiries'>('products');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAdmin && isSupabaseConfigured()) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const handleProductSubmit = async (data: DbProductInsert, imageFiles?: File[]) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const uploadedUrls: string[] = [];

      if (imageFiles && imageFiles.length > 0) {
        for (const file of imageFiles) {
          const { url, error: uploadError } = await uploadImage(file);
          if (uploadError) {
            console.error('Image upload error:', uploadError);
            setErrorMessage(`Image upload failed: ${uploadError.message}`);
            setIsSubmitting(false);
            return;
          }
          if (url) uploadedUrls.push(url);
        }
      }

      const existingUrls = data.image_urls || [];
      const allUrls = [...existingUrls, ...uploadedUrls];

      const productData = {
        ...data,
        image_url: allUrls[0] || null,
        image_urls: allUrls.length > 1 ? allUrls.slice(1) : null,
      };

      if (editingProduct) {
        const { error } = await updateProduct(editingProduct.id, productData);
        if (error) {
          console.error('Update error:', error);
          setErrorMessage(`Failed to update product: ${error.message}`);
          setIsSubmitting(false);
          return;
        }
      } else {
        const { error } = await addProduct(productData);
        if (error) {
          console.error('Add error:', error);
          setErrorMessage(`Failed to add product: ${error.message}`);
          setIsSubmitting(false);
          return;
        }
      }

      setShowProductForm(false);
      setEditingProduct(null);
      refetch();
    } catch (error) {
      console.error('Error saving product:', error);
      setErrorMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const { error } = await deleteProduct(id);
    if (error) {
      setErrorMessage(`Failed to delete: ${error.message}`);
    }
  };

  const handleToggleActive = async (product: DbProduct) => {
    const { error } = await updateProduct(product.id, { is_active: !product.is_active });
    if (error) {
      setErrorMessage(`Failed to update: ${error.message}`);
    }
  };

  const newInquiriesCount = inquiries.filter(i => i.status === 'new').length;

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg object-contain" />
                <span className="font-bold text-neutral-900">{companyInfo.name}</span>
              </Link>
              <span className="text-neutral-300">|</span>
              <span className="text-sm font-medium text-neutral-600">Admin Dashboard</span>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/" target="_blank" className="text-sm text-neutral-600 hover:text-primary-600 flex items-center gap-1">
                View Site <ExternalLink className="w-3 h-3" />
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-800">{errorMessage}</p>
            </div>
            <button onClick={() => setErrorMessage(null)} className="text-red-600 hover:text-red-800">
              ×
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <Card variant="solid" className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <Package className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-neutral-900">{products.length}</p>
                <p className="text-sm text-neutral-500">Total Products</p>
              </div>
            </div>
          </Card>

          <Card variant="solid" className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-neutral-900">
                  {products.filter(p => p.is_active).length}
                </p>
                <p className="text-sm text-neutral-500">Active Products</p>
              </div>
            </div>
          </Card>

          <Card variant="solid" className="p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${newInquiriesCount > 0 ? 'bg-accent-100' : 'bg-neutral-100'}`}>
                <MessageSquare className={`w-6 h-6 ${newInquiriesCount > 0 ? 'text-accent-600' : 'text-neutral-600'}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-neutral-900">{newInquiriesCount}</p>
                <p className="text-sm text-neutral-500">New Inquiries</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              activeTab === 'products'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            Inquiries
            {newInquiriesCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-accent-500 text-white text-xs flex items-center justify-center">
                {newInquiriesCount}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'products' ? (
          <>
            {/* Products Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900">Manage Products</h2>
              <Button onClick={() => { setEditingProduct(null); setShowProductForm(true); setErrorMessage(null); }}>
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </div>

            {/* Products List */}
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto" />
              </div>
            ) : products.length === 0 ? (
              <Card variant="solid" className="p-12 text-center">
                <Package className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-500 mb-4">No products yet. Add your first product!</p>
                <Button onClick={() => { setEditingProduct(null); setShowProductForm(true); }}>
                  <Plus className="w-4 h-4" />
                  Add Product
                </Button>
              </Card>
            ) : (
              <div className="grid gap-4">
                {products.map(product => (
                  <Card key={product.id} variant="solid" className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Image */}
                      <div className="w-20 h-20 rounded-xl bg-neutral-100 overflow-hidden shrink-0">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-8 h-8 text-neutral-300" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-neutral-900 truncate">{product.name}</h3>
                          {!product.is_active && (
                            <span className="px-2 py-0.5 bg-neutral-200 text-neutral-600 text-xs rounded-full">
                              Hidden
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutral-500 truncate">{product.category}</p>
                        {product.dimensions && (
                          <p className="text-xs text-neutral-400 mt-1">{product.dimensions}</p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleActive(product)}
                          className={`p-2 rounded-lg transition-colors ${
                            product.is_active
                              ? 'text-green-600 hover:bg-green-50'
                              : 'text-neutral-400 hover:bg-neutral-100'
                          }`}
                          title={product.is_active ? 'Hide product' : 'Show product'}
                        >
                          {product.is_active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setShowProductForm(true);
                            setErrorMessage(null);
                          }}
                          className="p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        ) : (
          /* Inquiries Tab */
          <>
            <h2 className="text-xl font-bold text-neutral-900 mb-6">Customer Inquiries</h2>

            {inquiries.length === 0 ? (
              <Card variant="solid" className="p-12 text-center">
                <MessageSquare className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-500">No inquiries yet.</p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {inquiries.map(inquiry => (
                  <Card key={inquiry.id} variant="solid" className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-neutral-900">{inquiry.name}</h3>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            inquiry.status === 'new' ? 'bg-accent-100 text-accent-700' :
                            inquiry.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                            inquiry.status === 'quoted' ? 'bg-amber-100 text-amber-700' :
                            inquiry.status === 'converted' ? 'bg-green-100 text-green-700' :
                            'bg-neutral-100 text-neutral-700'
                          }`}>
                            {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                          </span>
                        </div>
                        <div className="text-sm text-neutral-500 space-y-1">
                          {inquiry.contact_method === 'whatsapp' ? (
                            <p>WhatsApp: {inquiry.country_code} {inquiry.whatsapp_number}</p>
                          ) : (
                            <>
                              <p>Email: {inquiry.email}</p>
                              {inquiry.company_name && <p>Company: {inquiry.company_name}</p>}
                            </>
                          )}
                        </div>
                        {inquiry.requirements && (
                          <p className="mt-3 text-sm text-neutral-700 bg-neutral-50 rounded-lg p-3">
                            {inquiry.requirements}
                          </p>
                        )}
                        <p className="text-xs text-neutral-400 mt-2">
                          {new Date(inquiry.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>

                      {inquiry.contact_method === 'whatsapp' && inquiry.whatsapp_number && (
                        <a
                          href={`https://wa.me/${inquiry.country_code?.replace('+', '')}${inquiry.whatsapp_number}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
                        >
                          Chat <ChevronRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Product Form Modal */}
      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleProductSubmit}
          onCancel={() => {
            setShowProductForm(false);
            setEditingProduct(null);
            setErrorMessage(null);
          }}
          isLoading={isSubmitting}
        />
      )}
    </div>
  );
}
