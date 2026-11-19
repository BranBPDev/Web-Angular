import { Signal, signal } from '@angular/core';
import { ApiError } from '../http/api-client';

/** Lo que necesita un componente para mostrar el estado de una lista remota. */
export interface RemoteState {
  readonly items: Signal<readonly unknown[]>;
  readonly loading: Signal<boolean>;
  readonly error: Signal<string | null>;
}

/** Lista cargada desde la API una sola vez, con su estado de carga y de error. */
export class RemoteList<T> implements RemoteState {
  private readonly data = signal<readonly T[]>([]);
  private readonly isLoading = signal(false);
  private readonly failure = signal<string | null>(null);
  private loaded = false;

  readonly items = this.data.asReadonly();
  readonly loading = this.isLoading.asReadonly();
  readonly error = this.failure.asReadonly();

  constructor(private readonly fetch: () => Promise<readonly T[]>) {}

  async load(): Promise<void> {
    if (this.loaded || this.isLoading()) return;
    this.isLoading.set(true);
    this.failure.set(null);
    try {
      this.data.set(await this.fetch());
      this.loaded = true;
    } catch (error) {
      this.failure.set(error instanceof ApiError ? error.message : 'No se pudo cargar el contenido.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
