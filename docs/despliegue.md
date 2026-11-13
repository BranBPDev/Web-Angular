[← Volver al índice](../README.md)

# Despliegue

- **Dominio:** branbp.com (Cloudflare; registros A y CNAME de GitHub Pages en "DNS only").
- **Web:** GitHub Pages con origen "GitHub Actions" (`.github/workflows/deploy.yml`). `public/CNAME` contiene `branbp.com`.
- **SPA:** el workflow copia `index.html` como `404.html` para que las rutas de Angular no fallen al recargar.
- **CSS:** `styles.css` se minifica en la compilación de producción.
- **API:** Worker de Cloudflare en `api.branbp.com` (`.github/workflows/deploy-api.yml`). Ver [Autenticación](autenticacion.md).
- **Correo entrante:** admin@branbp.com se reenvía con Cloudflare Email Routing.
- **Correo saliente:** Resend.
