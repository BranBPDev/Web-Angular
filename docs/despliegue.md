[Volver al índice](../README.md)

---

# Despliegue

Cómo se publica la web y la API.

---

## Componentes

| Elemento | Detalle |
|---|---|
| Dominio | `branbp.com` en Cloudflare. Los registros A y CNAME de GitHub Pages están en modo "DNS only" |
| Web | GitHub Pages con origen "GitHub Actions" (`.github/workflows/deploy.yml`). `public/CNAME` contiene `branbp.com` |
| API | Worker de Cloudflare en `api.branbp.com` (`.github/workflows/deploy-api.yml`). Ver [Autenticación](autenticacion.md) |
| Correo entrante | `admin@branbp.com`, reenviado con Cloudflare Email Routing |
| Correo saliente | Resend |

---

## Proceso de compilación

- Cada `push` a `main` lanza el workflow correspondiente según los archivos modificados.
- El CSS se minifica en la compilación de producción.
- El workflow copia `index.html` como `404.html` para que las rutas de Angular no fallen al recargar.
- Los cambios solo en `docs/`, `database/`, `testing/` o archivos `.md` no vuelven a desplegar la web.

---

## Orden recomendado con cambios de base de datos

1. Ejecutar la migración nueva en Neon.
2. Subir los cambios (`git push` o el panel de automatización).
3. Comprobar los workflows en la pestaña Actions de GitHub.
