import React, { useState } from 'react';
import { VENUE_INFO } from '../data/venueData';
import { MapPin, Navigation, Car, Shield, Clock, ExternalLink, Compass, PhoneCall, Copy, Check } from 'lucide-react';

export const LocationMap: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(VENUE_INFO.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleOpenGoogleMaps = () => {
    window.open(VENUE_INFO.googleMapsUrl, '_blank');
  };

  const handleOpenWaze = () => {
    window.open(VENUE_INFO.wazeUrl, '_blank');
  };

  return (
    <section id="ubicacion" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Ubicación Estratégica & Accesos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Cerca de todo, en plena tranquilidad
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Excelente conectividad por autopista y calles totalmente asfaltadas hasta la entrada principal.
          </p>
        </div>

        {/* Map & Location Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Information & Directions Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div>
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3.5 rounded-2xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {VENUE_INFO.name} • Quinta
                  </h3>
                  <p className="text-sm text-slate-300 mb-2">
                    {VENUE_INFO.address}
                  </p>
                  <button
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">¡Dirección copiada al portapapeles!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar dirección</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Route Points */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-white">Accesibilidad Directa</p>
                    <p className="text-xs text-slate-400">
                      Rápido y cómodo acceso desde la bajada Villa Elisa / City Bell de la Autopista Bs. As. - La Plata, o por Camino Centenario y Belgrano.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-white">Estacionamiento Propio & Seguro</p>
                    <p className="text-xs text-slate-400">
                      Capacidad para más de 35 autos dentro del predio privado, portón automatizado y personal de control.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-white">Visitas Guiadas</p>
                    <p className="text-xs text-slate-400">
                      {VENUE_INFO.openingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation CTA Buttons */}
            <div className="pt-6 border-t border-slate-800 space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Abrir en tu app de navegación preferida:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleOpenGoogleMaps}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 hover:border-cyan-500/50 transition-all shadow-md"
                >
                  <Navigation className="w-4 h-4 text-cyan-400" />
                  <span>Google Maps</span>
                </button>

                <button
                  onClick={handleOpenWaze}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 hover:border-cyan-500/50 transition-all shadow-md"
                >
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                  <span>Waze</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Embedded Google Map */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative min-h-[380px] lg:min-h-full">
            <iframe
              title={`Ubicación de ${VENUE_INFO.name} en Google Maps`}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.5030206126444!2d-58.09832892349141!3d-34.89142587285141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2df000e5fb5e9%3A0x66f917287b059eac!2sQuinta%20Espacio%20Chapa!5e0!3m2!1ses-419!2sar!4v1700000000000!5m2!1ses-419!2sar"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
