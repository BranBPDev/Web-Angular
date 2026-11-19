/** Módulo siempre positivo (para índices circulares): mod(-1, 4) === 3. */
export const mod = (value: number, size: number): number => ((value % size) + size) % size;
