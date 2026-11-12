import { Injectable } from '@angular/core';
import { SafeStorage } from '../../shared/utils/safe-storage';
import { TOKEN_STORAGE_KEY } from '../config/app.constants';

@Injectable({ providedIn: 'root' })
export class TokenStorage {
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
