import { signal } from '@angular/core';
import { ApiError } from '../services/api.service';

/** Estado reutilizable de una acción asíncrona (enviando, error). Evita repetirlo en cada formulario. */
export class AsyncAction {
  readonly pending = signal(false);
  readonly error = signal<string | null>(null);
  readonly errorCode = signal<string | null>(null);

  async run(task: () => Promise<void>): Promise<boolean> {
    if (this.pending()) return false;
    this.pending.set(true);
    this.error.set(null);
    this.errorCode.set(null);
    try {
      await task();
      return true;
    } catch (error) {
      const apiError = error instanceof ApiError ? error : null;
      this.error.set(apiError?.message ?? 'Ha ocurrido un error inesperado.');
      this.errorCode.set(apiError?.code ?? null);
      return false;
    } finally {
      this.pending.set(false);
    }
  }
}
