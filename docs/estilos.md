[← Volver al índice](../README.md)

# Estilos (CSS)

Todo el CSS está en `src/styles.css`. En la compilación de producción Angular lo minifica
(`angular.json` → `optimization.styles.minify`) y lo sirve como un único archivo.

## Reglas

- Solo `display: flex` (con `flex-flow`, `align-items` y `justify-content`). No se usa `grid`.
- Ningún valor repetido a mano: colores, tamaños de texto, espaciados y medidas son variables en `:root`.
- Los elementos host de los componentes (`app-*`) se declaran como contenedores flex en la sección *Base*.

## Variables

| Variable | Uso |
|---|---|
| `--color-primary` | Botones, borde de los inputs en foco, iconos |
| `--color-secondary` | Hover de los botones (tono más oscuro que el principal) |
| `--color-accent` / `--color-accent-hover` | Texto destacado y enlaces |
| `--color-bg` · `--color-surface` · `--color-border` | Fondo, tarjetas y bordes |
| `--color-text` · `--color-text-muted` | Texto principal y secundario |
| `--color-danger` · `--color-success` | Estados |
| `--size-title` · `--size-subtitle` · `--size-heading` · `--size-info` · `--size-secondary` · `--size-small` | Tamaños de texto |
| `--space-1` … `--space-7` | Espaciados |
| `--radius-*` · `--shadow-card` · `--transition` | Forma y movimiento |
| `--header-height` · `--content-width` · `--auth-width` | Medidas de estructura |

## Clases de texto

| Clase | Tipo de texto |
|---|---|
| `.text-title` | Título de página |
| `.text-subtitle` | Título de tarjeta de acceso |
| `.text-heading` | Título de bloque |
| `.text-info` | Texto de información |
| `.text-secondary` | Texto secundario |
| `.text-label` | Etiqueta pequeña en mayúsculas |
| `.text-field` | Etiqueta de campo de formulario |
| `.text-error` · `.text-ok` | Mensajes de error y de éxito |
| `.text-strong` · `.text-accent` · `.text-center` · `.text-break` | Modificadores |

## Cabecera fija

`.header` es `position: fixed`. Justo detrás va `.header-spacer`, un div vacío con el mismo ancho y alto
(`--header-height`), para que el contenido empiece debajo de la cabecera. Ambos están en el componente `app-header`.
