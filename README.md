# branbp.com

Web en Angular publicada automáticamente en https://branbp.com mediante GitHub Pages.

## Desarrollo

```
npm install
npm start
```

## Despliegue

Cada `push` a `main` lanza el workflow `.github/workflows/deploy.yml`, que compila y publica la web.
Más detalles en [docs/despliegue.md](docs/despliegue.md).
