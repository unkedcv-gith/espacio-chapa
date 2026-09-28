import React, { useState } from 'react';
import { AMENITIES } from '../data/venueData';
import { Amenity } from '../types';
import { Waves, UtensilsCrossed, Home, Trees, Bath, ShieldCheck, Check, CheckCircle2, X, ChevronRight, Flame, Umbrella, LayoutGrid, Camera } from 'lucide-react';

interface AmenitiesProps {
  onSelectAmenityForQuote?: (amenityId: string) => void;
}

export const Amenities: React.FC<AmenitiesProps> = () => {
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Waves':
        return <Waves className="w-6 h-6 text-cyan-400" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-6 h-6 text-amber-400" />;
      case 'Home':
        return <Home className="w-6 h-6 text-indigo-400" />;
      case 'Trees':
        return <Trees className="w-6 h-6 text-emerald-400" />;
      case 'Bath':
        return <Bath className="w-6 h-6 text-teal-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-teal-400" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-orange-400" />;
      case 'Umbrella':
        return <Umbrella className="w-6 h-6 text-amber-300" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="instalaciones" className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Instalaciones &amp; Comodidades</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Todo pensado para compartir sin vueltas
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Un lugar para reunirse, festejar bien simple y pasar buenos ratos.
          </p>
        </div>

        {/* Grid of Amenities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {AMENITIES.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedAmenity(item)}
              className="group relative bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col h-full cursor-pointer shadow-lg hover:shadow-cyan-950/40 transform hover:-translate-y-1"
            >
              {/* Image Preview Container */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                {item.image ? (
                  <>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-4 border-b border-slate-800/80 group-hover:bg-slate-850 transition-colors">
                    <div className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/80 text-slate-400 mb-2 shadow-inner group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-colors">
                      <Camera className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-medium text-slate-400">
                      Foto próximamente
                    </span>
                  </div>
                )}

                {/* Icon Float */}
                <div className="absolute bottom-3 left-4 p-2.5 rounded-xl bg-slate-950/90 border border-slate-700/80 shadow-md">
                  {getIcon(item.iconName)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-1 min-h-[3.25rem] flex items-center">
                    {item.title}
                  </h3>
                  <p className="text-xs text-cyan-400/90 font-medium mb-2.5 min-h-[1.25rem] flex items-center">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4 min-h-[4.25rem] line-clamp-3">
                    {item.description}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="space-y-2 mb-4">
                    {item.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 mt-auto">
                  <span>Ver detalles completos</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Amenity Detail Modal */}
      {selectedAmenity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95">
            {/* Close Button */}
            <button
              onClick={() => setSelectedAmenity(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-64 w-full bg-slate-950">
              {selectedAmenity.image ? (
                <>
                  <img
                    src={selectedAmenity.image}
                    alt={selectedAmenity.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col items-center justify-center p-6 border-b border-slate-800">
                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-400 mb-2">
                    <Camera className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    Foto próximamente
                  </span>
                </div>
              )}
              <div className="absolute bottom-4 left-6 flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-700 text-cyan-400 shadow-lg">
                  {getIcon(selectedAmenity.iconName)}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">{selectedAmenity.title}</h3>
                  <p className="text-xs text-cyan-400 font-medium">{selectedAmenity.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {selectedAmenity.description}
              </p>

              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Equipamiento & Prestaciones Incluidas
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                {selectedAmenity.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedAmenity(null)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
