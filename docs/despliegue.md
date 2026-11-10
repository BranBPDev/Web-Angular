# Despliegue

- **Dominio:** branbp.com (Cloudflare, registros A/CNAME de GitHub Pages en "DNS only").
- **Frontend:** GitHub Pages con origen "GitHub Actions" (`.github/workflows/deploy.yml`).
- **CNAME:** `public/CNAME` contiene `branbp.com`.
- **SPA:** el workflow copia `index.html` como `404.html` para que las rutas de Angular no fallen al recargar.
- **API:** Worker de Cloudflare en `api.branbp.com` (`.github/workflows/deploy-api.yml`). Ver [autenticacion.md](autenticacion.md).
- **Correo entrante:** admin@branbp.com se reenvía con Cloudflare Email Routing.

## Panel de automatización

`testing/run.bat` (pide administrador solo): subir a GitHub, comprobar la web, abrirla, flujo completo y servidor local.
La carpeta `testing/` no se sube a GitHub.
