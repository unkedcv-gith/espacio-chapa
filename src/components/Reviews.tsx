import React from 'react';
import { TESTIMONIALS, VENUE_INFO } from '../data/venueData';
import { Star, CheckCircle, MessageSquare } from 'lucide-react';

export const Reviews: React.FC = () => {
  return (
    <section id="opiniones" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Seamless ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-950/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-950/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Overall Google Rating */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Opiniones de Quienes Ya Festejaron</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Familias y amigos felices
          </h2>

          {/* Rating Badge */}
          <div className="inline-flex items-center gap-3 p-3 px-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl mt-2">
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400" />
              ))}
            </div>
            <span className="text-xl font-black text-white">{VENUE_INFO.googleRating}</span>
            <span className="text-xs text-slate-400 border-l border-slate-700 pl-3">
              Basado en <strong>+{VENUE_INFO.googleReviewCount} reseñas</strong> en Google Maps
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-6 flex flex-col justify-between shadow-lg transition-all hover:-translate-y-1 duration-300"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-yellow-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500">{t.date}</span>
                </div>

                {/* Event Type Chip */}
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-800/50 text-[11px] font-semibold mb-3">
                  {t.eventType}
                </span>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/60">
                <img
                  src={t.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                  alt={t.author}
                  className="w-9 h-9 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    <span>{t.author}</span>
                    {t.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" title="Reseña verificada" />
                    )}
                  </h4>
                  <p className="text-[10px] text-slate-400">Reseña de Google</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
