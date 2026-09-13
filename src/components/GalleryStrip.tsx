import React, { useState, useEffect, useCallback } from 'react';
import { Camera, ZoomIn, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  tag: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    src: '/galeria1.jpeg',
    alt: 'Parque y naturaleza en Espacio Chapu',
    title: 'Parque & Arboleda',
    tag: 'Aire Libre',
  },
  {
    id: 'gal-2',
    src: '/galeria2.jpeg',
    alt: 'Instalaciones y sector de mesas',
    title: 'Espacios para Compartir',
    tag: 'Encuentros',
  },
  {
    id: 'gal-3',
    src: '/galeria3.jpeg',
    alt: 'Áreas verdes y relax',
    title: 'Rincón de Relax',
    tag: 'Naturaleza',
  },
  {
    id: 'gal-4',
    src: '/galeria4.jpeg',
    alt: 'Sector de festejo y comodidades',
    title: 'Armado para Festejos',
    tag: 'Celebraciones',
  },
  {
    id: 'gal-5',
    src: '/galeria5.jpg',
    alt: 'Piscina y solarium al aire libre',
    title: 'Pileta & Solarium',
    tag: 'Verano',
  },
  {
    id: 'gal-6',
    src: '/galeria6.jpg',
    alt: 'Detalles del predio y parque',
    title: 'Vistas del Predio',
    tag: 'Tranquilidad',
  },
  {
    id: 'gal-7',
    src: '/galeria7.jpg',
    alt: 'Iluminación y ambiente de noche en la quinta',
    title: 'Noches Mágicas',
    tag: 'Nocturno',
  },
  {
    id: 'gal-8',
    src: '/galeria8.jpg',
    alt: 'Festejos familiares y amigos',
    title: 'Momentos Inolvidables',
    tag: 'Eventos',
  },
  {
    id: 'gal-9',
    src: '/galeria9.jpg',
    alt: 'Atardecer en el parque',
    title: 'Atardeceres Únicos',
    tag: 'Experiencia',
  },
];

export const GalleryStrip: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Keyboard navigation for the lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;

      if (e.key === 'Escape') {
        setActivePhotoIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) =>
          prev !== null ? (prev === 0 ? GALLERY_PHOTOS.length - 1 : prev - 1) : null
        );
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) =>
          prev !== null ? (prev === GALLERY_PHOTOS.length - 1 ? 0 : prev + 1) : null
        );
      }
    },
    [activePhotoIndex]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activePhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activePhotoIndex]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) =>
      prev !== null ? (prev === 0 ? GALLERY_PHOTOS.length - 1 : prev - 1) : null
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) =>
      prev !== null ? (prev === GALLERY_PHOTOS.length - 1 ? 0 : prev + 1) : null
    );
  };

  // We duplicate the photos array so that translateX(-50%) produces a seamless infinite scroll loop
  const loopPhotos = [...GALLERY_PHOTOS, ...GALLERY_PHOTOS];

  return (
    <section
      id="galeria"
      className="py-24 sm:py-32 relative overflow-hidden"
    >
      {/* Background Image identical to Diccionario Chapa with deep seamless blended fades */}
      <div className="absolute inset-0 z-0">
        <img
          src="/chapa_sola_web.jpg"
          alt="Espacio CHAPA fondo"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
        />
        {/* Balanced ambient tint - leaves the photo clearly visible while supporting text and card contrast */}
        <div className="absolute inset-0 bg-slate-950/50" />

        {/* Seamless Top Blend: smoothly fades from previous section into the photo */}
        <div className="absolute top-0 inset-x-0 h-48 sm:h-56 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />

        {/* Seamless Bottom Blend: smoothly fades into the next section */}
        <div className="absolute bottom-0 inset-x-0 h-48 sm:h-56 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
      </div>

      {/* Subtle ambient lighting accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Header bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-2.5 backdrop-blur-md shadow-lg">
          <Camera className="w-3.5 h-3.5 text-cyan-400" />
          <span>Galería de Momentos</span>
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Vení a vivirlo en fotos
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed drop-shadow-sm">
          Paseá por las postales de nuestro predio. Posate sobre cualquier foto o hacé clic para verla en pantalla completa.
        </p>
      </div>

      {/* Carousel Track Container */}
      <div
        className="group-marquee relative z-10 w-full overflow-hidden py-4 select-none cursor-pointer"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left and Right Gradient Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-10" />

        {/* Marquee Motion Strip */}
        <div
          className="animate-marquee-strip flex items-center gap-4 sm:gap-6 pl-4"
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {loopPhotos.map((photo, index) => {
            const originalIndex = index % GALLERY_PHOTOS.length;
            return (
              <div
                key={`${photo.id}-${index}`}
                onClick={() => setActivePhotoIndex(originalIndex)}
                className="group/card relative w-64 sm:w-80 md:w-96 h-44 sm:h-56 md:h-64 flex-shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl transition-all duration-300 hover:scale-[1.04] hover:-translate-y-1.5 hover:border-cyan-400/80 hover:shadow-2xl hover:shadow-cyan-950/50 cursor-pointer"
              >
                {/* Photo Image with smooth hover scale */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover/card:scale-110"
                />

                {/* Ambient vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity" />

                {/* Top Category Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-[10px] sm:text-xs font-semibold text-slate-200 shadow-sm">
                    <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                    {photo.tag}
                  </span>
                </div>

                {/* Center Hover Magnifier Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 z-10 pointer-events-none">
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-xl backdrop-blur-md transform scale-90 group-hover/card:scale-100 transition-transform duration-200">
                    <ZoomIn className="w-4 h-4 stroke-[2.5]" />
                    <span>Ampliar foto</span>
                  </div>
                </div>

                {/* Bottom Title Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10 flex items-end justify-between">
                  <div>
                    <h4 className="text-white text-xs sm:text-sm md:text-base font-bold drop-shadow-md">
                      {photo.title}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-slate-300 line-clamp-1 drop-shadow-sm">
                      {photo.alt}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      {activePhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-3 sm:p-6 md:p-8 animate-in fade-in duration-200"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Lightbox Container */}
          <div
            className="relative w-full max-w-5xl max-h-[95vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between py-2 px-1 text-slate-300 mb-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-cyan-400 px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/30">
                  {GALLERY_PHOTOS[activePhotoIndex].tag}
                </span>
                <span className="text-sm font-bold text-white hidden sm:inline">
                  {GALLERY_PHOTOS[activePhotoIndex].title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-medium">
                  Foto {activePhotoIndex + 1} de {GALLERY_PHOTOS.length}
                </span>
                <button
                  type="button"
                  onClick={() => setActivePhotoIndex(null)}
                  className="p-2 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Cerrar ampliación"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image with Navigation Overlays */}
            <div className="relative w-full flex items-center justify-center rounded-2xl overflow-hidden bg-black/40 border border-slate-800/80 shadow-2xl">
              <img
                src={GALLERY_PHOTOS[activePhotoIndex].src}
                alt={GALLERY_PHOTOS[activePhotoIndex].alt}
                className="max-h-[72vh] w-auto max-w-full object-contain select-none animate-in zoom-in-95 duration-200"
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/80 border border-slate-700 text-white hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-400 flex items-center justify-center transition-all duration-150 shadow-xl cursor-pointer active:scale-95"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/80 border border-slate-700 text-white hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-400 flex items-center justify-center transition-all duration-150 shadow-xl cursor-pointer active:scale-95"
                aria-label="Siguiente foto"
              >
                <ChevronRight className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>

            {/* Bottom Info & Thumbnail Strip */}
            <div className="w-full mt-3 flex items-center justify-between gap-4">
              <p className="text-xs text-slate-400 italic hidden sm:block">
                {GALLERY_PHOTOS[activePhotoIndex].alt}
              </p>

              {/* Thumbnail Mini-Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full mx-auto sm:mx-0">
                {GALLERY_PHOTOS.map((photo, idx) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                      activePhotoIndex === idx
                        ? 'border-cyan-400 scale-105 shadow-md shadow-cyan-500/30'
                        : 'border-slate-800 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
