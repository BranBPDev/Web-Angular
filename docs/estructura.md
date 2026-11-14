[Volver al índice](../README.md)

---

# Estructura del proyecto

Organización de carpetas, capas y reglas de código.

**Contenido:** [Vista general](#vista-general) · [Capas](#capas) · [Reglas de código](#reglas-de-código)

---

## Vista general

```text
.github/workflows/         deploy.yml (web) · deploy-api.yml (API)
api/                       API (Cloudflare Worker, TypeScript)
  src/config/                variables de entorno y parámetros de seguridad
  src/core/                  router, CORS, errores HTTP, autenticación y autorización
  src/controllers/           capa HTTP
  src/managers/              lógica de negocio
  src/daos/                  acceso a datos
  src/models/                entidades
  src/db/                    conexión a Neon
  src/utils/                 utilidades genéricas
database/                  schema.sql y migrations/
docs/                      documentación (el índice está en README.md)
public/                    favicon.ico, logo.png y projects/ (capturas del carrusel)
src/
  index.html                 único HTML con <html>, <head> y <body>
  styles.css                 único archivo de estilos
  app/
    config/                  constantes, URL de la API y proyectos del carrusel
    models/                  tipos de datos
    utils/                   utilidades genéricas
    validators/              validadores de formularios
    http/                    cliente HTTP e interceptor del token
    daos/                    acceso a la API
    managers/                estado y lógica de la aplicación
    guards/                  protección de rutas
    layouts/                 estructura común de páginas (cabecera, contenido, pie)
    components/              piezas reutilizables, cada una con su .ts y su .html
      layout/                  header, user-menu, footer
      ui/                      icon, badge, panel, hero, info-item
      form/                    form-field
      auth/                    auth-card
      home/                    projects-carousel, project-card
      account/                 account-profile, account-password
    pages/                   home, account, admin, login, register, verify
    app.routes.ts            todas las rutas
testing/                   panel de automatización local (no se sube a GitHub)
```

---

## Capas

| Capa | Frontend (`src/app`) | API (`api/src`) |
|---|---|---|
| Presentación | `pages/`, `components/`, `layouts/` | `controllers/` |
| Lógica | `managers/` | `managers/` |
| Acceso a datos | `daos/` + `http/` | `daos/` + `db/` |
| Transversal | `utils/`, `validators/`, `guards/`, `config/`, `models/` | `utils/`, `core/`, `config/`, `models/` |

Flujo en el frontend: página, manager, dao, cliente HTTP.
Flujo en la API: controller, manager, dao.
Cada capa solo conoce a la inmediatamente inferior.

---

## Reglas de código

| Regla | Detalle |
|---|---|
| Separación | HTML en `.html`, lógica en `.ts` y estilos solo en `styles.css`. Sin `<style>`, `style=""` ni `<script>` en las plantillas. |
| Etiquetas | Todo son `div`. Solo se usan otras etiquetas cuando es imprescindible: `a`, `button`, `form`, `label`, `input`, `img`, `svg`, `router-outlet` y los componentes propios. |
| Componentes | Cada pieza (cabecera, pie, sección, campo, tarjeta) es un componente. Las páginas solo los montan. |
| Layout | La cabecera y el pie se definen una sola vez en `layouts/main-layout` y se aplican por ruta. |
| Constantes | Parámetros de seguridad en `api/src/config/security.ts`; constantes del frontend en `app/config/`. |
| Reutilización | Lo repetido se extrae a `utils/` o a un componente (`AsyncAction`, `Countdown`, `SafeStorage`, `FormField`, `CodeManager`). |
| Contratos | Lo intercambiable se programa contra una interfaz (`EmailSender`). |
