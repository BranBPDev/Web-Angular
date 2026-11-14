[Volver al índice](../README.md)

---

# Estilos

Sistema de diseño de `src/styles.css`, el único archivo de estilos de la web.

**Contenido:** [Principios](#principios) · [Variables](#variables) · [Clases de texto](#clases-de-texto) · [Cabecera fija](#cabecera-fija) · [Secciones del archivo](#secciones-del-archivo)

---

## Principios

- Un solo archivo. En producción Angular lo minifica (`angular.json`, `optimization.styles.minify`) y lo sirve como un único CSS.
- Solo `display: flex`, con `flex-flow`, `align-items` y `justify-content`. No se usa `grid`.
- Ningún valor repetido a mano: colores, tamaños de texto, espaciados y medidas son variables en `:root`.
- Los elementos host de los componentes (`app-*`) se declaran como contenedores flex en la sección Base.

---

## Variables

| Variable | Uso |
|---|---|
| `--color-primary` | Botones, borde de los inputs en foco, iconos |
| `--color-secondary` | Hover de los botones (tono más oscuro que el principal) |
| `--color-accent`, `--color-accent-hover` | Texto destacado y enlaces |
| `--color-bg`, `--color-surface`, `--color-border` | Fondo, tarjetas y bordes |
| `--color-text`, `--color-text-muted` | Texto principal y secundario |
| `--color-danger`, `--color-success` | Estados |
| `--size-title`, `--size-subtitle`, `--size-heading`, `--size-info`, `--size-secondary`, `--size-small` | Tamaños de texto |
| `--space-1` a `--space-7` | Espaciados |
| `--radius-sm`, `--radius-md`, `--radius-pill`, `--shadow-card`, `--transition` | Forma y movimiento |
| `--header-height`, `--content-width`, `--auth-width` | Medidas de estructura |

---

## Clases de texto

| Clase | Tipo de texto |
|---|---|
| `.text-title` | Título de página |
| `.text-subtitle` | Título de tarjeta de acceso o de sección |
| `.text-heading` | Título de bloque |
| `.text-info` | Texto de información |
| `.text-secondary` | Texto secundario |
| `.text-label` | Etiqueta pequeña en mayúsculas |
| `.text-field` | Etiqueta de campo de formulario |
| `.text-error`, `.text-ok` | Mensajes de error y de éxito |
| `.text-strong`, `.text-accent`, `.text-center`, `.text-break` | Modificadores |

---

## Cabecera fija

`.header` es `position: fixed`. Justo detrás va `.header-spacer`, un div vacío con el mismo ancho y alto
(`--header-height`), para que el contenido empiece debajo de la cabecera. Ambos viven en el componente `app-header`.

---

## Secciones del archivo

| N.º | Sección |
|---|---|
| 1 | Variables |
| 2 | Base (reset y elementos host) |
| 3 | Textos |
| 4 | Estructura (layout, cabecera, menú de usuario, pie) |
| 5 | Autenticación |
| 6 | Formularios |
| 7 | Botones y enlaces |
| 8 | Contenido (carrusel, tarjetas, paneles, insignias) |
| 9 | Responsive |
