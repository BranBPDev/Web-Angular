import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly api = inject(ApiService);

  /** El servidor confirma que la sesión actual pertenece a un administrador (403 si no). */
  check(): Promise<{ ok: boolean }> {
    return this.api.get<{ ok: boolean }>('/admin/check');
  }
}
