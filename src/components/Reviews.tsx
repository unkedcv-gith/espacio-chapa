import React from 'react';
import { TESTIMONIALS } from '../data/venueData';
import { Star, CheckCircle, MessageSquare } from 'lucide-react';

export const Reviews: React.FC = () => {
  return (
    <section id="opiniones" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Seamless ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-950/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-950/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Opiniones de quienes ya nos conocen</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Familia y amigos que nos eligen
          </h2>

          {/* Rating Badge */}
          <div className="inline-flex items-center justify-center gap-3 p-3 px-5 sm:px-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl mt-2">
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-semibold text-slate-200">
              Calificación en Google
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-6 flex flex-col justify-between shadow-lg transition-all hover:-translate-y-1 duration-300 relative group"
            >
              <div>
                {/* Header with Google Icon and Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span className="text-[11px] font-medium text-slate-400">Reseña en Google</span>
                  </div>
                  <span className="text-[11px] text-slate-500">{t.date}</span>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-0.5 text-yellow-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                  <span className="text-xs font-bold text-white ml-1.5">5.0</span>
                </div>

                {/* Event Type Chip */}
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-800/50 text-[11px] font-semibold mb-3">
                  {t.eventType}
                </span>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/60">
                {t.avatarUrl ? (
                  <img
                    src={t.avatarUrl}
                    alt={t.author}
                    className="w-9 h-9 rounded-full object-cover border border-slate-700"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-300 font-bold text-xs shrink-0">
                    {t.author.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    <span>{t.author}</span>
                    {t.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" title="Usuario de Google verificado" />
                    )}
                  </h4>
                  <p className="text-[10px] text-slate-400">Publicado en Google</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
