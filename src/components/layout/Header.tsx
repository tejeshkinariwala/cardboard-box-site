import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui';
import { Logo } from '@/components/Logo';
import { LanguageToggle } from '@/components/LanguageToggle';

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About Us' },
  { href: '/inquiry', label: 'Contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-2xl glass">
          <div className="flex h-16 items-center justify-between px-6">
            <Link to="/" className="group">
              <Logo size="sm" />
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 font-medium rounded-xl transition-colors ${
                    isActive(link.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <LanguageToggle />
              <Link to="/inquiry">
                <Button size="sm">Get Quote</Button>
              </Link>
            </div>

            <button
              type="button"
              className="md:hidden p-2 rounded-xl hover:bg-neutral-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-neutral-700" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-700" />
              )}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden border-t border-neutral-200/50 px-6 py-4">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-4 py-3 font-medium rounded-xl transition-colors ${
                      isActive(link.href)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 pt-4 border-t border-neutral-200/50 flex flex-col gap-3">
                <div className="flex justify-center">
                  <LanguageToggle />
                </div>
                <Link to="/inquiry" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full justify-center">Get Quote</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
