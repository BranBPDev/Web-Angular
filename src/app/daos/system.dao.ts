import { Injectable, inject } from '@angular/core';
import { ApiClient } from '../http/api-client';
import { AppConfig } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class SystemDao {
  private readonly api = inject(ApiClient);

  config(): Promise<AppConfig> {
    return this.api.get<AppConfig>('/config');
  }
}
