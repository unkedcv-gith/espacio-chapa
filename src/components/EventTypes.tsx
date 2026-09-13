import React, { useState } from 'react';
import { EVENT_TYPES, VENUE_INFO } from '../data/venueData';
import { EventTypeItem } from '../types';
import { PartyPopper, Check, ArrowRight, MessageCircle, Calendar, Users, Clock } from 'lucide-react';

export const EventTypes: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventTypeItem>(EVENT_TYPES[0]);

  const handleInquireEvent = (event: EventTypeItem) => {
    const text = encodeURIComponent(
      `¡Hola ${VENUE_INFO.name}! Me interesa consultar disponibilidad para: ${event.title}. ¿Podrían brindarme información y tarifas?`
    );
    window.open(`https://wa.me/${VENUE_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="eventos" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
            <PartyPopper className="w-3.5 h-3.5" />
            <span>Celebraciones & Experiencias</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Diseñado para cualquier tipo de festejo
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Adaptamos la quinta a la temática, formato y horario que más se adapte a tu celebración.
          </p>
        </div>

        {/* Event Type Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {EVENT_TYPES.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedEvent(item)}
              className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                selectedEvent.id === item.id
                  ? 'bg-slate-800 border-cyan-400 text-white shadow-lg shadow-cyan-950/50'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">
                {item.badge || 'Evento'}
              </span>
              <span className="text-sm font-bold text-white leading-snug line-clamp-2">
                {item.title}
              </span>
            </button>
          ))}
        </div>

        {/* Featured Event Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          {/* Image side */}
          <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-full">
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900" />
            
            {selectedEvent.badge && (
              <span className="absolute top-4 left-4 px-3.5 py-1 bg-cyan-500 text-slate-950 font-extrabold text-xs rounded-full shadow-lg">
                {selectedEvent.badge}
              </span>
            )}
          </div>

          {/* Details side */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
                Propuesta de Evento
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                {selectedEvent.title}
              </h3>
              <p className="text-sm sm:text-base text-cyan-200/90 font-medium mb-4 italic">
                "{selectedEvent.tagline}"
              </p>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {selectedEvent.description}
              </p>

              <div className="mb-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <p className="text-xs font-semibold text-slate-400 mb-1">Recomendado para:</p>
                <p className="text-xs sm:text-sm font-medium text-slate-200">{selectedEvent.idealFor}</p>
              </div>

              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                ¿Qué incluye esta modalidad?
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {selectedEvent.included.map((inc, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-slate-800">
              <button
                onClick={() => handleInquireEvent(selectedEvent)}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Consultar por {selectedEvent.title}</span>
              </button>

              <a
                href="#cotizador"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-semibold rounded-xl transition-all"
              >
                <span>Calcular Presupuesto</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
