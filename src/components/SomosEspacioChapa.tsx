import React from 'react';
import { SmilePlus } from 'lucide-react';

export const SomosEspacioChapa: React.FC = () => {
  return (
    <section id="identidad" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Invisible anchor target for backwards compatibility with any existing link */}
      <span id="diccionario" className="absolute -top-24 left-0 block h-0 w-0 pointer-events-none" />

      {/* Background Image with seamless blended transitions */}
      <div className="absolute inset-0 z-0">
        <img
          src="/chapa_sola_web.jpg"
          alt="Espacio CHAPA fondo"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
        />
        {/* Ambient tint overlay for text legibility */}
        <div className="absolute inset-0 bg-slate-950/50" />

        {/* Seamless Top Blend: smoothly fades from Hero's deep slate into the photo */}
        <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-slate-950 via-slate-950/75 to-transparent pointer-events-none" />

        {/* Seamless Bottom Blend: smoothly fades into the next section */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent pointer-events-none" />
      </div>

      {/* Ambient lighting accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge: Identidad y buena onda */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-bold mb-6 sm:mb-8 shadow-xl backdrop-blur-md">
          <SmilePlus className="w-4 h-4 text-cyan-400" />
          <span>Identidad &amp; Buena Onda</span>
        </div>

        {/* Título: Somos Espacio Chapa */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-xl">
          Somos{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
            Espacio Chapa
          </span>
        </h2>

        {/* Bajada */}
        <p className="text-slate-100 text-lg sm:text-xl md:text-2xl font-normal leading-relaxed max-w-3xl mx-auto mb-14 sm:mb-18 drop-shadow-md">
          Un lugar distinto, pensado para reunirse, festejar y relajar.
          <br />
          Simple y cálido.
        </p>

        {/* Frase destacada sin recuadro contenedor */}
        <div className="relative max-w-4xl mx-auto pt-2 pb-4">
          {/* Seamless organic dark blur glow without any hard edges or cuts */}
          <div className="absolute -inset-x-12 -inset-y-8 bg-slate-950/75 blur-3xl rounded-full -z-10 pointer-events-none" />

          <p className="text-2xl sm:text-4xl md:text-5xl lg:text-[46px] leading-tight sm:leading-snug md:leading-[1.25] font-black text-white italic font-[Georgia,serif] [text-shadow:_0_4px_24px_rgb(0_0_0_/_95%),_0_1px_4px_rgb(0_0_0_/_90%)]">
            &ldquo;Porque en un mundo de locos, sólo los locos estamos cuerdos&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
};

// Compatibility export
export const DiccionarioChapa = SomosEspacioChapa;
