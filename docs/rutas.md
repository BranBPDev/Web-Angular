[← Volver al índice](../README.md)

# Rutas de la web

La URL refleja la jerarquía de la página. Todas se declaran en `src/app/app.routes.ts`.

| URL | Página | Acceso |
|---|---|---|
| `/` | Portada | Con sesión |
| `/login` | Iniciar sesión | Sin sesión |
| `/register` | Crear cuenta | Sin sesión |
| `/verify` | Verificar correo (`?email=`) | Sin sesión |
| `/admin` | Panel de administración | Admin |

## Convención

- Una página nueva `x` → `/x`.
- Subpáginas encadenadas → `/x/loQueSea`, declaradas como `children` de la ruta `x`.
- Las rutas no existentes redirigen a `/`.
