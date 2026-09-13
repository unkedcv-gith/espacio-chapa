import React, { useState } from 'react';
import { GALLERY_IMAGES, VENUE_INFO } from '../data/venueData';
import { GalleryImage } from '../types';
import { Sparkles, Maximize2, ChevronLeft, ChevronRight, X, MessageCircle, Eye, Camera } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'Todas las Fotos' },
    { id: 'pool', label: 'Piscina & Parque' },
    { id: 'salon', label: 'Salón & Quincho' },
    { id: 'night', label: 'De Noche & Luces' },
    { id: 'events', label: 'Bodas & Cumpleaños' },
    { id: 'deco', label: 'Detalles & Deco' },
  ];

  const filteredImages = activeCategory === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  const currentLightboxImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  const handleAskAboutPhoto = (img: GalleryImage) => {
    const text = encodeURIComponent(
      `¡Hola ${VENUE_INFO.name}! Me encantó esta foto de la galería: "${img.title}". ¿Podrían darme más info de cómo armar algo así para mi evento?`
    );
    window.open(`https://wa.me/${VENUE_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="galeria" className="py-20 bg-slate-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Galería de Momentos Reales</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Cada rincón pensado para tus mejores recuerdos
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Explorá nuestras instalaciones de día y de noche. Fotos reales de eventos celebrados en Espacio Chapu.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                  : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() => openLightbox(index)}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer bg-slate-950 border border-slate-800/80 hover:border-cyan-500/50 shadow-lg hover:shadow-cyan-950/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={image.imageUrl}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                <div className="flex justify-between items-start">
                  {image.highlight && (
                    <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/90 text-slate-950 rounded-full backdrop-blur-sm">
                      {image.highlight}
                    </span>
                  )}
                  <div className="p-2 rounded-full bg-slate-900/80 text-cyan-400 border border-slate-700">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-1 drop-shadow-md">
                    {image.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {image.description}
                  </p>
                  <p className="text-[11px] text-cyan-400 font-semibold mt-2 flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Clic para ampliar
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-400 mb-4">
            ¿Buscás una ambientación personalizada para tu fecha?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-semibold transition-all hover:border-cyan-500/50"
          >
            <span>Consultar Disponibilidad de Fecha</span>
            <span className="text-cyan-400">→</span>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentLightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl animate-in fade-in">
          {/* Close Lightbox */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-3 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700"
            aria-label="Cerrar vista"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700"
            aria-label="Foto siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & details container */}
          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative flex-1 max-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={currentLightboxImage.imageUrl}
                alt={currentLightboxImage.alt}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="p-4 sm:p-6 bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                    {currentLightboxImage.highlight || 'Espacio Chapu'}
                  </span>
                  <span className="text-xs text-slate-500">
                    Foto {(lightboxIndex ?? 0) + 1} de {filteredImages.length}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {currentLightboxImage.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {currentLightboxImage.description}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleAskAboutPhoto(currentLightboxImage)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Consultar por esta foto</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
