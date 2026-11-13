[← Volver al índice](../README.md)

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

## Roles

Hay dos roles: `user` (usuario común, el valor por defecto) y `admin`.

- Todo registro nuevo es `user`. La API ignora cualquier campo de rol que envíe el cliente.
- La única forma de crear un administrador es en la base de datos:
  `update users set role = 'admin' where email = 'correo@ejemplo.com';`
- El servidor lee el rol **de la base de datos en cada petición** (`Authorizer.requireRole`), no del token,
  así que un cambio de rol se aplica al instante. La interfaz lo refleja al recargar.
- Los guards de Angular (`adminGuard`) son solo comodidad de la interfaz; la seguridad real está en el servidor.

## Correos

Todos comparten la plantilla de `EmailTemplates` (logo, tarjeta y pie). El logo se carga desde `{SITE_URL}/logo.png`,
por lo que depende de que la web esté desplegada.
