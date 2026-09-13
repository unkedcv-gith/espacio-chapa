import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  Info,
  RotateCcw,
} from 'lucide-react';
import { BlockedDate, formatDateKey, formatToDDMMYYYY } from '../utils/calendarStorage';

interface BookingCalendarProps {
  selectedDate: string;
  onSelectDate: (dateStr: string) => void;
  blockedDates: BlockedDate[];
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

const WEEKDAY_NAMES = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  selectedDate,
  onSelectDate,
  blockedDates,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Month navigation state
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-11

  // Sync calendar view if a date is selected from outside
  useEffect(() => {
    if (selectedDate) {
      const [y, m] = selectedDate.split('-').map(Number);
      if (y && m) {
        setCurrentYear(y);
        setCurrentMonth(m - 1);
      }
    }
  }, [selectedDate]);

  // Navigation handlers
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

  // Build calendar matrix (Monday to Sunday)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  let startingDayOfWeek = firstDayOfMonth.getDay() - 1;
  if (startingDayOfWeek === -1) startingDayOfWeek = 6;

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const calendarDays = [];

  // Previous month trailing days
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

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(currentYear, currentMonth, d);
    calendarDays.push({
      dayNumber: d,
      dateObj,
      dateKey: formatDateKey(dateObj),
      isCurrentMonth: true,
    });
  }

  // Next month leading days to complete grid cleanly
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

  const getBlockedInfo = (dateKey: string) => {
    return blockedDates.find((b) => b.date === dateKey);
  };

  const handleDayClick = (dateKey: string, isPast: boolean) => {
    if (isPast) return;
    onSelectDate(dateKey);
  };

  const formatHumanDate = (dateKey: string) => {
    const [y, m, d] = dateKey.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('es-AR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const selectedBlockedInfo = selectedDate ? getBlockedInfo(selectedDate) : null;
  const isSelectedDateBlocked = Boolean(selectedBlockedInfo);

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl backdrop-blur-sm">
      {/* Calendar Header: Month + Navigation */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div>
          <h4 className="text-base font-bold text-white capitalize flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-cyan-400" />
            <span>{MONTH_NAMES[currentMonth]} {currentYear}</span>
          </h4>
          <span className="text-[11px] text-slate-400">Tocá un día para consultar disponibilidad</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleResetToCurrentMonth}
            title="Mes actual"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center bg-slate-950 rounded-xl border border-slate-800 p-0.5">
            <button
              type="button"
              onClick={handlePrevMonth}
              aria-label="Mes anterior"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Mes siguiente"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 mb-1 text-center">
        {WEEKDAY_NAMES.map((day, idx) => (
          <div
            key={day}
            className={`py-1 text-[11px] font-bold uppercase tracking-wider ${
              idx >= 5 ? 'text-amber-400/90' : 'text-slate-400'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid - Clean and compact public view */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((cell) => {
          const dateObjNoTime = new Date(cell.dateObj);
          dateObjNoTime.setHours(0, 0, 0, 0);

          const isPast = dateObjNoTime < today;
          const isToday = dateObjNoTime.getTime() === today.getTime();
          const isSelected = selectedDate === cell.dateKey;
          const isWeekend = cell.dateObj.getDay() === 0 || cell.dateObj.getDay() === 6;

          let buttonClasses = 'text-slate-200 hover:bg-slate-800 hover:text-cyan-300 cursor-pointer';

          if (!cell.isCurrentMonth) {
            buttonClasses = 'opacity-25 text-slate-500 cursor-not-allowed pointer-events-none';
          } else if (isPast) {
            buttonClasses = 'opacity-35 text-slate-400 cursor-not-allowed';
          } else if (isSelected) {
            // High visibility for the selected date
            buttonClasses = 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/30 scale-105 cursor-pointer';
          } else if (isWeekend) {
            buttonClasses = 'text-white bg-slate-800/40 hover:bg-slate-800 hover:text-cyan-300 font-semibold cursor-pointer';
          }

          return (
            <button
              key={cell.dateKey}
              type="button"
              disabled={!cell.isCurrentMonth || isPast}
              onClick={() => handleDayClick(cell.dateKey, isPast)}
              className={`h-9 sm:h-10 w-full rounded-xl text-xs sm:text-sm flex items-center justify-center relative transition-all duration-150 active:scale-90 ${buttonClasses} ${
                isToday && !isSelected ? 'border border-cyan-500/60 font-bold' : ''
              }`}
            >
              <span>{cell.dayNumber}</span>
            </button>
          );
        })}
      </div>

      {/* Availability Status Box: Shows when a date is selected by the visitor */}
      <div className="mt-4 pt-3 border-t border-slate-800">
        {selectedDate ? (
          <div
            className={`p-3.5 rounded-2xl border transition-all animate-in fade-in duration-200 ${
              isSelectedDateBlocked
                ? 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                {isSelectedDateBlocked ? (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className="text-xs font-bold text-rose-300">Fecha Reservada / No disponible</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-bold text-emerald-300">¡Fecha Disponible!</span>
                  </>
                )}
              </div>

              <p className="text-xs font-semibold text-white capitalize">
                {formatHumanDate(selectedDate)} — <span className="text-cyan-300 font-mono font-bold">{formatToDDMMYYYY(selectedDate)}</span>
              </p>

              <p className="text-[11px] text-slate-300 leading-snug">
                {isSelectedDateBlocked
                  ? 'Esta fecha ya se encuentra tomada. Te sugerimos consultar por otro día en el calendario.'
                  : 'Disponible para alquiler diurno (11 a 19 hs). La fecha ya fue pre-cargada en el formulario.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-slate-400 flex items-center gap-2 text-xs">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Hacé clic en cualquier fecha del calendario para consultar su disponibilidad.</span>
          </div>
        )}
      </div>
    </div>
  );
};
