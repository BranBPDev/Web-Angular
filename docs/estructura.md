# Estructura del proyecto

```
.github/workflows/   deploy.yml (web) · deploy-api.yml (API)
api/                 API (Cloudflare Worker, TypeScript)
  src/config/          env.ts (variables) · security.ts (parámetros de seguridad)
  src/core/            Router, Cors, errores HTTP, BearerAuth, Authorizer (roles)
  src/controllers/     capa HTTP: leen la petición y devuelven la respuesta
  src/services/        lógica de negocio (AuthService, EmailSender, EmailTemplates, Google)
  src/daos/            acceso a datos (BaseDao, UserDao, VerificationCodeDao)
  src/models/          entidades (User, Role, VerificationCode)
  src/db/              conexión a Neon
  src/utils/           utilidades genéricas (hash, JWT, HMAC, validación, aleatorios)
database/            schema.sql y migrations/
docs/                documentación
public/              favicon.ico y logo.png (se copian a la raíz de la web)
src/
  styles.css           solo @import de src/styles/*.css
  styles/              tokens · base · buttons · forms · auth · layout · content
  app/
    core/              lo que usa toda la app
      config/            API_BASE_URL y constantes (rutas, reglas de contraseña…)
      guards/            authGuard · guestGuard · adminGuard
      interceptors/      añade el token a las peticiones a la API
      models/            tipos de la API
      services/          ApiService, AuthService, AdminService, Google…
      utils/             AsyncAction (estado de envío/errores de formularios)
    shared/            piezas reutilizables sin lógica de negocio
      components/        FormField, AuthCard, AppShell, SiteHeader, SiteFooter, Icon
      utils/             Countdown, SafeStorage, controlError, ROLE_LABELS
      validators/        validadores de formularios
    features/          una carpeta por funcionalidad
      auth/              login · register · verify
      home/              portada
      admin/             panel de administración (futuro CMS)
testing/             panel de automatización local (no se sube a GitHub)
```

## Reglas de organización

- **Capas de la API:** controller → service → dao. El controller no conoce SQL y el dao no conoce HTTP.
- **Sin números mágicos:** los parámetros de seguridad viven en `api/src/config/security.ts` y las constantes del frontend en `core/config/app.constants.ts`.
- **Lo repetido se extrae:** `AsyncAction.submit()` (validar + enviar), `Countdown`, `SafeStorage`, `FormField` (campo con error y botón de ver contraseña) y `AppShell` (cabecera + pie) se reutilizan en varias pantallas.
- **Interfaces para lo intercambiable:** `EmailSender` permite cambiar de proveedor de correo sin tocar `AuthService`.
