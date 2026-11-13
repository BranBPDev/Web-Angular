import { Injectable, inject } from '@angular/core';
import { ApiClient } from '../http/api-client';

@Injectable({ providedIn: 'root' })
export class AdminDao {
  private readonly api = inject(ApiClient);

  /** El servidor confirma que la sesión actual pertenece a un administrador (403 si no). */
  async check(): Promise<void> {
    await this.api.get<{ ok: boolean }>('/admin/check');
  }
}
