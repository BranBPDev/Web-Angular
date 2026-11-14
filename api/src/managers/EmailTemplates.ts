import type { EmailMessage } from './EmailSender';

/**
 * Plantillas de correo de la web. Todas comparten la misma estructura (logo, tarjeta y pie),
 * así que cualquier correo nuevo (p. ej. avisos de administración) solo define su contenido.
 * El logo se sirve desde la propia web: {SITE_URL}/logo.png
 */
export class EmailTemplates {
  private readonly siteUrl: string;

  constructor(siteUrl: string) {
    this.siteUrl = siteUrl.replace(/\/+$/, '');
  }

  verification(to: string, code: string, minutes: number): EmailMessage {
    const content = `
      <h2 style="margin:0 0 12px;font-size:22px;color:#1b1f27">Verifica tu correo</h2>
      <p style="margin:0 0 4px;font-size:15px;line-height:1.5">Introduce este código en branbp.com para terminar tu registro:</p>
      <p style="margin:18px 0;font-size:36px;letter-spacing:8px;font-weight:700;color:#1b1f27">${code}</p>
      <p style="margin:0;font-size:13px;line-height:1.5;color:#5b6472">Caduca en ${minutes} minutos. Si no has sido tú, puedes ignorar este mensaje.</p>`;
    return {
      to,
      subject: `${code} es tu código de verificación`,
      text: `Tu código de verificación de branbp.com es ${code}. Caduca en ${minutes} minutos.`,
      html: this.layout('Verifica tu correo', content),
    };
  }

  passwordChange(to: string, code: string, minutes: number): EmailMessage {
    const content = `
      <h2 style="margin:0 0 12px;font-size:22px;color:#1b1f27">Confirma el cambio de contraseña</h2>
      <p style="margin:0 0 4px;font-size:15px;line-height:1.5">Introduce este código en branbp.com para confirmar el cambio:</p>
      <p style="margin:18px 0;font-size:36px;letter-spacing:8px;font-weight:700;color:#1b1f27">${code}</p>
      <p style="margin:0;font-size:13px;line-height:1.5;color:#5b6472">Caduca en ${minutes} minutos. Si no has sido tú, ignora este mensaje: tu contraseña no cambiará.</p>`;
    return {
      to,
      subject: `${code} es tu código para cambiar la contraseña`,
      text: `Tu código para cambiar la contraseña de branbp.com es ${code}. Caduca en ${minutes} minutos.`,
      html: this.layout('Confirma el cambio de contraseña', content),
    };
  }

  /** Estructura común de todos los correos. Basada en tablas y estilos en línea para máxima compatibilidad. */
  private layout(title: string, content: string): string {
    return `<!doctype html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#f4f6fb">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f6fb;padding:32px 12px">
    <tr><td align="center">
      <table role="presentation" width="440" cellspacing="0" cellpadding="0" style="width:100%;max-width:440px;background:#ffffff;border:1px solid #e3e7ef;border-radius:14px">
        <tr><td style="padding:28px 28px 4px">
          <img src="${this.siteUrl}/logo.png" width="52" alt="branbp.com" style="display:block;border:0;outline:none;height:auto">
        </td></tr>
        <tr><td style="padding:12px 28px 30px;font-family:Arial,Helvetica,sans-serif;color:#1b1f27">${content}</td></tr>
      </table>
      <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8a93a3">© branbp.com</p>
    </td></tr>
  </table>
</body>
</html>`;
  }
}
