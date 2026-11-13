import { Injectable } from '@angular/core';
import { TOKEN_STORAGE_KEY } from '../config/app.constants';
import { SafeStorage } from '../utils/safe-storage';

/** Guarda el token de sesión en el navegador. */
@Injectable({ providedIn: 'root' })
export class TokenManager {
  private readonly store = new SafeStorage(TOKEN_STORAGE_KEY);

  get(): string | null {
    return this.store.get();
  }

  set(token: string): void {
    this.store.set(token);
  }

  clear(): void {
    this.store.clear();
  }
}
