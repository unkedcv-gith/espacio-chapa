import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, Instagram } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';

interface NavbarProps {
  onOpenVisitModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenVisitModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Instalaciones', href: '#instalaciones' },
    { label: 'Galería', href: '#galeria' },
    { label: 'Opiniones', href: '#opiniones' },
    { label: 'Disponibilidad & Contacto', href: '#contacto' },
    { label: 'Preguntas Frecuentes', href: '#faqs' },
    { label: 'Ubicación', href: '#ubicacion' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-3.5 transition-all">
      {/* 1. Default top gradient layer (fades out on scroll without snapping) */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent pointer-events-none transition-opacity duration-500 ease-out ${
          scrolled ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* 2. Scrolled dark backdrop with blur (fades in cleanly with no bright border edge) */}
      <div
        className={`absolute inset-0 bg-slate-950/90 backdrop-blur-md border-b border-slate-900/90 shadow-lg shadow-black/25 pointer-events-none transition-opacity duration-500 ease-out ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2 group flex-shrink-0">
            <Logo size="sm" />
          </a>

          {/* Desktop Navigation Links & Instagram */}
          <div className="hidden lg:flex items-center gap-2">
            <nav className="flex items-center justify-center gap-1 xl:gap-2 bg-slate-900/80 border border-slate-800/80 px-3.5 xl:px-5 py-1.5 rounded-full backdrop-blur-md shadow-lg shadow-black/25">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 xl:px-4 py-1.5 text-xs xl:text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                    link.href === '#contacto'
                      ? 'bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 font-semibold border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href={VENUE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-gradient-to-r hover:from-purple-900/40 hover:to-pink-900/40 border border-slate-800/80 hover:border-pink-500/40 text-slate-300 hover:text-pink-300 text-xs font-semibold backdrop-blur-md transition-all shadow-md group/ig cursor-pointer"
              title="Seguinos en Instagram @quintaespaciochapa"
              aria-label="Instagram de Quinta Espacio Chapa"
            >
              <Instagram className="w-4 h-4 text-pink-400 group-hover/ig:scale-110 transition-transform" />
              <span className="hidden xl:inline">Instagram</span>
            </a>
          </div>

          {/* Mobile Menu Button & Instagram Quick Link */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={VENUE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-pink-400 hover:text-pink-300 bg-slate-800/60 hover:bg-slate-800 border border-pink-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-colors"
              aria-label="Instagram"
              title="Instagram @quintaespaciochapa"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-800/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-900/80 bg-slate-950/95 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-base font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-900 rounded-xl transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-slate-500">→</span>
                </a>
              ))}

              <div className="pt-2 mt-1 border-t border-slate-800/80">
                <a
                  href={VENUE_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-gradient-to-r from-purple-950/40 via-pink-950/30 to-amber-950/30 hover:from-purple-900/50 hover:to-pink-900/50 border border-pink-500/30 rounded-xl text-slate-200 hover:text-white flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2.5 font-semibold text-sm">
                    <Instagram className="w-4 h-4 text-pink-400" />
                    <span>Seguinos en Instagram</span>
                  </span>
                  <span className="text-xs font-normal text-pink-400">{VENUE_INFO.instagram}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
