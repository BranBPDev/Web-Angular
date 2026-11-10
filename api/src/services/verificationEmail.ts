import type { EmailMessage } from './EmailSender';

export function buildVerificationEmail(to: string, code: string, minutes: number): EmailMessage {
  const subject = `${code} es tu código de verificación`;
  const text = `Tu código de verificación de branbp.com es ${code}. Caduca en ${minutes} minutos.`;
  const html = `
<div style="font-family:Arial,sans-serif;max-width:420px;margin:auto;padding:24px;color:#1b1f27">
  <h2 style="margin:0 0 12px">Verifica tu correo</h2>
  <p>Introduce este código en branbp.com para terminar tu registro:</p>
  <p style="font-size:34px;letter-spacing:8px;font-weight:700;margin:20px 0">${code}</p>
  <p style="color:#5b6472;font-size:14px">Caduca en ${minutes} minutos. Si no has sido tú, ignora este mensaje.</p>
</div>`;
  return { to, subject, html, text };
}
