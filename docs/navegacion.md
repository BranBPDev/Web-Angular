[Volver al índice](../README.md)

---

# Navegación

Lista de páginas de la cabecera y migas de pan automáticas.

**Contenido:** [Cabecera](#cabecera) · [Migas de pan](#migas-de-pan) · [Etiquetas dinámicas](#etiquetas-dinámicas) · [Dónde está el código](#dónde-está-el-código)

---

## Cabecera

La cabecera (`components/layout/header`) es fija y muestra, de izquierda a derecha: logo, lista de páginas e icono de usuario.
La lista sale de `src/app/config/nav.config.ts`:

```ts
export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Proyectos', path: APP_ROUTES.projects },
  { label: 'Experiencia', path: APP_ROUTES.experience },
];
```

La página actual se resalta sola (`routerLinkActive`), incluidas sus subpáginas.

---

## Migas de pan

El componente `app-breadcrumbs` va en `MainLayout`, justo debajo de la cabecera y antes del contenido.
Se generan solas a partir de las rutas activas, sin escribirlas una a una.

| Situación | Resultado |
|---|---|
| `/` | No se muestran (solo hay un nivel) |
| `/projects` | Inicio > Proyectos |
| `/projects/x` | Inicio > Proyectos > x |
| `/login`, `/register`, `/verify` | No se muestran (no usan `MainLayout`) |

Cada ruta decide su etiqueta con `data.breadcrumb`. Una ruta sin ese dato no aparece en las migas.

---

## Etiquetas dinámicas

Para rutas con parámetros (por ejemplo, el detalle de un proyecto) la etiqueta puede ser una función:

```ts
{
  path: ':slug',
  data: { breadcrumb: (route: ActivatedRouteSnapshot) => route.params['slug'] },
  loadComponent: () => import('./pages/project-detail/project-detail').then((m) => m.ProjectDetail),
}
```

---

## Dónde está el código

| Pieza | Archivo |
|---|---|
| Construcción de las migas | `src/app/managers/breadcrumb.manager.ts` |
| Componente | `src/app/components/layout/breadcrumbs/` |
| Rutas y etiquetas | `src/app/app.routes.ts` |
