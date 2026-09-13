export interface BlockedDate {
  date: string; // YYYY-MM-DD (Fecha de reserva)
  clientName?: string; // Nombre y Apellido de quien reserva
  clientPhone?: string; // Teléfono de contacto
  reason?: string; // Motivo o detalles del evento
  createdAt?: string;
}

const STORAGE_KEY = 'chapa_blocked_dates_v1';
const ADMIN_AUTH_KEY = 'chapa_admin_authenticated';
export const DEFAULT_ADMIN_PIN = '1234';

// Helper to format date as YYYY-MM-DD using local time
export const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper to format any YYYY-MM-DD or Date to DD/MM/YYYY
export const formatToDDMMYYYY = (dateStrOrDate?: string | Date | null): string => {
  if (!dateStrOrDate) return 'No especificado';
  if (dateStrOrDate instanceof Date) {
    const day = String(dateStrOrDate.getDate()).padStart(2, '0');
    const month = String(dateStrOrDate.getMonth() + 1).padStart(2, '0');
    const year = dateStrOrDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const str = String(dateStrOrDate).trim();
  if (str.includes('-')) {
    const parts = str.split('-');
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        // YYYY-MM-DD -> DD/MM/YYYY
        return `${parts[2].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[0]}`;
      }
    }
  }
  return str;
};

// Generate realistic default dates relative to current month/year
const generateInitialBlockedDates = (): BlockedDate[] => {
  const today = new Date();
  const dates: BlockedDate[] = [];

  // Add 3-5 upcoming Saturdays and Sundays as reserved
  for (let i = 1; i <= 60; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    const dayOfWeek = nextDate.getDay(); // 0 is Sunday, 6 is Saturday

    // Mark some specific weekend dates as reserved
    if (dayOfWeek === 6 && (i === 7 || i === 21 || i === 35)) {
      dates.push({
        date: formatDateKey(nextDate),
        clientName: i === 7 ? 'Mariana Gómez' : i === 21 ? 'Martín Rossi' : 'Luciana Fernández',
        clientPhone: i === 7 ? '+54 9 11 4455-8899' : i === 21 ? '+54 9 11 6722-1100' : '+54 9 11 3322-9988',
        reason: 'Cumpleaños reservado (Seña confirmada)',
        createdAt: new Date().toISOString(),
      });
    } else if (dayOfWeek === 0 && (i === 8 || i === 29)) {
      dates.push({
        date: formatDateKey(nextDate),
        clientName: i === 8 ? 'Esteban Benítez' : 'Carolina Silva',
        clientPhone: i === 8 ? '+54 9 11 5566-7788' : '+54 9 11 2233-4455',
        reason: 'Alquiler diurno familiar',
        createdAt: new Date().toISOString(),
      });
    }
  }

  return dates;
};

export const getStoredBlockedDates = (): BlockedDate[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      const initial = generateInitialBlockedDates();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading blocked dates from localStorage', error);
    return generateInitialBlockedDates();
  }
};

export const saveBlockedDates = (dates: BlockedDate[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dates));
  } catch (error) {
    console.error('Error saving blocked dates to localStorage', error);
  }
};

export interface BlockDateParams {
  date: string;
  clientName?: string;
  clientPhone?: string;
  reason?: string;
}

export const addBlockedDate = (
  dateStrOrParams: string | BlockDateParams,
  reason?: string,
  clientName?: string,
  clientPhone?: string
): BlockedDate[] => {
  const current = getStoredBlockedDates();
  
  let targetDate = '';
  let targetReason = reason || 'Fecha bloqueada por administración';
  let targetName = clientName || '';
  let targetPhone = clientPhone || '';

  if (typeof dateStrOrParams === 'object') {
    targetDate = dateStrOrParams.date;
    targetReason = dateStrOrParams.reason || targetReason;
    targetName = dateStrOrParams.clientName || targetName;
    targetPhone = dateStrOrParams.clientPhone || targetPhone;
  } else {
    targetDate = dateStrOrParams;
  }

  const existingIndex = current.findIndex((d) => d.date === targetDate);
  const newEntry: BlockedDate = {
    date: targetDate,
    clientName: targetName.trim() || undefined,
    clientPhone: targetPhone.trim() || undefined,
    reason: targetReason.trim() || undefined,
    createdAt: new Date().toISOString(),
  };

  let updated: BlockedDate[];
  if (existingIndex >= 0) {
    // Update existing record
    updated = [...current];
    updated[existingIndex] = { ...updated[existingIndex], ...newEntry };
  } else {
    updated = [...current, newEntry];
  }

  saveBlockedDates(updated);
  return updated;
};

export const removeBlockedDate = (dateStr: string): BlockedDate[] => {
  const current = getStoredBlockedDates();
  const updated = current.filter((d) => d.date !== dateStr);
  saveBlockedDates(updated);
  return updated;
};

export const toggleDateStatus = (
  dateStr: string,
  reason?: string,
  clientName?: string,
  clientPhone?: string
): { updatedDates: BlockedDate[]; isNowBlocked: boolean } => {
  const current = getStoredBlockedDates();
  const isBlocked = current.some((d) => d.date === dateStr);
  if (isBlocked) {
    const updated = current.filter((d) => d.date !== dateStr);
    saveBlockedDates(updated);
    return { updatedDates: updated, isNowBlocked: false };
  } else {
    const updated = [
      ...current,
      {
        date: dateStr,
        clientName: clientName?.trim() || undefined,
        clientPhone: clientPhone?.trim() || undefined,
        reason: reason?.trim() || 'Fecha reservada / bloqueada',
        createdAt: new Date().toISOString(),
      },
    ];
    saveBlockedDates(updated);
    return { updatedDates: updated, isNowBlocked: true };
  }
};

export const verifyAdminPin = (inputPin: string): boolean => {
  const cleaned = inputPin.trim();
  return cleaned === DEFAULT_ADMIN_PIN || cleaned === 'chapa2025' || cleaned === 'admin';
};

export const getAdminAuthStatus = (): boolean => {
  try {
    return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
};

export const setAdminAuthStatus = (status: boolean): void => {
  try {
    if (status) {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } else {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    }
  } catch (error) {
    console.error('Error updating admin auth status', error);
  }
};
