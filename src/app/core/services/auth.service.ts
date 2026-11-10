import { Injectable, computed, inject, signal } from '@angular/core';
import { AppConfig, Session, User } from '../models/auth.models';
import { ApiError, ApiService } from './api.service';
import { TokenStorage } from './token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(ApiService);
  private readonly storage = inject(TokenStorage);

  private readonly currentUser = signal<User | null>(null);
  readonly user = this.currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  /** Se ejecuta al arrancar: recupera la sesión guardada, si sigue siendo válida. */
  async restoreSession(): Promise<void> {
    if (!this.storage.get()) return;
    try {
      const { user } = await this.api.get<{ user: User }>('/auth/me');
      this.currentUser.set(user);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) this.storage.clear();
    }
  }

  async register(email: string, password: string): Promise<void> {
    await this.api.post<unknown>('/auth/register', { email, password });
  }

  async resendCode(email: string): Promise<void> {
    await this.api.post<unknown>('/auth/resend', { email });
  }

  async verify(email: string, code: string): Promise<void> {
    this.startSession(await this.api.post<Session>('/auth/verify', { email, code }));
  }

  async login(email: string, password: string): Promise<void> {
    this.startSession(await this.api.post<Session>('/auth/login', { email, password }));
  }

  async verifyWithGoogle(email: string, idToken: string): Promise<void> {
    this.startSession(await this.api.post<Session>('/auth/google', { email, idToken }));
  }

  loadConfig(): Promise<AppConfig> {
    return this.api.get<AppConfig>('/config');
  }

  logout(): void {
    this.storage.clear();
    this.currentUser.set(null);
  }

  private startSession(session: Session): void {
    this.storage.set(session.token);
    this.currentUser.set(session.user);
  }
}
