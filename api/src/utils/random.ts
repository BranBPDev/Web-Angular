/** Código numérico aleatorio sin sesgo (rechazo de valores fuera de rango). */
export function generateNumericCode(length = 6): string {
  const max = 10 ** length;
  const limit = Math.floor(0x100000000 / max) * max;
  const buffer = new Uint32Array(1);
  let value: number;
  do {
    crypto.getRandomValues(buffer);
    value = buffer[0]!;
  } while (value >= limit);
  return String(value % max).padStart(length, '0');
}
