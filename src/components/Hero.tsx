import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import heroVideo from '../assets/videos/hero.mp4';

interface HeroProps {
  onOpenVisitModal?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {

  return (
    <section id="inicio" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />
        {/* Multi-layered Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/40 to-slate-950" />
      </div>

      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Tagline */}
        <motion.h1
          initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, delay: 4, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-[55px] font-black text-white tracking-tight max-w-4xl leading-tight sm:leading-[1.1]"
        >
          Un espacio distinto, pensado para <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
            reunirse, festejar y relajar
          </span>
        </motion.h1>
      </div>

      {/* Scroll Indicator pinned to bottom */}
      <a
        href="#instalaciones"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 text-slate-400 hover:text-cyan-400 flex flex-col items-center gap-1.5 text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:scale-105"
      >
        <span>Descubrí la quinta</span>
        <ChevronDown className="w-5 h-5 text-cyan-400 animate-bounce" />
      </a>
    </section>
  );
};
