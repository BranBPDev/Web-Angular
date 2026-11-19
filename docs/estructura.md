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
database/                  schema.sql, migrations/ y seed/
docs/                      documentación (el índice está en README.md)
public/                    favicon.ico, logo.png, projects/ y experience/ (imágenes)
src/
  index.html                 único HTML con <html>, <head> y <body>
  styles.css                 único archivo de estilos
  app/
    config/                  constantes, URL de la API y navegación de la cabecera
    models/                  tipos de datos
    utils/                   utilidades genéricas
    validators/              validadores de formularios
    http/                    cliente HTTP e interceptor del token
    daos/                    acceso a la API
    managers/                estado y lógica de la aplicación
    guards/                  protección de rutas
    layouts/                 estructura común de páginas (cabecera, migas, contenido, pie)
    components/              piezas reutilizables, cada una con su .ts y su .html
      layout/                  header, user-menu, breadcrumbs, footer
      ui/                      icon, badge, panel, hero, info-item, section-header, remote-state
      form/                    form-field
      auth/                    auth-card
      home/                    projects-carousel, project-card, experience-section
      projects/                project-list
      experience/              experience-list, experience-item
      account/                 account-profile, account-password
    pages/                   home, projects, experience, account, admin, login, register, verify
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
| Layout | Cabecera, migas de pan y pie se definen una sola vez en `layouts/main-layout` y se aplican por ruta. |
| Datos | El contenido (proyectos, experiencia) vive en la base de datos y se carga por la API. |
| Constantes | Parámetros de seguridad en `api/src/config/security.ts`; constantes del frontend en `app/config/`. |
| Reutilización | Lo repetido se extrae a `utils/` o a un componente (`AsyncAction`, `Countdown`, `RemoteList`, `RepeatingTimer`, `FormField`, `RemoteState`, `CodeManager`). |
| Contratos | Lo intercambiable se programa contra una interfaz (`EmailSender`). |
