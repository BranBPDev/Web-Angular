import { Injectable, inject } from '@angular/core';
import { SystemDao } from '../daos/system.dao';

interface CredentialResponse {
  credential: string;
}

interface GoogleAccountsId {
  initialize(config: {
    client_id: string;
    callback: (response: CredentialResponse) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
  }): void;
  renderButton(parent: HTMLElement, options: Record<string, string | number>): void;
  prompt(): void;
  cancel(): void;
}

declare global {
  interface Window {
    google?: { accounts: { id: GoogleAccountsId } };
  }
}

/** Carga Google Identity Services y muestra One Tap + botón de Google. */
@Injectable({ providedIn: 'root' })
export class GoogleIdentityManager {
  private readonly system = inject(SystemDao);
  private loading?: Promise<GoogleAccountsId>;

  /** Devuelve false si Google no está configurado en el servidor. */
  async attach(button: HTMLElement, onCredential: (idToken: string) => void): Promise<boolean> {
    const { googleClientId } = await this.system.config();
    if (!googleClientId) return false;

    const gsi = await this.load();
    gsi.initialize({
      client_id: googleClientId,
      callback: (response) => onCredential(response.credential),
      auto_select: true,
      cancel_on_tap_outside: false,
    });
    gsi.renderButton(button, { type: 'standard', theme: 'outline', size: 'large', text: 'continue_with', locale: 'es', width: 280 });
    gsi.prompt();
    return true;
  }

  cancel(): void {
    window.google?.accounts.id.cancel();
  }

  private load(): Promise<GoogleAccountsId> {
    this.loading ??= new Promise<GoogleAccountsId>((resolve, reject) => {
      if (window.google) {
        resolve(window.google.accounts.id);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => (window.google ? resolve(window.google.accounts.id) : reject(new Error('Google no disponible')));
      script.onerror = () => reject(new Error('No se pudo cargar Google'));
      document.head.appendChild(script);
    }).catch((error: unknown) => {
      this.loading = undefined;
      throw error;
    });
    return this.loading;
  }
}
