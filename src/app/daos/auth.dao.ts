import { Injectable, inject } from '@angular/core';
import { ApiClient } from '../http/api-client';
import { Session, User } from '../models/auth.models';

/** Acceso a los endpoints de autenticación de la API. */
@Injectable({ providedIn: 'root' })
export class AuthDao {
  private readonly api = inject(ApiClient);

  me(): Promise<{ user: User }> {
    return this.api.get<{ user: User }>('/auth/me');
  }

  async register(email: string, password: string): Promise<void> {
    await this.api.post<unknown>('/auth/register', { email, password });
  }

  async resendCode(email: string): Promise<void> {
    await this.api.post<unknown>('/auth/resend', { email });
  }

  verify(email: string, code: string): Promise<Session> {
    return this.api.post<Session>('/auth/verify', { email, code });
  }

  login(email: string, password: string): Promise<Session> {
    return this.api.post<Session>('/auth/login', { email, password });
  }

  verifyWithGoogle(email: string, idToken: string): Promise<Session> {
    return this.api.post<Session>('/auth/google', { email, idToken });
  }
}
