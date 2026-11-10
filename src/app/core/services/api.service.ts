import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';

export class ApiError extends Error {
  constructor(readonly status: number, readonly code: string, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

interface ErrorBody {
  code?: string;
  message?: string;
}

/** Cliente HTTP único de la aplicación: traduce los errores del servidor a ApiError. */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  get<T>(path: string): Promise<T> {
    return this.request(this.http.get<T>(this.baseUrl + path));
  }

  post<T>(path: string, body: unknown): Promise<T> {
    return this.request(this.http.post<T>(this.baseUrl + path, body));
  }

  private async request<T>(request: Observable<T>): Promise<T> {
    try {
      return await firstValueFrom(request);
    } catch (error) {
      throw this.toApiError(error);
    }
  }

  private toApiError(error: unknown): ApiError {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) return new ApiError(0, 'NETWORK', 'No se pudo conectar con el servidor.');
      const body = error.error as ErrorBody | null;
      return new ApiError(error.status, body?.code ?? 'UNKNOWN', body?.message ?? 'Ha ocurrido un error inesperado.');
    }
    return new ApiError(0, 'UNKNOWN', 'Ha ocurrido un error inesperado.');
  }
}
