import React from 'react';
import { VENUE_INFO } from '../data/venueData';
import { Logo } from './Logo';
import { MapPin, Phone, Mail, Instagram, MessageCircle, Heart, Shield, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
  onOpenAdminModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenAdminModal }) => {
  const handleAdminClick = onOpenAdmin || onOpenAdminModal;
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mt-2">
              {VENUE_INFO.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${VENUE_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-emerald-950 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
              <a
                href={VENUE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-pink-950 border border-slate-800 hover:border-pink-500/40 text-slate-300 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={VENUE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 transition-colors"
                aria-label="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#inicio" className="hover:text-cyan-400 transition-colors">Inicio</a></li>
              <li><a href="#diccionario" className="hover:text-cyan-400 transition-colors">Diccionario CHAPA</a></li>
              <li><a href="#instalaciones" className="hover:text-cyan-400 transition-colors">Instalaciones & Pileta</a></li>
              <li><a href="#opiniones" className="hover:text-cyan-400 transition-colors">Opiniones de Clientes</a></li>
              <li><a href="#contacto" className="hover:text-cyan-400 transition-colors">Disponibilidad & Contacto</a></li>
              <li><a href="#faqs" className="hover:text-cyan-400 transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#ubicacion" className="hover:text-cyan-400 transition-colors">Ubicación & Accesos</a></li>
            </ul>
          </div>

          {/* Events */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Servicios
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#eventos" className="hover:text-cyan-400 transition-colors">Fiestas de 15 & Cumpleaños</a></li>
              <li><a href="#eventos" className="hover:text-cyan-400 transition-colors">Casamientos & Bodas</a></li>
              <li><a href="#eventos" className="hover:text-cyan-400 transition-colors">Días de Campo & Pool Day</a></li>
              <li><a href="#eventos" className="hover:text-cyan-400 transition-colors">Eventos Corporativos</a></li>
              <li><a href="#faqs" className="hover:text-cyan-400 transition-colors">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Contacto Directo
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{VENUE_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`https://wa.me/${VENUE_INFO.whatsappNumber}`} className="text-slate-300 hover:text-white">
                  {VENUE_INFO.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-300">{VENUE_INFO.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <a
                  href={VENUE_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-pink-300 transition-colors"
                >
                  {VENUE_INFO.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div className="flex items-center gap-2">
            <p>© {new Date().getFullYear()} {VENUE_INFO.name}. Todos los derechos reservados.</p>
            {/* Discreet admin lock button: subtly blended into the dark footer background */}
            <button
              onClick={handleAdminClick}
              title="Panel de Administración"
              className="text-slate-800 hover:text-cyan-400 transition-colors p-1 rounded-sm focus:outline-none focus:text-cyan-400 cursor-pointer"
              aria-label="Panel de Administración"
            >
              <Lock className="w-2.5 h-2.5 opacity-60 hover:opacity-100" />
            </button>
          </div>
          <p className="flex items-center gap-1">
            <span>Quinta de eventos • Diseñado con</span>
            <Heart className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            <span>para tus mejores momentos</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
