import { useState, useEffect } from 'react';
import { Moon, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Главная', href: '#hero' },
  { label: 'О проекте', href: '#about' },
  { label: 'Дорожная карта', href: '#roadmap' },
  { label: 'Особенности', href: '#features' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-lg bg-black/40 border-b border-purple-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      }`}
      data-testid="header"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-3 group"
            data-testid="link-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-shadow">
              <Moon className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold uppercase tracking-wider text-white">
              Night Word
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-4 py-2 text-sm font-medium text-purple-200 hover:text-white transition-colors rounded-lg hover:bg-purple-500/10"
                data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              className="border-purple-500/30 text-purple-200 hover:bg-purple-500/20 hover:text-white hover:border-purple-500/50"
              data-testid="button-login"
            >
              <span className="text-sm">Войти</span>
            </Button>
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
              data-testid="button-register"
            >
              <span className="font-display text-sm uppercase tracking-wide">Начать</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-purple-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden backdrop-blur-xl bg-black/80 border-t border-purple-500/20">
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="block px-4 py-3 text-sm font-medium text-purple-200 hover:text-white transition-colors rounded-lg hover:bg-purple-500/10"
                data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              <Button
                variant="outline"
                className="w-full border-purple-500/30 text-purple-200"
                data-testid="button-mobile-login"
              >
                Войти
              </Button>
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                data-testid="button-mobile-register"
              >
                <span className="font-display uppercase tracking-wide">Начать</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
