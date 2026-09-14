import React, { useState, useEffect } from 'react';
import { VENUE_INFO } from '../data/venueData';
import { ContactFormData } from '../types';
import { BlockedDate, formatToDDMMYYYY } from '../utils/calendarStorage';
import { BookingCalendar } from './BookingCalendar';
import {
  Send,
  MessageCircle,
  Mail,
  Calendar,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Instagram,
} from 'lucide-react';

interface ContactFormProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  blockedDates: BlockedDate[];
}

export const ContactForm: React.FC<ContactFormProps> = ({
  selectedDate,
  onSelectDate,
  blockedDates,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    email: '',
    eventDate: selectedDate || '',
    eventType: 'Cumpleaños / Fiesta',
    guestCount: 50,
    timeSlot: 'day',
    notes: '',
  });

  useEffect(() => {
    if (selectedDate !== formData.eventDate) {
      setFormData((prev) => ({ ...prev, eventDate: selectedDate }));
    }
  }, [selectedDate]);

  const [submitted, setSubmitted] = useState(false);
  const [sendingToWhatsapp, setSendingToWhatsapp] = useState(false);

  // Check if selected date is blocked
  const selectedBlocked = blockedDates.find((b) => b.date === formData.eventDate);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'eventDate') {
      onSelectDate(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const buildWhatsAppMessage = () => {
    const timeSlotLabel =
      formData.timeSlot === 'day'
        ? 'Turno Día (11 a 19 hs)'
        : formData.timeSlot === 'night'
        ? 'Turno Noche (20 a 05 hs)'
        : 'Jornada Completa (11 a 05 hs)';

    const formattedDate = formData.eventDate ? formatToDDMMYYYY(formData.eventDate) : 'No especificado';

    return `¡Hola ${VENUE_INFO.name}! Quiero consultar disponibilidad para mi evento:
👤 *Nombre:* ${formData.fullName.trim() || 'No especificado'}
📞 *Teléfono:* ${formData.phone.trim() || 'No especificado'}
📧 *Email:* ${formData.email.trim() || 'No especificado'}
📅 *Fecha estimada:* ${formattedDate}
🎉 *Tipo de Evento:* ${formData.eventType}
👥 *Invitados estimados:* ${formData.guestCount} personas
⏰ *Turno:* ${timeSlotLabel}
📝 *Consultas / Notas:* ${formData.notes.trim() || 'Ninguna'}`;
  };

  const handleSendToWhatsAppDirect = () => {
    setSendingToWhatsapp(true);
    const message = buildWhatsAppMessage();
    window.open(`https://wa.me/${VENUE_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    setSendingToWhatsapp(false);
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Disponibilidad & Contacto</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            Consultá tu fecha y asegurá tu festejo
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Tocá el día de tu evento en el almanaque para verificar disponibilidad y envianos tu consulta directa por formulario o WhatsApp.
          </p>
        </div>

        {/* 2-Column Integrated Layout: Calendar on the left, Form on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Compact Calendar */}
          <div className="lg:col-span-5 space-y-4">
            {/* Integrated Compact Calendar */}
            <BookingCalendar
              selectedDate={formData.eventDate}
              onSelectDate={(date) => {
                setFormData((prev) => ({ ...prev, eventDate: date }));
                onSelectDate(date);
              }}
              blockedDates={blockedDates}
            />

            {/* Direct Instagram Badge */}
            <a
              href={VENUE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-pink-950/30 to-slate-900 border border-slate-800 hover:border-pink-500/40 text-slate-300 hover:text-white transition-all shadow-md group/igcard"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 flex items-center justify-center text-white shadow-md group-hover/igcard:scale-105 transition-transform">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white group-hover/igcard:text-pink-300 transition-colors">
                    Seguinos en Instagram
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Mirá fotos reales, historias y videos de eventos
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-pink-400 px-2.5 py-1 rounded-full bg-pink-950/60 border border-pink-500/30">
                {VENUE_INFO.instagram}
              </span>
            </a>
          </div>

          {/* Right Column: Contact & Booking Form */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="mb-6 pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xl font-bold text-white">Formulario de Reserva</h3>
                <p className="text-xs text-slate-400">
                  Completá tus datos para congelar tarifa o coordinar visita
                </p>
              </div>

              {formData.eventDate && (
                <div className="self-start sm:self-auto">
                  {selectedBlocked ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-950 text-rose-300 border border-rose-800">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Fecha Ocupada ({formatToDDMMYYYY(formData.eventDate)})</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Fecha Disponible ({formatToDDMMYYYY(formData.eventDate)})</span>
                    </span>
                  )}
                </div>
              )}
            </div>

            {submitted ? (
              <div className="text-center py-10 space-y-4 animate-in fade-in">
                <div className="w-16 h-16 bg-emerald-950 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  ¡Gracias por contactarnos, {formData.fullName || 'amigo/a'}!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Recibimos tu solicitud para la fecha <strong>{formData.eventDate ? formatToDDMMYYYY(formData.eventDate) : 'solicitada'}</strong>. Te responderemos a la brevedad por WhatsApp o correo.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleSendToWhatsAppDirect}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Enviar también a WhatsApp ahora</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
                  >
                    Editar datos
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      autoComplete="name"
                      placeholder="Ej: Laura Martínez"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="Ej: 11 3456-7890"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Correo Electrónico (opcional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="ejemplo@correo.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>Fecha del Evento *</span>
                      {formData.eventDate && (
                        <span className="text-[10px] text-cyan-400 font-normal">Sincronizada</span>
                      )}
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      required
                      value={formData.eventDate}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-slate-950 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        selectedBlocked
                          ? 'border-rose-500/70 focus:border-rose-400'
                          : 'border-slate-800 focus:border-cyan-400'
                      }`}
                    />
                  </div>
                </div>

                {/* Notice if the selected date is blocked */}
                {selectedBlocked && (
                  <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 flex items-start gap-2 text-xs text-rose-200 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-rose-300 block">Atención: La fecha seleccionada ya figura reservada</strong>
                      <span>Podés elegir otra fecha libre en el almanaque, o enviarnos la consulta igualmente si tenés flexibilidad.</span>
                    </div>
                  </div>
                )}

                {/* Event Type & Quick Pills */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Tipo de Evento
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {[
                      'Cumpleaños / Fiesta',
                      'Fiesta de 15',
                      'Casamiento / Boda',
                      'Día de Pileta / Pool Day',
                      'Corporativo / Empresa',
                      'Bautismo / Comunión',
                    ].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, eventType: type }))}
                        className={`text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          formData.eventType === type
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-sm'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guests & Turno Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Invitados Estimados (Máx 50)
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            guestCount: Math.max(5, prev.guestCount - 5),
                          }))
                        }
                        className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-bold text-lg active:scale-95 cursor-pointer"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        name="guestCount"
                        min="5"
                        max="50"
                        inputMode="numeric"
                        value={formData.guestCount}
                        onChange={handleChange}
                        className="w-full text-center px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            guestCount: Math.min(50, prev.guestCount + 5),
                          }))
                        }
                        className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-bold text-lg active:scale-95 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Franja Horaria
                    </label>
                    <select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
                    >
                      <option value="day">☀️ Turno Día (11 a 19 hs)</option>
                      <option value="night">🌙 Turno Noche (20 a 05 hs)</option>
                      <option value="full">🌟 Jornada Full (11 a 05 hs)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Comentarios o Consultas Especiales
                  </label>
                  <textarea
                    name="notes"
                    rows={2}
                    placeholder="Contanos si querés traer tu propio catering, sumar inflable o coordinar una visita..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3 px-5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-cyan-950 flex items-center justify-center gap-2 active:scale-98"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Formulario</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendToWhatsAppDirect}
                    className="w-full sm:w-auto py-3 px-5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Consultar por WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
