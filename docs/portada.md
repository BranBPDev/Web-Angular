[Volver al índice](../README.md)

---

# Portada

Cómo se compone la portada a partir de secciones activables y cómo gestionar el carrusel de proyectos.

**Contenido:** [Secciones activables](#secciones-activables) · [Carrusel de proyectos](#carrusel-de-proyectos) · [Añadir o editar un proyecto](#añadir-o-editar-un-proyecto)

---

## Secciones activables

La portada (`pages/home`) no tiene contenido propio: monta, en orden, las secciones activas de
`src/app/pages/home/home.sections.ts`.

```ts
export const HOME_SECTIONS: readonly HomeSection[] = [
  { id: 'projects', enabled: true, component: ProjectsCarousel },
];
```

| Acción | Cómo |
|---|---|
| Desactivar una sección | Poner `enabled: false` |
| Activarla de nuevo | Poner `enabled: true` |
| Cambiar el orden | Cambiar el orden de las líneas |
| Añadir una sección nueva | Crear su componente en `components/home/` y añadir una línea con su `id` y `component` |

---

## Carrusel de proyectos

Componente `app-projects-carousel`. Cada tarjeta (`app-project-card`) muestra una imagen, el nombre del proyecto
y un botón que abre el enlace en una pestaña nueva.

| Elemento | Detalle |
|---|---|
| Navegación | Flechas anterior y siguiente (se desactivan en los extremos), deslizar con el dedo o con la rueda |
| Tarjetas visibles | 3 en escritorio, 2 en tablet y 1 con avance de la siguiente en móvil |
| Datos | `src/app/config/projects.config.ts` |
| Imágenes | `public/projects/` |

---

## Añadir o editar un proyecto

1. Guardar la captura en `public/projects/` (formato 16:9, recomendado 1280 x 720 px, JPG).
2. Añadir una entrada en `src/app/config/projects.config.ts`:

```ts
{ name: 'creiss.es', url: 'https://creiss.es', image: '/projects/creiss.jpg', kind: 'web' },
```

| Campo | Valores |
|---|---|
| `name` | Texto que se muestra en la tarjeta |
| `url` | Enlace al sitio o al repositorio |
| `image` | Ruta de la captura, empezando por `/projects/` |
| `kind` | `web` (botón "Visitar web") o `repo` (botón "Ver repositorio") |

Las imágenes actuales de `public/projects/` son marcadores de posición. Se sustituyen por capturas reales
guardándolas con el mismo nombre de archivo.
