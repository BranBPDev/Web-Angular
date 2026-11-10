# Autenticación

## Arquitectura

```
Navegador (branbp.com, Angular)  ──HTTPS──►  api.branbp.com (Worker)  ──HTTP──►  Neon (PostgreSQL)
                                                   │
                                                   ├─► Resend (correo con código)
                                                   └─► Google (valida la cuenta para verificar al instante)
```

GitHub Pages es hosting estático, así que la base de datos nunca se toca desde el navegador:
la cadena de Neon vive solo como secreto del Worker.

## Contraseñas

Se guardan con **PBKDF2-SHA256 + sal aleatoria** (100 000 iteraciones). Es un hash de una sola vía:
no se descifra; en el login se calcula el hash de lo escrito y se compara en tiempo constante.
Los códigos de verificación también se guardan como HMAC, nunca en claro.

## Flujo

1. `POST /api/auth/register` → crea el usuario sin verificar y envía un código de 6 dígitos (caduca en 15 min).
2. Verificación (cualquiera de las dos):
   - `POST /api/auth/verify` con el código (máx. 5 intentos).
   - `POST /api/auth/google` con el ID token de Google: si la cuenta de Google es la del registro, se verifica sola.
3. `POST /api/auth/login` → solo usuarios verificados. Devuelve un JWT (7 días).
4. `GET /api/auth/me` → usuario de la sesión (cabecera `Authorization: Bearer`).

Otros: `POST /api/auth/resend` (cooldown 60 s), `GET /api/config`, `GET /api/health`.

## Secretos (GitHub → Settings → Secrets and variables → Actions)

| Secret | Contenido |
|---|---|
| `NEON_DATABASE_URL` | Cadena de conexión de Neon |
| `JWT_SECRET` | Cadena aleatoria larga para firmar sesiones |
| `RESEND_API_KEY` | API key de Resend |
| `GOOGLE_CLIENT_ID` | Client ID OAuth (tipo Web) de Google Cloud |
| `CLOUDFLARE_API_TOKEN` | Token con plantilla "Edit Cloudflare Workers" |
| `CLOUDFLARE_ACCOUNT_ID` | ID de la cuenta de Cloudflare |
