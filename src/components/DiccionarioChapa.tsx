import React from 'react';
import { Lightbulb, Heart, Laugh, SmilePlus } from 'lucide-react';

export const DiccionarioChapa: React.FC = () => {
  const dictionaryEntries = [
    {
      phrase: 'Nosotros estamos un poco chapa...',
      meaning: 'Porque para crear un lugar tan lindo y relajado, hay que salir de lo común.',
      icon: SmilePlus,
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300',
    },
    {
      phrase: 'Se nos vuelan las chapas de pensar...',
      meaning: 'Pensando en cada detalle para que vos sólo vengas a disfrutar.',
      icon: Lightbulb,
      color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-300',
    },
    {
      phrase: 'Niñas y niños hacen chapa~chapa',
      meaning: 'Tardes de pileta, chapuzones y risas aseguradas bajo el sol.',
      icon: Laugh,
      color: 'from-teal-500/20 to-emerald-500/10 border-teal-500/30 text-teal-300',
    },
    {
      phrase: 'Y si venís, te vas con Chapa y pintura!',
      meaning: 'Salís totalmente renovado, con la energía recargada y mil anécdotas.',
      icon: Heart,
      color: 'from-pink-500/20 to-rose-500/10 border-pink-500/30 text-pink-300',
    },
  ];

  return (
    <section id="diccionario" className="py-28 relative overflow-hidden">
      {/* Background Image clearly visible with seamless blended transitions */}
      <div className="absolute inset-0 z-0">
        <img
          src="/chapa_sola_web.jpg"
          alt="Espacio CHAPA fondo"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
        />
        {/* Balanced ambient tint - leaves the photo clearly visible while supporting text legibility */}
        <div className="absolute inset-0 bg-slate-950/45" />

        {/* Seamless Top Blend: smoothly fades from Hero's deep slate into the photo */}
        <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-slate-950 via-slate-950/75 to-transparent pointer-events-none" />

        {/* Seamless Bottom Blend: smoothly fades into the next section */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent pointer-events-none" />
      </div>

      {/* Subtle ambient lighting accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-bold mb-4 shadow-lg backdrop-blur-md">
            <SmilePlus className="w-3.5 h-3.5 text-cyan-400" />
            <span>Identidad & Buena Onda</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-md">
            ¿Conocés el <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Diccionario CHAPA</span>?
          </h2>

          <p className="text-slate-200 text-base sm:text-lg font-normal leading-relaxed drop-shadow-sm">
            Un espacio distinto, pensado para reunirse, festejar y relajar. Simple, cálido y sin vueltas.
          </p>
        </div>

        {/* Dictionary Cards with refined, lighter translucent styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
          {dictionaryEntries.map((entry, idx) => {
            const Icon = entry.icon;
            return (
              <div
                key={idx}
                className={`p-6 sm:p-7 rounded-3xl bg-slate-950/60 border border-slate-700/50 backdrop-blur-md shadow-xl transition-all hover:scale-[1.02] hover:bg-slate-950/70 hover:border-cyan-500/40 duration-200 group`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-700/60 text-white shrink-0 group-hover:border-cyan-500/40 transition-colors shadow-md">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                      &quot;{entry.phrase}&quot;
                    </h3>
                    <p className="text-sm text-slate-200 leading-relaxed font-normal">
                      {entry.meaning}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Brand Manifesto */}
        <div className="py-8 sm:py-10 text-center relative">
          <div className="max-w-3xl mx-auto space-y-3 relative">
            {/* Seamless organic dark blur glow without any hard edges or cuts */}
            <div className="absolute -inset-x-12 -inset-y-8 bg-slate-950/75 blur-3xl rounded-full -z-10 pointer-events-none" />
            
            <p className="text-xs uppercase tracking-widest text-cyan-400 font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Manifiesto Espacio Chapa
            </p>
            <p className="text-[47px] leading-[47.5px] font-black text-white italic font-[Georgia,serif] [text-shadow:_0_4px_24px_rgb(0_0_0_/_95%),_0_1px_4px_rgb(0_0_0_/_90%)]">
              &quot;Porque en un mundo de locos, sólo los locos estamos cuerdos.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
