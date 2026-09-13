import React, { useState } from 'react';
import { VENUE_INFO } from '../data/venueData';
import { formatToDDMMYYYY } from '../utils/calendarStorage';
import { X, Calendar, Clock, MapPin, CheckCircle2, MessageCircle, Send } from 'lucide-react';

interface ScheduleVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('15:00');
  const [eventType, setEventType] = useState('Cumpleaños');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSendToWhatsApp = () => {
    const formattedDate = preferredDate ? formatToDDMMYYYY(preferredDate) : 'Próximo sábado / día hábil';
    const text = `¡Hola ${VENUE_INFO.name}! Quisiera coordinar una visita para conocer la quinta en persona:
👤 *Nombre:* ${name || 'A coordinar'}
📞 *WhatsApp:* ${phone || 'A coordinar'}
📅 *Día sugerido:* ${formattedDate}
⏰ *Hora sugerida:* ${preferredTime} hs
🎉 *Tipo de Evento planeado:* ${eventType}`;

    window.open(`https://wa.me/${VENUE_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 animate-in zoom-in-95">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white bg-slate-950/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">¡Solicitud Enviada!</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Te contactaremos a la brevedad por WhatsApp para confirmar el horario exacto de tu visita guiada. ¡Te esperamos en {VENUE_INFO.name}!
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl"
            >
              Listo, cerrar
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-4 h-4" />
              <span>Visita Guiada al Predio</span>
            </div>
            <h3 className="text-2xl font-black text-white mb-2">
              Vení a conocer {VENUE_INFO.name}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Recorré el parque, el quincho, el salón y la piscina con nosotros. Coordinamos sin costo ni compromiso.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tu Nombre
                </label>
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Ej: Marcelo Suarez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  WhatsApp de Contacto
                </label>
                <input
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="Ej: 11 4455-6677"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Día Preferido
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Horario Aprox.
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="11:00">11:00 hs</option>
                    <option value="14:00">14:00 hs</option>
                    <option value="16:00">16:00 hs</option>
                    <option value="18:00">18:00 hs</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Evento que te interesa realizar
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Cumpleaños / Fiesta de 15">Cumpleaños / Fiesta de 15</option>
                  <option value="Casamiento / Boda">Casamiento / Boda</option>
                  <option value="Día de Pileta / Pool Day">Día de Pileta / Pool Day</option>
                  <option value="Evento Corporativo">Evento Corporativo</option>
                  <option value="Bautismo / Comunión">Bautismo / Comunión</option>
                </select>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Coordinar Visita por WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
