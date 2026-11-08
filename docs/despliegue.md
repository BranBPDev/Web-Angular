# Despliegue

- **Dominio:** branbp.com (registrado en Cloudflare, DNS en modo "DNS only").
- **Hosting:** GitHub Pages, origen "GitHub Actions".
- **CNAME:** `public/CNAME` contiene `branbp.com` y se copia al build en cada despliegue.
- **SPA:** el workflow copia `index.html` como `404.html` para que las rutas de Angular no fallen al recargar.
- **Correo:** admin@branbp.com se reenvía con Cloudflare Email Routing.

## Panel de automatización

`testing/run.bat` (se ejecuta como administrador solo) ofrece:

1. Subir cambios a GitHub (commit + pull --rebase + push)
2. Comprobar que https://branbp.com responde
3. Abrir la web en el navegador
4. Completo: subir, esperar al Action, comprobar la web y abrirla
5. Servidor local de desarrollo (`npm start`)

La carpeta `testing/` está en `.gitignore`: no se sube a GitHub.
