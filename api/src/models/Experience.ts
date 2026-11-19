/** Con 'year' solo se muestra el año de las fechas; con 'month', mes y año. */
export type DatePrecision = 'year' | 'month';

export interface Experience {
  id: string;
  /** Sitio o empresa. */
  title: string;
  role: string;
  location: string | null;
  description: string;
  /** Fechas en formato YYYY-MM-DD. Sin fecha de fin significa "actualidad". */
  startDate: string;
  endDate: string | null;
  datePrecision: DatePrecision;
  image: string | null;
}
