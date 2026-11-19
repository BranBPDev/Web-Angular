[Volver al índice](../README.md)

---

# Portada

Cómo se compone la portada a partir de secciones activables y cómo funciona el carrusel de proyectos.

**Contenido:** [Secciones activables](#secciones-activables) · [Carrusel de proyectos](#carrusel-de-proyectos) · [Ajustes del carrusel](#ajustes-del-carrusel) · [Experiencia laboral](#experiencia-laboral)

---

## Secciones activables

La portada (`pages/home`) no tiene contenido propio: monta, en orden, las secciones activas de
`src/app/pages/home/home.sections.ts`.

```ts
export const HOME_SECTIONS: readonly HomeSection[] = [
  { id: 'projects', enabled: true, component: ProjectsCarousel },
  { id: 'experience', enabled: true, component: ExperienceSection },
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

Componente `app-projects-carousel`. Se ven tres tarjetas a la vez y la del centro es la activa.

| Elemento | Comportamiento |
|---|---|
| Tarjeta | Ancho fijo: imagen arriba, título debajo y botón de acceso al final |
| Puntos | Uno por proyecto, debajo del carrusel. El del proyecto activo cambia de color. Al pulsar uno, el carrusel muestra ese proyecto |
| Avance automático | Cada 5 segundos. Se pausa con el ratón encima y se reinicia al interactuar |
| Circular | Del último pasa al primero y, hacia atrás, del primero pasa al último |
| Deslizar | Con el dedo o el ratón, a izquierda o derecha |
| Movimiento reducido | Si el sistema lo pide, no avanza solo y la animación es instantánea |

No hay flechas de siguiente y anterior.

---

## Ajustes del carrusel

| Ajuste | Dónde |
|---|---|
| Tiempo entre avances, distancia mínima de deslizamiento | `CAROUSEL` en `src/app/config/app.constants.ts` |
| Ancho de tarjeta, separación y duración de la animación | `--carousel-card-width`, `--carousel-gap` y `--carousel-duration` en `src/styles.css` |

---

## Experiencia laboral

La sección `app-experience-section` muestra la experiencia a continuación del carrusel, con un enlace a su página completa.
Ver [Contenido](contenido.md).
