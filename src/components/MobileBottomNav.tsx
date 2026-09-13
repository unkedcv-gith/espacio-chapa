import React, { useState, useEffect } from 'react';
import { Home, Palmtree, Calendar, MessageCircle, MapPin } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';

interface MobileBottomNavProps {
  onOpenVisitModal?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = () => {
  const [activeSection, setActiveSection] = useState<'inicio' | 'instalaciones' | 'contacto' | 'ubicacion'>('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = ['inicio', 'instalaciones', 'contacto', 'ubicacion'] as const;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(VENUE_INFO.whatsappDefaultMessage);
    window.open(`https://wa.me/${VENUE_INFO.whatsappNumber}?text=${message}`, '_blank');
  };

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home, href: '#inicio' },
    { id: 'instalaciones', label: 'Espacios', icon: Palmtree, href: '#instalaciones' },
    { id: 'contacto', label: 'Fechas', icon: Calendar, href: '#contacto' },
    { id: 'ubicacion', label: 'Mapa', icon: MapPin, href: '#ubicacion' },
  ] as const;

  return (
    <nav
      aria-label="Navegación móvil"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl shadow-black/80"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Nav Item 1: Inicio */}
        <a
          href="#inicio"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all active:scale-95 ${
            activeSection === 'inicio'
              ? 'text-cyan-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className={`w-5 h-5 mb-0.5 ${activeSection === 'inicio' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight">Inicio</span>
        </a>

        {/* Nav Item 2: Espacios */}
        <a
          href="#instalaciones"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all active:scale-95 ${
            activeSection === 'instalaciones'
              ? 'text-cyan-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palmtree className={`w-5 h-5 mb-0.5 ${activeSection === 'instalaciones' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight">Espacios</span>
        </a>

        {/* Center Highlight: WhatsApp Action Button */}
        <button
          type="button"
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center -mt-4 group active:scale-90 transition-transform cursor-pointer"
          aria-label="Abrir WhatsApp directo"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-950/80 border-2 border-slate-950 group-hover:scale-105 transition-transform">
            <MessageCircle className="w-6 h-6 fill-white stroke-none" />
          </div>
          <span className="text-[10px] font-bold text-emerald-400 mt-0.5 tracking-tight">WhatsApp</span>
        </button>

        {/* Nav Item 3: Fechas */}
        <a
          href="#contacto"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all active:scale-95 ${
            activeSection === 'contacto'
              ? 'text-cyan-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className={`w-5 h-5 mb-0.5 ${activeSection === 'contacto' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight">Fechas</span>
        </a>

        {/* Nav Item 4: Mapa */}
        <a
          href="#ubicacion"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all active:scale-95 ${
            activeSection === 'ubicacion'
              ? 'text-cyan-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MapPin className={`w-5 h-5 mb-0.5 ${activeSection === 'ubicacion' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight">Cómo llegar</span>
        </a>
      </div>
    </nav>
  );
};
