import { Quote } from 'lucide-react';
import { Card } from '@/components/ui';
import { testimonials } from '@/data/mock';

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="mt-4 text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
            Trusted by industry leaders
          </h2>
          <p className="mt-4 text-lg text-neutral-600 leading-relaxed">
            See what our clients have to say about working with us
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} hover className="relative">
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary-100" />
              <p className="text-neutral-700 leading-relaxed relative z-10">
                "{testimonial.content}"
              </p>
              <div className="mt-6 pt-6 border-t border-neutral-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
                  {testimonial.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-neutral-500">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
