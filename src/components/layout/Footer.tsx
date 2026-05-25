import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { companyInfo } from '@/data/mock';

const footerLinks = {
  Products: [
    { label: 'Indian Sweet Boxes', href: '/products' },
    { label: 'Cake & Bakery', href: '/products' },
    { label: 'Fast Food Packaging', href: '/products' },
    { label: 'Custom Orders', href: '/inquiry' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Story', href: '/about' },
    { label: 'Sustainability', href: '/about' },
    { label: 'Certifications', href: '/about' },
  ],
  Support: [
    { label: 'Contact Us', href: '/inquiry' },
    { label: 'Request Quote', href: '/inquiry' },
    { label: 'FAQ', href: '/inquiry' },
    { label: 'Shipping Info', href: '/inquiry' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2">
            <Link to="/">
              <div className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="Paper Crafts"
                  className="w-11 h-11 object-contain rounded-lg"
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-xl font-display text-white tracking-wide">
                    PAPER CRAFTS
                  </span>
                  <span className="text-[10px] font-semibold text-primary-400 uppercase tracking-widest">
                    For Sweet & Bakery Boxes
                  </span>
                </div>
              </div>
            </Link>
            <p className="mt-4 text-neutral-400 max-w-xs leading-relaxed">
              {companyInfo.description}
            </p>
            <div className="mt-6 space-y-3">
              <a
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                {companyInfo.email}
              </a>
              <a
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                {companyInfo.phone} | {companyInfo.landline}
              </a>
              <p className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                {companyInfo.address}
              </p>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="text-sm text-neutral-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="text-sm text-neutral-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
            {/* Hidden Staff Portal Link */}
            <Link
              to="/admin/login"
              className="text-sm text-neutral-700 hover:text-neutral-500 transition-colors"
              title="Staff Portal"
            >
              •
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
