import { useState, useEffect } from 'react';
import { Header, Footer } from '@/components/layout';
import { Button, Card, Input, Textarea } from '@/components/ui';
import { MessageCircle, Mail, Send, CheckCircle, ArrowLeft, Phone } from 'lucide-react';
import { submitInquiry } from '@/hooks/useInquiries';
import { companyInfo } from '@/data/mock';

type ContactMethod = 'whatsapp' | 'email' | null;

interface FormData {
  name: string;
  whatsappNumber: string;
  countryCode: string;
  email: string;
  companyName: string;
  requirements: string;
}

export function Inquiry() {
  const [contactMethod, setContactMethod] = useState<ContactMethod>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productInterest, setProductInterest] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    whatsappNumber: '',
    countryCode: '+91',
    email: '',
    companyName: '',
    requirements: '',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const product = params.get('product');
    if (product) {
      setProductInterest(product);
      setFormData(prev => ({
        ...prev,
        requirements: `I'm interested in: ${product}\n\n`,
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateWhatsAppLink = (phone: string, name: string, requirements: string) => {
    const message = encodeURIComponent(
      `Hi! I'm ${name}.\n\n${requirements}\n\nLooking forward to hearing from you!`
    );
    const cleanPhone = phone.replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}?text=${message}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitInquiry({
        contact_method: contactMethod!,
        name: formData.name,
        email: contactMethod === 'email' ? formData.email : null,
        whatsapp_number: contactMethod === 'whatsapp' ? formData.whatsappNumber : null,
        country_code: formData.countryCode,
        company_name: formData.companyName || null,
        requirements: formData.requirements || null,
        product_interest: productInterest || null,
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setContactMethod(null);
    setIsSubmitted(false);
    setFormData({
      name: '',
      whatsappNumber: '',
      countryCode: '+91',
      email: '',
      companyName: '',
      requirements: productInterest ? `I'm interested in: ${productInterest}\n\n` : '',
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
              Get in Touch
            </span>
            <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
              Let's discuss your
              <span className="text-gradient"> packaging needs</span>
            </h1>
            <p className="mt-4 text-lg text-neutral-600">
              Choose your preferred way to connect and we'll get back to you promptly.
            </p>
          </div>

          {/* Form Card */}
          <Card variant="solid" className="p-8 lg:p-12">
            {isSubmitted ? (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-3">
                  {contactMethod === 'whatsapp' ? 'Ready to Chat!' : 'Message Received!'}
                </h2>

                {contactMethod === 'whatsapp' ? (
                  <>
                    <p className="text-neutral-600 mb-6">
                      Click below to start a WhatsApp conversation with us.
                      We've pre-filled your message!
                    </p>
                    <a
                      href={generateWhatsAppLink(
                        companyInfo.whatsapp,
                        formData.name,
                        formData.requirements
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-semibold rounded-2xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Open WhatsApp Chat
                    </a>
                  </>
                ) : (
                  <>
                    <p className="text-neutral-600 mb-6">
                      Thank you, {formData.name}! We'll review your inquiry and
                      get back to you at <strong>{formData.email}</strong> within 24 hours.
                    </p>

                    {/* Inquiry Summary */}
                    <div className="glass rounded-2xl p-6 text-left max-w-md mx-auto mb-6">
                      <h3 className="font-semibold text-neutral-900 mb-4 text-sm uppercase tracking-wider">
                        Inquiry Summary
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Name:</span>
                          <span className="font-medium text-neutral-900">{formData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Company:</span>
                          <span className="font-medium text-neutral-900">{formData.companyName || '—'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Email:</span>
                          <span className="font-medium text-neutral-900">{formData.email}</span>
                        </div>
                        <div className="pt-3 border-t border-neutral-200">
                          <span className="text-neutral-500">Requirements:</span>
                          <p className="mt-1 text-neutral-900 whitespace-pre-wrap">{formData.requirements}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <button
                  onClick={resetForm}
                  className="mt-6 text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 mx-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Submit another inquiry
                </button>
              </div>
            ) : !contactMethod ? (
              /* Step 1: Choose Contact Method */
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 text-center mb-8">
                  How would you like us to contact you?
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setContactMethod('whatsapp')}
                    className="group glass rounded-2xl p-8 text-center hover:ring-2 hover:ring-green-500/50 transition-all hover:-translate-y-1"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 transition-colors">
                      <MessageCircle className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">WhatsApp</h3>
                    <p className="text-sm text-neutral-500">
                      Quick chat for fast responses
                    </p>
                  </button>

                  <button
                    onClick={() => setContactMethod('email')}
                    className="group glass rounded-2xl p-8 text-center hover:ring-2 hover:ring-primary-500/50 transition-all hover:-translate-y-1"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500 transition-colors">
                      <Mail className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">Email</h3>
                    <p className="text-sm text-neutral-500">
                      Detailed inquiry with attachments
                    </p>
                  </button>
                </div>
              </div>
            ) : (
              /* Step 2: Contact Form */
              <div>
                <button
                  onClick={() => setContactMethod(null)}
                  className="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Change contact method
                </button>

                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    contactMethod === 'whatsapp' ? 'bg-green-500' : 'bg-primary-500'
                  }`}>
                    {contactMethod === 'whatsapp' ? (
                      <MessageCircle className="w-6 h-6 text-white" />
                    ) : (
                      <Mail className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-900">
                      {contactMethod === 'whatsapp' ? 'WhatsApp Inquiry' : 'Email Inquiry'}
                    </h2>
                    <p className="text-sm text-neutral-500">
                      {contactMethod === 'whatsapp'
                        ? "We'll open a chat with your details"
                        : "We'll respond to your email within 24 hours"}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Your Name *"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  {contactMethod === 'whatsapp' ? (
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        WhatsApp Number *
                      </label>
                      <div className="flex gap-3">
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          className="w-24 px-3 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-neutral-200 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500"
                        >
                          <option value="+91">+91</option>
                          <option value="+1">+1</option>
                          <option value="+44">+44</option>
                          <option value="+971">+971</option>
                          <option value="+65">+65</option>
                          <option value="+61">+61</option>
                        </select>
                        <Input
                          name="whatsappNumber"
                          type="tel"
                          placeholder="9876543210"
                          value={formData.whatsappNumber}
                          onChange={handleChange}
                          className="flex-1"
                          required
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <Input
                        label="Email Address *"
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        label="Company Name"
                        name="companyName"
                        placeholder="Your company or brand name"
                        value={formData.companyName}
                        onChange={handleChange}
                      />
                    </>
                  )}

                  <Textarea
                    label="Your Requirements *"
                    name="requirements"
                    placeholder="Tell us about the packaging you need - type, quantity, customization, timeline..."
                    rows={5}
                    value={formData.requirements}
                    onChange={handleChange}
                    required
                  />

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      'Submitting...'
                    ) : contactMethod === 'whatsapp' ? (
                      <>
                        <MessageCircle className="w-4 h-4" />
                        Continue to WhatsApp
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Inquiry
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}
          </Card>

          {/* Direct Contact */}
          <div className="mt-12 text-center">
            <p className="text-neutral-500 mb-4">Or reach us directly</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`tel:${companyInfo.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {companyInfo.phone}
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {companyInfo.email}
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
