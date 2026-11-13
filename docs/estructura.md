[← Volver al índice](../README.md)

# Estructura del proyecto

```
.github/workflows/   deploy.yml (web) · deploy-api.yml (API)
api/                 API (Cloudflare Worker, TypeScript)
  src/config/          env.ts (variables) · security.ts (parámetros de seguridad)
  src/core/            Router, Cors, errores HTTP, BearerAuth, Authorizer (roles)
  src/controllers/     capa HTTP: leen la petición y devuelven la respuesta
  src/managers/        lógica de negocio (AuthManager, EmailSender, EmailTemplates, Google)
  src/daos/            acceso a datos (BaseDao, UserDao, VerificationCodeDao)
  src/models/          entidades (User, Role, VerificationCode)
  src/db/              conexión a Neon
  src/utils/           utilidades genéricas (hash, JWT, HMAC, validación, aleatorios)
database/            schema.sql y migrations/
docs/                documentación (el índice está en README.md)
public/              favicon.ico y logo.png (se copian a la raíz de la web)
src/
  index.html           único HTML con <html>, <head> y <body>
  styles.css           único archivo de estilos
  app/
    config/            constantes y URL de la API
    models/            tipos de datos
    utils/             utilidades genéricas (AsyncAction, Countdown, SafeStorage, errores de formulario…)
    validators/        validadores de formularios
    http/              ApiClient (peticiones) e interceptor del token
    daos/              acceso a la API (AuthDao, AdminDao, SystemDao)
    managers/          estado y lógica (SessionManager, TokenManager, GoogleIdentityManager)
    guards/            authGuard · guestGuard · adminGuard
    components/        piezas reutilizables, cada una con su .ts y su .html
      layout/            header, footer, shell
      ui/                icon, badge, panel, hero, feature-card, info-item
      form/              form-field
      auth/              auth-card
    pages/             una carpeta por página (login, register, verify, home, admin)
    app.routes.ts      todas las rutas
testing/             panel de automatización local (no se sube a GitHub)
```

## Reglas

- **Separación:** HTML (esqueleto) en `.html`, lógica en `.ts` y estilos solo en `styles.css`. Sin `<style>`, `style=""` ni `<script>` dentro de las plantillas.
- **HTML:** todo son `div`. Solo se usan otras etiquetas cuando es imprescindible: `a`, `button`, `form`, `label`, `input`, `img`, `svg`, `router-outlet` y los componentes propios.
- **Componentes:** cada pieza (cabecera, pie, sección, campo…) es un componente; las páginas solo los montan.
- **Capas de la API:** controller → manager → dao. El controller no conoce SQL y el dao no conoce HTTP.
- **Capas del frontend:** page → manager → dao → ApiClient.
- **Sin números mágicos:** parámetros de seguridad en `api/src/config/security.ts`; constantes del frontend en `app/config/app.constants.ts`.
