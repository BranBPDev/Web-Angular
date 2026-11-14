import { Injectable, computed, inject, signal } from '@angular/core';
import { AuthDao } from '../daos/auth.dao';
import { ApiError } from '../http/api-client';
import { Session, User } from '../models/auth.models';
import { TokenManager } from './token.manager';

/** Estado de la sesión del usuario y operaciones que la modifican. */
@Injectable({ providedIn: 'root' })
export class SessionManager {
  private readonly auth = inject(AuthDao);
  private readonly tokens = inject(TokenManager);

  private readonly currentUser = signal<User | null>(null);
  readonly user = this.currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');

  /** Se ejecuta al arrancar: recupera la sesión guardada, si sigue siendo válida. */
  async restoreSession(): Promise<void> {
    if (!this.tokens.get()) return;
    try {
      this.currentUser.set((await this.auth.me()).user);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) this.tokens.clear();
    }
  }

  register(email: string, password: string): Promise<void> {
    return this.auth.register(email, password);
  }

  resendCode(email: string): Promise<void> {
    return this.auth.resendCode(email);
  }

  async verify(email: string, code: string): Promise<void> {
    this.start(await this.auth.verify(email, code));
  }

  async login(email: string, password: string): Promise<void> {
    this.start(await this.auth.login(email, password));
  }

  async verifyWithGoogle(email: string, idToken: string): Promise<void> {
    this.start(await this.auth.verifyWithGoogle(email, idToken));
  }

  /** Actualiza los datos del usuario con sesión (p. ej. tras editar el nombre). */
  setUser(user: User): void {
    this.currentUser.set(user);
  }

  logout(): void {
    this.tokens.clear();
    this.currentUser.set(null);
  }

  private start(session: Session): void {
    this.tokens.set(session.token);
    this.currentUser.set(session.user);
  }
}
