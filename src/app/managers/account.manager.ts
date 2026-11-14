import { Injectable, inject } from '@angular/core';
import { AccountDao } from '../daos/account.dao';
import { SessionManager } from './session.manager';

/** Operaciones sobre la cuenta del usuario; mantiene sincronizada la sesión. */
@Injectable({ providedIn: 'root' })
export class AccountManager {
  private readonly dao = inject(AccountDao);
  private readonly session = inject(SessionManager);

  async updateName(name: string): Promise<void> {
    const { user } = await this.dao.updateName(name);
    this.session.setUser(user);
  }

  requestPasswordChange(currentPassword: string, newPassword: string): Promise<void> {
    return this.dao.requestPasswordChange(currentPassword, newPassword);
  }

  resendPasswordChange(): Promise<void> {
    return this.dao.resendPasswordChange();
  }

  confirmPasswordChange(code: string): Promise<void> {
    return this.dao.confirmPasswordChange(code);
  }
}
