import { Header, Footer } from '@/components/layout';
import { Timeline } from './Timeline';
import { Shield, Leaf, Award, Recycle, CheckCircle } from 'lucide-react';
import { companyInfo } from '@/data/mock';

const certifications = [
  { icon: Shield, title: 'Food Grade', description: 'Safe packaging materials suitable for direct food contact' },
  { icon: Leaf, title: 'FSC Certified', description: 'Responsibly sourced paper from managed forests' },
  { icon: Award, title: 'ISO 9001:2015', description: 'Quality management systems certified' },
  { icon: Recycle, title: '100% Recyclable', description: 'All our products are fully recyclable' },
];

const foodSafeFeatures = [
  'FDA-compliant inks and coatings',
  'Grease and moisture barriers',
  'No harmful chemical migration',
  'Suitable for direct food contact',
  'Temperature resistant materials',
  'Hygienic production environment',
];

export function About() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 right-20 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-primary-300/20 rounded-full blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h1 className="mt-4 text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight">
                40+ years of crafting
                <span className="text-gradient"> perfect packaging</span>
              </h1>
              <p className="mt-6 text-xl text-neutral-600 leading-relaxed">
                Since 1983, {companyInfo.name} has been Nagpur's trusted partner for food packaging.
                From a small workshop to serving 1,000+ businesses across India,
                we've been helping sweet shops and bakeries present their products beautifully.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
                Our Journey
              </span>
              <h2 className="mt-4 text-4xl font-bold text-neutral-900">
                Milestones that define us
              </h2>
            </div>

            <Timeline />
          </div>
        </section>

        {/* Food-Grade Safety Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-50 to-white" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
                  Food Safety First
                </span>
                <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
                  Safe packaging for your
                  <span className="text-gradient"> delicious creations</span>
                </h2>
                <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
                  Every box we produce meets the highest food safety standards.
                  Whether it's ghee-laden ladoos, cream-filled pastries, or hot samosas,
                  our packaging keeps your food safe, fresh, and presentable.
                </p>

                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  {foodSafeFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-500 shrink-0" />
                      <span className="text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="glass rounded-3xl p-8 lg:p-12">
                  <div className="grid grid-cols-2 gap-6">
                    {certifications.map((cert) => (
                      <div key={cert.title} className="text-center">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-500/10 flex items-center justify-center mb-4">
                          <cert.icon className="w-8 h-8 text-primary-600" />
                        </div>
                        <h3 className="font-semibold text-neutral-900 mb-1">{cert.title}</h3>
                        <p className="text-sm text-neutral-500">{cert.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-400/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-300/20 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Eco-Friendly Section */}
        <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">
                Sustainability
              </span>
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold tracking-tight">
                Packaging that's kind to the
                <span className="text-primary-400"> planet</span>
              </h2>
              <p className="mt-6 text-lg text-neutral-400 leading-relaxed">
                We believe great packaging shouldn't cost the earth. That's why we've committed
                to sustainable practices at every step of our production process.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-dark rounded-3xl p-8 text-center">
                <div className="text-5xl font-bold text-primary-400 mb-2">100%</div>
                <div className="text-xl font-semibold mb-2">Recyclable</div>
                <p className="text-neutral-400">All our products can be recycled through standard paper recycling</p>
              </div>

              <div className="glass-dark rounded-3xl p-8 text-center">
                <div className="text-5xl font-bold text-primary-400 mb-2">70%</div>
                <div className="text-xl font-semibold mb-2">Recycled Content</div>
                <p className="text-neutral-400">Our corrugated products use up to 70% post-consumer recycled fiber</p>
              </div>

              <div className="glass-dark rounded-3xl p-8 text-center">
                <div className="text-5xl font-bold text-primary-400 mb-2">Zero</div>
                <div className="text-xl font-semibold mb-2">Plastic Lamination</div>
                <p className="text-neutral-400">We offer biodegradable coating alternatives to plastic lamination</p>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-3xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
                    Visit Us
                  </span>
                  <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-neutral-900">
                    Located in the heart of Nagpur
                  </h2>
                  <p className="mt-4 text-lg text-neutral-600 leading-relaxed">
                    Our facility is conveniently located near ST Stand in New Cotton Market Layout.
                    Visit us to see our production process and discuss your packaging needs in person.
                  </p>
                  <div className="mt-8 space-y-4">
                    <p className="text-neutral-700">
                      <strong>Address:</strong><br />
                      {companyInfo.address}
                    </p>
                    <p className="text-neutral-700">
                      <strong>Phone:</strong><br />
                      {companyInfo.phone} | {companyInfo.landline}
                    </p>
                    <p className="text-neutral-700">
                      <strong>Email:</strong><br />
                      {companyInfo.email}
                    </p>
                  </div>
                </div>
                <div className="h-80 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                  <p className="text-primary-400 text-lg">Map placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
