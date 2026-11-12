# branbp.com

Web en Angular publicada en https://branbp.com (GitHub Pages) con API propia en https://api.branbp.com (Cloudflare Worker + Neon).

- `src/` – frontend Angular (`core/`, `shared/`, `features/`)
- `api/` – API de autenticación (Worker de Cloudflare, TypeScript)
- `database/schema.sql` – esquema de Neon
- `docs/` – documentación

## Desarrollo

```
npm install
npm start
```

El frontend local usa la API de producción (CORS permite `http://localhost:4200`).
Más detalles en [docs/estructura.md](docs/estructura.md), [docs/autenticacion.md](docs/autenticacion.md) y [docs/despliegue.md](docs/despliegue.md).
