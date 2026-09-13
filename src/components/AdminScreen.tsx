import React, { useState, useMemo } from 'react';
import {
  Lock,
  Unlock,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Search,
  ArrowLeft,
  Eye,
  ShieldCheck,
  Clock,
  PartyPopper,
  Share2,
  Check,
  RotateCcw,
  CalendarX,
  CalendarCheck2,
  User,
  Phone,
  Edit3,
  MessageCircle,
} from 'lucide-react';
import {
  BlockedDate,
  formatDateKey,
  formatToDDMMYYYY,
  addBlockedDate,
  removeBlockedDate,
  toggleDateStatus,
  verifyAdminPin,
  DEFAULT_ADMIN_PIN,
} from '../utils/calendarStorage';
import { VENUE_INFO } from '../data/venueData';
import { Logo } from './Logo';

interface AdminScreenProps {
  isAdmin: boolean;
  blockedDates: BlockedDate[];
  onLoginSuccess: () => void;
  onLogout: () => void;
  onRefreshDates: () => void;
  onBackToWebsite: () => void;
}

const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const WEEKDAY_NAMES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const WEEKDAY_SHORT = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];

export const AdminScreen: React.FC<AdminScreenProps> = ({
  isAdmin,
  blockedDates,
  onLoginSuccess,
  onLogout,
  onRefreshDates,
  onBackToWebsite,
}) => {
  // Login state
  const [pin, setPin] = useState('');
  const [loginError, setLoginError] = useState('');

  // Calendar navigation
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  // Manual add form - New required & optional fields
  const [newDate, setNewDate] = useState('');
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newReason, setNewReason] = useState('');

  // Search & filter in reservations list
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'upcoming' | 'past'>('upcoming');

  // Interactive feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Selected date for detail / modal action
  const [activeDateModal, setActiveDateModal] = useState<string | null>(null);
  const [activeClientName, setActiveClientName] = useState('');
  const [activeClientPhone, setActiveClientPhone] = useState('');
  const [activeDateReason, setActiveDateReason] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPin(pin)) {
      setLoginError('');
      setPin('');
      onLoginSuccess();
      showToast('¡Sesión iniciada con éxito!');
    } else {
      setLoginError(`PIN incorrecto. Podés usar el PIN predeterminado (${DEFAULT_ADMIN_PIN}).`);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleResetToCurrentMonth = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  };

  // Day toggle directly on calendar
  const handleCalendarCellClick = (dateKey: string) => {
    const existing = blockedDates.find((b) => b.date === dateKey);
    setActiveDateModal(dateKey);
    if (existing) {
      setActiveClientName(existing.clientName || '');
      setActiveClientPhone(existing.clientPhone || '');
      setActiveDateReason(existing.reason || '');
    } else {
      setActiveClientName('');
      setActiveClientPhone('');
      setActiveDateReason('');
    }
  };

  const handleConfirmDateAction = (dateKey: string, isBlocking: boolean) => {
    if (isBlocking) {
      addBlockedDate({
        date: dateKey,
        clientName: activeClientName,
        clientPhone: activeClientPhone,
        reason: activeDateReason || 'Reserva confirmada',
      });
      showToast(`Fecha ${dateKey} guardada exitosamente.`);
    } else {
      removeBlockedDate(dateKey);
      showToast(`Fecha ${dateKey} liberada y disponible.`);
    }
    onRefreshDates();
    setActiveDateModal(null);
    setActiveClientName('');
    setActiveClientPhone('');
    setActiveDateReason('');
  };

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate) return;
    addBlockedDate({
      date: newDate,
      clientName: newClientName,
      clientPhone: newClientPhone,
      reason: newReason || 'Reserva confirmada',
    });
    onRefreshDates();
    showToast(`Fecha ${newDate} guardada exitosamente.`);
    setNewDate('');
    setNewClientName('');
    setNewClientPhone('');
    setNewReason('');
  };

  const handleRemoveDate = (dateStr: string) => {
    removeBlockedDate(dateStr);
    onRefreshDates();
    showToast(`Fecha ${dateStr} liberada.`);
  };

  // Build calendar matrix
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  let startingDayOfWeek = firstDayOfMonth.getDay() - 1;
  if (startingDayOfWeek === -1) startingDayOfWeek = 6;

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const calendarDays = [];

  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const dateObj = new Date(currentYear, currentMonth - 1, d);
    calendarDays.push({
      dayNumber: d,
      dateObj,
      dateKey: formatDateKey(dateObj),
      isCurrentMonth: false,
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(currentYear, currentMonth, d);
    calendarDays.push({
      dayNumber: d,
      dateObj,
      dateKey: formatDateKey(dateObj),
      isCurrentMonth: true,
    });
  }

  const remainingCells = (7 - (calendarDays.length % 7)) % 7;
  for (let d = 1; d <= remainingCells; d++) {
    const dateObj = new Date(currentYear, currentMonth + 1, d);
    calendarDays.push({
      dayNumber: d,
      dateObj,
      dateKey: formatDateKey(dateObj),
      isCurrentMonth: false,
    });
  }

  const getBlockedItem = (dateKey: string) => {
    return blockedDates.find((b) => b.date === dateKey);
  };

  // Helper date formatter
  const formatHumanDate = (dateKey: string) => {
    const [y, m, d] = dateKey.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('es-AR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Filtered reservations list
  const filteredReservations = useMemo(() => {
    const todayStr = formatDateKey(today);
    return blockedDates
      .filter((item) => {
        if (filterTab === 'upcoming') return item.date >= todayStr;
        if (filterTab === 'past') return item.date < todayStr;
        return true;
      })
      .filter((item) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          item.date.includes(q) ||
          (item.clientName && item.clientName.toLowerCase().includes(q)) ||
          (item.clientPhone && item.clientPhone.toLowerCase().includes(q)) ||
          (item.reason && item.reason.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [blockedDates, filterTab, searchQuery]);

  // Statistics
  const todayKey = formatDateKey(today);
  const upcomingCount = blockedDates.filter((b) => b.date >= todayKey).length;
  const weekendReservations = blockedDates.filter((b) => {
    const [y, m, d] = b.date.split('-').map(Number);
    const day = new Date(y, m - 1, d).getDay();
    return (day === 0 || day === 6) && b.date >= todayKey;
  }).length;

  const handleCopySummary = () => {
    const sorted = [...blockedDates]
      .filter((b) => b.date >= todayKey)
      .sort((a, b) => a.date.localeCompare(b.date));

    if (sorted.length === 0) {
      navigator.clipboard.writeText('No hay fechas ocupadas próximas en Espacio CHAPA.');
    } else {
      const lines = sorted.map((b) => {
        let line = `• ${formatToDDMMYYYY(b.date)}`;
        if (b.clientName) line += ` | ${b.clientName}`;
        if (b.clientPhone) line += ` (Tel: ${b.clientPhone})`;
        if (b.reason) line += ` - ${b.reason}`;
        return line;
      }).join('\n');
      navigator.clipboard.writeText(`*Fechas ocupadas - Espacio CHAPA:*\n${lines}`);
    }
    setCopiedSummary(true);
    showToast('¡Resumen de reservas copiado al portapapeles!');
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  // Helper to format clean whatsapp link
  const getWhatsAppLink = (phone?: string) => {
    if (!phone) return null;
    const cleanNumber = phone.replace(/[^0-9]/g, '');
    if (cleanNumber.length < 8) return null;
    return `https://wa.me/${cleanNumber}`;
  };

  // ==========================================
  // VIEW 1: NOT AUTHENTICATED (SPACIOUS LOGIN)
  // ==========================================
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-900/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-900/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top bar */}
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-auto text-cyan-400" />
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold hidden sm:inline">
              Gestión Interna
            </span>
          </div>

          <button
            type="button"
            onClick={onBackToWebsite}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Sitio Web</span>
          </button>
        </div>

        {/* Login Card */}
        <div className="max-w-md w-full mx-auto my-auto py-12">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-950/50">
              <Lock className="w-8 h-8" />
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-white tracking-tight mb-2">
                Panel de Administración
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Ingresá tu PIN de seguridad para gestionar fechas, bloqueos y disponibilidad de la quinta.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 text-center">
                  PIN de Seguridad
                </label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    if (loginError) setLoginError('');
                  }}
                  autoFocus
                  placeholder="••••"
                  className="w-full px-4 py-3.5 bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-2xl text-white text-center text-2xl tracking-[0.3em] outline-none transition-colors"
                />
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-sm shadow-xl shadow-cyan-950/50 transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Ingresar al Panel</span>
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-400 space-y-1">
              <p>PIN predeterminado: <strong className="text-cyan-400 font-mono">{DEFAULT_ADMIN_PIN}</strong></p>
              <p className="text-[11px] text-slate-400">Acceso exclusivo para administradores de Quinta CHAPA</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="max-w-5xl mx-auto w-full text-center text-xs text-slate-400 pt-6">
          © {new Date().getFullYear()} {VENUE_INFO.name} • Sistema de Control de Disponibilidad
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: FULL COMFORTABLE ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-cyan-950 border border-cyan-500 text-cyan-200 shadow-2xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-auto text-cyan-400" />
            <div className="h-4 w-[1px] bg-slate-700 hidden sm:block" />
            <span className="text-sm font-bold text-white hidden sm:flex items-center gap-2">
              <span>Panel de Administración</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-semibold">
                En vivo
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToWebsite}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-colors"
            >
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>Ver Sitio Web</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 text-xs font-semibold transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome & Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Bloqueadas</span>
              <CalendarX className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-white">{blockedDates.length}</div>
            <p className="text-[11px] text-slate-400 mt-1">Fechas cargadas en la base de datos</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Próximas Reservas</span>
              <CalendarCheck2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">{upcomingCount}</div>
            <p className="text-[11px] text-slate-400 mt-1">Eventos desde hoy en adelante</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Findes Ocupados</span>
              <PartyPopper className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400">{weekendReservations}</div>
            <p className="text-[11px] text-slate-400 mt-1">Sábados o Domingos reservados</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Acción Rápida</span>
              <p className="text-xs text-slate-300 mt-1">Copiar lista para WhatsApp</p>
            </div>
            <button
              type="button"
              onClick={handleCopySummary}
              className="mt-3 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-cyan-300 text-xs font-bold border border-slate-700 transition-colors"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedSummary ? '¡Copiado!' : 'Copiar Resumen'}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Main Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Spacious Master Calendar (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            {/* Calendar Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <CalendarIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white capitalize">
                    {MONTH_NAMES[currentMonth]} {currentYear}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Hacé clic en cualquier celda para bloquear o liberar la fecha
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetToCurrentMonth}
                  className="px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Hoy</span>
                </button>
                <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    aria-label="Mes anterior"
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    aria-label="Mes siguiente"
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Weekdays Header */}
            <div className="grid grid-cols-7 gap-2 mb-2 text-center">
              {WEEKDAY_SHORT.map((day, idx) => (
                <div
                  key={day}
                  className={`py-1 text-xs font-bold uppercase tracking-wider ${
                    idx >= 5 ? 'text-amber-400' : 'text-slate-400'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Spacious Days Matrix */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((cell) => {
                const dateObjNoTime = new Date(cell.dateObj);
                dateObjNoTime.setHours(0, 0, 0, 0);

                const isPast = dateObjNoTime < today;
                const isToday = dateObjNoTime.getTime() === today.getTime();
                const blockedItem = getBlockedItem(cell.dateKey);
                const isBlocked = Boolean(blockedItem);
                const isWeekend = cell.dateObj.getDay() === 0 || cell.dateObj.getDay() === 6;

                let cellBg = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-cyan-500/70 hover:bg-slate-800/60';

                if (!cell.isCurrentMonth) {
                  cellBg = 'opacity-20 border-transparent bg-slate-950/20 text-slate-600 pointer-events-none';
                } else if (isBlocked) {
                  cellBg = 'bg-rose-950/50 border-rose-800/70 text-rose-200 hover:bg-rose-900/50 hover:border-rose-600';
                } else if (isWeekend) {
                  cellBg = 'bg-slate-900 border-slate-800/80 text-white hover:border-cyan-500/70';
                }

                return (
                  <button
                    key={cell.dateKey}
                    type="button"
                    onClick={() => cell.isCurrentMonth && handleCalendarCellClick(cell.dateKey)}
                    className={`min-h-[72px] sm:min-h-[82px] p-2 rounded-2xl border transition-all duration-150 flex flex-col justify-between text-left group cursor-pointer ${cellBg}`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-xs sm:text-sm font-bold ${
                          isToday
                            ? 'w-6 h-6 flex items-center justify-center rounded-full bg-cyan-500 text-slate-950 font-black'
                            : ''
                        }`}
                      >
                        {cell.dayNumber}
                      </span>

                      {cell.isCurrentMonth && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                            isBlocked
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                          }`}
                        >
                          {isBlocked ? 'Ocupado' : 'Libre'}
                        </span>
                      )}
                    </div>

                    {cell.isCurrentMonth && (
                      <div className="text-[10px] truncate w-full mt-1">
                        {isBlocked ? (
                          <span className="text-rose-300/90 font-medium truncate block">
                            {blockedItem?.reason || 'Reservado'}
                          </span>
                        ) : (
                          <span className="text-slate-400 group-hover:text-cyan-400 transition-colors">
                            {isWeekend ? 'Finde libre' : 'Día libre'}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-300">Disponible</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="text-slate-300">Reservada / Bloqueada</span>
                </div>
              </div>
              <span className="text-[11px] text-slate-400">
                💡 Al hacer clic en un día podés agregar nota o liberarlo al instante.
              </span>
            </div>
          </div>

          {/* Right Column: Add Date + Full Reservation List (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Form to Block Specific Date with full fields */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" />
                <span>Bloquear y Registrar Reserva</span>
              </h4>

              <form onSubmit={handleManualAdd} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Fecha de reserva *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Nombre y Apellido de quien reserva *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Juan Pérez / Martina Silva"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Teléfono de contacto</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Ej: +54 9 11 1234-5678"
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Motivo o tipo de evento (opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Cumpleaños familiar, Seña confirmada..."
                    value={newReason}
                    onChange={(e) => setNewReason(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Guardar y Bloquear Fecha</span>
                </button>
              </form>
            </div>

            {/* List of Reservations with Search & Filter */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Listado de Fechas ({filteredReservations.length})
                </h4>

                {/* Filter tabs */}
                <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setFilterTab('upcoming')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                      filterTab === 'upcoming'
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Próximas
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterTab('all')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                      filterTab === 'all'
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Todas
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterTab('past')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                      filterTab === 'past'
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Pasadas
                  </button>
                </div>
              </div>

              {/* Search input */}
              <div className="relative mb-4">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Buscar por cliente, teléfono, fecha o motivo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              {/* Scrollable List with enriched reservation details */}
              <div className="max-h-[380px] overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
                {filteredReservations.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400 bg-slate-950/50 rounded-2xl border border-dashed border-slate-800">
                    No se encontraron fechas con los filtros seleccionados.
                  </div>
                ) : (
                  filteredReservations.map((item) => {
                    const waLink = getWhatsAppLink(item.clientPhone);
                    return (
                      <div
                        key={item.date}
                        className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 space-y-2 text-xs transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-extrabold text-white bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800 font-mono">
                                {formatToDDMMYYYY(item.date)}
                              </span>
                              <span className="text-[10px] text-cyan-400 font-medium">
                                {formatHumanDate(item.date)}
                              </span>
                            </div>

                            {/* Client Name */}
                            <div className="flex items-center gap-1.5 text-slate-100 font-bold text-xs pt-0.5">
                              <User className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                              <span className="truncate">{item.clientName || 'Cliente sin nombre'}</span>
                            </div>

                            {/* Client Phone & WhatsApp shortcut */}
                            {item.clientPhone && (
                              <div className="flex items-center gap-2 pt-0.5">
                                <span className="flex items-center gap-1 text-[11px] text-slate-300">
                                  <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
                                  <span>{item.clientPhone}</span>
                                </span>
                                {waLink && (
                                  <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 text-[10px] font-semibold transition-colors"
                                  >
                                    <MessageCircle className="w-2.5 h-2.5" />
                                    <span>WhatsApp</span>
                                  </a>
                                )}
                              </div>
                            )}

                            {/* Reason / details */}
                            {item.reason && (
                              <p className="text-slate-400 text-[11px] italic pt-0.5">
                                {item.reason}
                              </p>
                            )}
                          </div>

                          {/* Quick action buttons */}
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleCalendarCellClick(item.date)}
                              title="Editar datos de reserva"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-950/40 transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveDate(item.date)}
                              title="Liberar y hacer disponible"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Quick Action Dialog for Calendar Click with full inputs */}
      {activeDateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <CalendarIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    {getBlockedItem(activeDateModal) ? 'Editar Reserva' : 'Bloquear Fecha'}
                  </h4>
                  <p className="text-xs text-cyan-400 font-medium">
                    {formatHumanDate(activeDateModal)} ({formatToDDMMYYYY(activeDateModal)})
                  </p>
                </div>
              </div>

              {getBlockedItem(activeDateModal) ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800">
                  Ocupado
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Libre
                </span>
              )}
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Nombre y Apellido de quien reserva</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej: Laura Gómez / Pedro Rossi"
                  value={activeClientName}
                  onChange={(e) => setActiveClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Teléfono de contacto</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    placeholder="Ej: +54 9 11 1234-5678"
                    value={activeClientPhone}
                    onChange={(e) => setActiveClientPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400 transition-colors"
                  />
                  {getWhatsAppLink(activeClientPhone) && (
                    <a
                      href={getWhatsAppLink(activeClientPhone)!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shrink-0 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Motivo o detalles del evento
                </label>
                <input
                  type="text"
                  placeholder="Ej: Cumpleaños infantil, Seña abonada..."
                  value={activeDateReason}
                  onChange={(e) => setActiveDateReason(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => handleConfirmDateAction(activeDateModal, true)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>
                  {getBlockedItem(activeDateModal) ? 'Guardar Cambios' : 'Confirmar y Bloquear'}
                </span>
              </button>

              {getBlockedItem(activeDateModal) && (
                <button
                  type="button"
                  onClick={() => handleConfirmDateAction(activeDateModal, false)}
                  className="py-2.5 px-4 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Liberar Fecha</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setActiveDateModal(null)}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
