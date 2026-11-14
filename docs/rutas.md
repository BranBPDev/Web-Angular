[Volver al índice](../README.md)

---

# Rutas de la web

Mapa de URL y convención para añadir páginas nuevas. Todas se declaran en `src/app/app.routes.ts`.

**Contenido:** [Mapa de rutas](#mapa-de-rutas) · [Convención](#convención) · [Layout común](#layout-común)

---

## Mapa de rutas

| URL | Página | Acceso | Cabecera y pie |
|---|---|---|---|
| `/` | Portada | Con sesión | Sí |
| `/account` | Mi cuenta | Con sesión | Sí |
| `/admin` | Administración | Administrador | Sí |
| `/login` | Iniciar sesión | Sin sesión | No |
| `/register` | Crear cuenta | Sin sesión | No |
| `/verify` | Verificar correo (`?email=`) | Sin sesión | No |

Las rutas que no existen redirigen a `/`.

---

## Convención

La URL refleja la jerarquía de la página.

| Caso | URL |
|---|---|
| Página nueva `x` | `/x` |
| Subpágina de `x` | `/x/loQueSea` |
| Sub-subpágina | `/x/loQueSea/otra` |

Las subpáginas se declaran como `children` de la ruta `x`.

---

## Layout común

Las páginas con sesión cuelgan de una ruta padre con `MainLayout`, que aporta la cabecera y el pie una sola vez.
Para que una página nueva los tenga, se añade como hija de esa ruta. Las pantallas de acceso se declaran fuera
del padre y por eso no los muestran.
