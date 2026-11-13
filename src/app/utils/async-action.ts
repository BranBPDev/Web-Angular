import { signal } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ApiError } from '../http/api-client';

/** Estado reutilizable de una acción asíncrona (enviando, error). Lo comparten todos los formularios. */
export class AsyncAction {
  readonly pending = signal(false);
  readonly error = signal<string | null>(null);
  readonly errorCode = signal<string | null>(null);

  /** Ejecuta la tarea evitando dobles envíos. Devuelve true si terminó sin error. */
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

  /** Como run(), pero antes valida el formulario y marca los campos erróneos. */
  async submit(form: AbstractControl, task: () => Promise<void>): Promise<boolean> {
    if (form.invalid) {
      form.markAllAsTouched();
      return false;
    }
    return this.run(task);
  }
}
