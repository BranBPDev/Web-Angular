import { DatePrecision } from '../models/experience.model';

const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

/** Formatea una fecha ISO (YYYY-MM-DD) sin pasar por Date, para evitar desfases de zona horaria. */
export function formatDate(iso: string, precision: DatePrecision): string {
  const [year, month] = iso.split('-').map(Number);
  return precision === 'month' ? `${MONTHS[(month ?? 1) - 1] ?? ''} ${year}` : String(year);
}

/** "2020 – 2021", "Febrero 2026 – Junio 2026" o "2024 – Actualidad". */
export function formatPeriod(start: string, end: string | null, precision: DatePrecision): string {
  const from = formatDate(start, precision);
  const to = end ? formatDate(end, precision) : 'Actualidad';
  return from === to ? from : `${from} – ${to}`;
}
