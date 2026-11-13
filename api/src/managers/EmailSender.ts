import { HttpError } from '../core/errors';

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
}

/** Contrato para enviar correo: permite cambiar de proveedor sin tocar el resto. */
export interface EmailSender {
  send(message: EmailMessage): Promise<void>;
}

export class ResendEmailSender implements EmailSender {
  constructor(private readonly apiKey: string, private readonly from: string) {}

  async send(message: EmailMessage): Promise<void> {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: this.from, to: [message.to], subject: message.subject, html: message.html, text: message.text }),
    });
    if (!response.ok) {
      console.error('Resend error', response.status, await response.text());
      throw new HttpError(502, 'EMAIL_FAILED', 'No se pudo enviar el correo de verificación. Inténtalo de nuevo.');
    }
  }
}
