[Volver al índice](../README.md)

---

# Rutas de la web

Mapa de URL y convención para añadir páginas nuevas. Todas se declaran en `src/app/app.routes.ts`.

**Contenido:** [Mapa de rutas](#mapa-de-rutas) · [Convención](#convención) · [Añadir una página](#añadir-una-página)

---

## Mapa de rutas

| URL | Página | Acceso | Cabecera y pie | Migas de pan |
|---|---|---|---|---|
| `/` | Portada | Con sesión | Sí | No (es la página padre) |
| `/projects` | Proyectos | Con sesión | Sí | Inicio > Proyectos |
| `/experience` | Experiencia laboral | Con sesión | Sí | Inicio > Experiencia |
| `/account` | Mi cuenta | Con sesión | Sí | Inicio > Mi cuenta |
| `/admin` | Administración | Administrador | Sí | Inicio > Administración |
| `/login` | Iniciar sesión | Sin sesión | No | No |
| `/register` | Crear cuenta | Sin sesión | No | No |
| `/verify` | Verificar correo (`?email=`) | Sin sesión | No | No |

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

## Añadir una página

1. Crear la página en `src/app/pages/<nombre>/`.
2. Añadir su ruta como hija de la ruta con `MainLayout`, con `data: { breadcrumb: 'Etiqueta' }`.
3. Si debe aparecer en la cabecera, añadir una línea en `src/app/config/nav.config.ts`.

La cabecera, el pie y las migas de pan se aplican solos. Ver [Navegación](navegacion.md).
