[Volver al índice](../README.md)

---

# Autenticación y cuenta

Registro, verificación, inicio de sesión, roles y gestión de la cuenta del usuario.

**Contenido:** [Arquitectura](#arquitectura) · [Contraseñas y códigos](#contraseñas-y-códigos) · [Registro y verificación](#registro-y-verificación) · [Cambio de contraseña](#cambio-de-contraseña) · [Roles](#roles) · [Endpoints](#endpoints) · [Secretos](#secretos) · [Correos](#correos)

---

## Arquitectura

```text
Navegador (branbp.com, Angular)  ->  api.branbp.com (Worker)  ->  Neon (PostgreSQL)
                                          |
                                          +-> Resend (correo con código)
                                          +-> Google (verificación automática)
```

GitHub Pages solo sirve archivos estáticos, así que la base de datos nunca se toca desde el navegador:
la cadena de conexión de Neon vive únicamente como secreto del Worker.

---

## Contraseñas y códigos

| Dato | Cómo se guarda |
|---|---|
| Contraseña | Hash PBKDF2-SHA256 con sal aleatoria (100 000 iteraciones). Es de una sola vía: no se puede descifrar. En el login se calcula el hash de lo escrito y se compara en tiempo constante. |
| Código de verificación | HMAC ligado al usuario y a su finalidad. El código en claro no se almacena. |
| Sesión | JWT HS256 de 7 días. |

Parámetros (longitud del código, caducidad, intentos, esperas): `api/src/config/security.ts`.

---

## Registro y verificación

1. `POST /api/auth/register` crea el usuario sin verificar y envía un código de 6 dígitos (caduca en 15 minutos).
2. El usuario verifica su correo de una de estas formas:
   - Con el código: `POST /api/auth/verify` (máximo 5 intentos).
   - Con Google: `POST /api/auth/google`. Si la cuenta de Google abierta en el navegador coincide con el correo del registro, se verifica sola.
3. `POST /api/auth/login` solo admite usuarios verificados.

---

## Cambio de contraseña

Se hace desde `/account`, en dos pasos, con la misma idea que el registro.

| Paso | Qué ocurre |
|---|---|
| 1. Solicitud | El usuario indica la contraseña actual y la nueva (dos veces). La API comprueba la actual, guarda el hash de la nueva junto al código y envía el código por correo. |
| 2. Confirmación | El usuario introduce el código. Si es correcto, se aplica la contraseña nueva. |

El código se puede reenviar (espera de 60 segundos) sin volver a escribir las contraseñas.
Mientras no se confirme el código, la contraseña actual sigue siendo válida.

---

## Roles

Hay dos roles: `user` (usuario común, el valor por defecto) y `admin`.

- Todo registro nuevo es `user`. La API ignora cualquier campo de rol que envíe el cliente.
- La única forma de crear un administrador es en la base de datos (ver [Base de datos](base-de-datos.md)).
- El servidor lee el rol de la base de datos en cada petición (`Authorizer.requireRole`), no del token:
  un cambio de rol se aplica al instante. La interfaz lo refleja al recargar la página.
- `adminGuard` en Angular es solo una comodidad de la interfaz; la seguridad real está en el servidor.

---

## Endpoints

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| GET | `/api/health` | Público | Estado de la API |
| GET | `/api/config` | Público | Client ID de Google |
| POST | `/api/auth/register` | Público | Crear cuenta y enviar código |
| POST | `/api/auth/resend` | Público | Reenviar código de verificación |
| POST | `/api/auth/verify` | Público | Verificar con código |
| POST | `/api/auth/google` | Público | Verificar con Google |
| POST | `/api/auth/login` | Público | Iniciar sesión |
| GET | `/api/auth/me` | Sesión | Usuario de la sesión |
| POST | `/api/account/name` | Sesión | Cambiar el nombre |
| POST | `/api/account/password/request` | Sesión | Solicitar cambio de contraseña |
| POST | `/api/account/password/resend` | Sesión | Reenviar el código del cambio |
| POST | `/api/account/password/confirm` | Sesión | Confirmar el cambio con el código |
| GET | `/api/admin/check` | Administrador | Comprobar el rol en el servidor |

---

## Secretos

Se crean en GitHub, en Settings, Secrets and variables, Actions.

| Secreto | Contenido |
|---|---|
| `NEON_DATABASE_URL` | Cadena de conexión de Neon |
| `JWT_SECRET` | Cadena aleatoria larga para firmar las sesiones |
| `RESEND_API_KEY` | Clave de API de Resend |
| `GOOGLE_CLIENT_ID` | Client ID OAuth (tipo Web) de Google Cloud |
| `CLOUDFLARE_API_TOKEN` | Token con la plantilla "Edit Cloudflare Workers" |
| `CLOUDFLARE_ACCOUNT_ID` | Identificador de la cuenta de Cloudflare |

---

## Correos

Todos comparten la plantilla de `EmailTemplates` (logo, tarjeta y pie). El logo se carga desde `{SITE_URL}/logo.png`,
por lo que depende de que la web esté desplegada.
