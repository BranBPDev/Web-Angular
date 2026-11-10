import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenStorage {
  private static readonly KEY = 'branbp.token';

  get(): string | null {
    try {
      return localStorage.getItem(TokenStorage.KEY);
    } catch {
      return null;
    }
  }

  set(token: string): void {
    try {
      localStorage.setItem(TokenStorage.KEY, token);
    } catch {
      /* almacenamiento no disponible */
    }
  }

  clear(): void {
    try {
      localStorage.removeItem(TokenStorage.KEY);
    } catch {
      /* almacenamiento no disponible */
    }
  }
}
