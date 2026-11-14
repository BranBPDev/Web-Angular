import { Injectable, inject } from '@angular/core';
import { ApiClient } from '../http/api-client';
import { User } from '../models/auth.models';

/** Acceso a los endpoints de la cuenta del usuario. */
@Injectable({ providedIn: 'root' })
export class AccountDao {
  private readonly api = inject(ApiClient);

  updateName(name: string): Promise<{ user: User }> {
    return this.api.post<{ user: User }>('/account/name', { name });
  }

  async requestPasswordChange(currentPassword: string, newPassword: string): Promise<void> {
    await this.api.post<unknown>('/account/password/request', { currentPassword, newPassword });
  }

  async resendPasswordChange(): Promise<void> {
    await this.api.post<unknown>('/account/password/resend', {});
  }

  async confirmPasswordChange(code: string): Promise<void> {
    await this.api.post<unknown>('/account/password/confirm', { code });
  }
}
