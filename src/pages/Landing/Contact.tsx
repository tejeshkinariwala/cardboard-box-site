import { Link } from 'react-router-dom';
import { MessageCircle, Mail, ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui';
import { companyInfo } from '@/data/mock';

export function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-neutral-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary-400/15 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">
            Get Started
          </span>
          <h2 className="mt-4 text-4xl lg:text-5xl font-bold tracking-tight">
            Ready to elevate your
            <span className="text-primary-400"> packaging?</span>
          </h2>
          <p className="mt-6 text-lg text-neutral-400 leading-relaxed">
            Choose your preferred way to connect. We'll get back to you within 24 hours
            with custom solutions tailored to your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link
            to="/inquiry"
            className="group glass-dark rounded-3xl p-8 text-center hover:ring-2 hover:ring-green-500/50 transition-all hover:-translate-y-1"
          >
            <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 transition-colors">
              <MessageCircle className="w-8 h-8 text-green-400 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
            <p className="text-neutral-400 text-sm">
              Quick chat for fast responses
            </p>
          </Link>

          <Link
            to="/inquiry"
            className="group glass-dark rounded-3xl p-8 text-center hover:ring-2 hover:ring-primary-500/50 transition-all hover:-translate-y-1"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500 transition-colors">
              <Mail className="w-8 h-8 text-primary-400 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-neutral-400 text-sm">
              Detailed inquiry with attachments
            </p>
          </Link>

          <a
            href={`tel:${companyInfo.phone}`}
            className="group glass-dark rounded-3xl p-8 text-center hover:ring-2 hover:ring-blue-500/50 transition-all hover:-translate-y-1"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-colors">
              <Phone className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-neutral-400 text-sm">
              {companyInfo.phone}
            </p>
          </a>
        </div>

        <div className="text-center mt-12">
          <Link to="/inquiry">
            <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100">
              Start Your Inquiry
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
