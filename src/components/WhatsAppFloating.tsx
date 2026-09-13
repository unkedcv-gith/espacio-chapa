import React, { useState } from 'react';
import { VENUE_INFO } from '../data/venueData';
import { MessageCircle, X, Sparkles, Send, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import { Logo } from './Logo';

export const WhatsAppFloating: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const presetMessages = [
    { label: '📅 Consultar fecha disponible', text: '¡Hola! Quisiera saber si tienen disponibilidad para la fecha...' },
    { label: '💰 Pedir presupuesto para fiesta', text: '¡Hola! Me gustaría recibir presupuesto para un cumpleaños/evento con...' },
    { label: '🏡 Coordinar visita a la quinta', text: `¡Hola! Quisiera coordinar una visita para conocer las instalaciones de ${VENUE_INFO.name}.` },
    { label: '🏊 Alquilar para pasar el día / Pool Day', text: '¡Hola! Quería consultar tarifas para pasar el día en la quinta y usar la pileta.' },
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || customMsg || VENUE_INFO.whatsappDefaultMessage;
    window.open(`https://wa.me/${VENUE_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="hidden lg:flex fixed bottom-6 right-6 z-50 flex-col items-end">
      {/* Floating Popup Card */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-5 fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 fill-emerald-400" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full animate-ping" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">{VENUE_INFO.name} • Atención</h4>
                <p className="text-[11px] text-emerald-200">En línea • Respuesta rápida</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-slate-900/95">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-200">
              <p className="font-semibold text-cyan-400 mb-1">¡Hola! 👋</p>
              <p>¿En qué fecha te gustaría festejar tu evento? Elegí una opción rápida o escribinos tu consulta directa:</p>
            </div>

            {/* Quick Presets */}
            <div className="space-y-1.5">
              {presetMessages.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(item.text)}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-emerald-500/50 text-xs text-slate-200 hover:text-white transition-all flex items-center justify-between group"
                >
                  <span className="truncate">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 shrink-0 ml-1" />
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="text"
                placeholder="Escribí tu mensaje aquí..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
              <button
                onClick={() => handleSend()}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Button */}
      <div className="relative flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir chat de WhatsApp"
          className="relative group p-4 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-2xl shadow-emerald-950/80 hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center"
        >
          <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
          <MessageCircle className="w-7 h-7 fill-current relative z-10" />
        </button>
      </div>
    </div>
  );
};
