[Volver al índice](../README.md)

---

# Contenido

Proyectos y experiencia laboral: datos en la base de datos, imágenes y componentes que los muestran.

**Contenido:** [Origen de los datos](#origen-de-los-datos) · [Proyectos](#proyectos) · [Experiencia laboral](#experiencia-laboral) · [Editar el contenido](#editar-el-contenido) · [Imágenes](#imágenes)

---

## Origen de los datos

El contenido vive en Neon y se sirve por la API. Se carga una sola vez y se comparte entre la portada y las páginas.

| Contenido | Tabla | Endpoint | Páginas |
|---|---|---|---|
| Proyectos | `projects` | `GET /api/projects` | Carrusel de la portada y `/projects` |
| Experiencia laboral | `experiences` | `GET /api/experience` | Sección de la portada y `/experience` |

Solo se devuelven las filas con `visible = true`, ordenadas por `position`.

---

## Proyectos

Cada proyecto tiene nombre, enlace, imagen y tipo (`web` o `repo`). El tipo decide el texto del botón:
"Visitar web" o "Ver repositorio".

- En el carrusel la tarjeta es vertical: imagen arriba, título y botón.
- En `/projects` cada tarjeta ocupa todo el ancho: imagen a un lado y datos al otro.

---

## Experiencia laboral

Cada experiencia alterna el lado de la imagen respecto a la anterior.

| Parte | Presentación |
|---|---|
| Título (sitio o empresa) | Centrado, encima de la descripción |
| Puesto y localidad | Centrado, bajo el título |
| Fechas de inicio y fin | Alineadas a la derecha. Sin fecha de fin se muestra "Actualidad" |
| Descripción | Justificada |

La precisión de las fechas (`year` o `month`) decide si se muestra solo el año o también el mes.

---

## Editar el contenido

Mientras no exista el CMS, se edita en Neon, SQL Editor.

```sql
-- Ocultar un proyecto
update projects set visible = false where name = 'creiss.es';

-- Cambiar el orden (menor primero)
update projects set position = 1 where name = 'HermesApp';

-- Añadir un proyecto
insert into projects (name, url, image, kind, position)
values ('Mi proyecto', 'https://ejemplo.com', '/projects/mi-proyecto.jpg', 'web', 5);

-- Añadir una experiencia con fecha de fin vacía (actualidad)
insert into experiences (title, role, location, description, start_date, date_precision, image, position)
values ('Empresa', 'Puesto', 'Ciudad', 'Descripción breve.', date '2026-09-01', 'month', '/experience/empresa.jpg', 0);
```

---

## Imágenes

Las imágenes se guardan en `public/` y se enlazan desde la base de datos con una ruta que empieza por `/`.

| Carpeta | Uso | Formato recomendado |
|---|---|---|
| `public/projects/` | Capturas de los proyectos | 16:9, 1280 x 720 px, JPG |
| `public/experience/` | Imagen de cada experiencia | 4:3, 960 x 720 px, JPG |

Las imágenes actuales son marcadores de posición. Se sustituyen guardando la imagen real con el mismo nombre de archivo.
