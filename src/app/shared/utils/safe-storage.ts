/** Acceso a una clave de localStorage tolerante a fallos (modo privado, cuota llena o bloqueo del navegador). */
export class SafeStorage {
  constructor(private readonly key: string) {}

  get(): string | null {
    try {
      return localStorage.getItem(this.key);
    } catch {
      return null;
    }
  }

  set(value: string): void {
    try {
      localStorage.setItem(this.key, value);
    } catch {
      /* sin almacenamiento disponible */
    }
  }

  clear(): void {
    try {
      localStorage.removeItem(this.key);
    } catch {
      /* sin almacenamiento disponible */
    }
  }
}
