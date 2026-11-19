[Volver al índice](../README.md)

---

# Base de datos

PostgreSQL alojado en Neon: tablas, migraciones, datos iniciales y gestión de administradores.

**Contenido:** [Archivos](#archivos) · [Tabla users](#tabla-users) · [Tabla verification_codes](#tabla-verification_codes) · [Tabla projects](#tabla-projects) · [Tabla experiences](#tabla-experiences) · [Gestión de administradores](#gestión-de-administradores)

---

## Archivos

| Archivo | Uso |
|---|---|
| `database/schema.sql` | Esquema completo, para una base de datos nueva |
| `database/migrations/001_user_roles.sql` | Añade la columna `role` |
| `database/migrations/002_account.sql` | Añade `name` y convierte los códigos a `verification_codes` |
| `database/migrations/003_content.sql` | Crea las tablas `projects` y `experiences` |
| `database/seed/content.sql` | Datos iniciales de proyectos y experiencia (del currículum) |

Las migraciones se ejecutan en orden, una sola vez, en Neon, SQL Editor. Son idempotentes.
Deben aplicarse antes de desplegar la versión de la API que las necesita.
El seed solo inserta si la tabla está vacía.

---

## Tabla users

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | uuid | Clave primaria |
| `email` | text | Único y en minúsculas |
| `name` | text | Nombre opcional que edita el usuario |
| `password_hash` | text | Hash PBKDF2 con sal |
| `role` | user_role | `user` (por defecto) o `admin` |
| `verified_at` | timestamptz | Nulo mientras el correo no está verificado |
| `created_at`, `updated_at` | timestamptz | Auditoría |

---

## Tabla verification_codes

| Columna | Tipo | Descripción |
|---|---|---|
| `user_id` | uuid | Usuario (clave primaria junto a `purpose`) |
| `purpose` | text | `email_verification` o `password_change` |
| `code_hash` | text | HMAC del código |
| `payload` | text | Dato de la operación (hash de la contraseña nueva) |
| `attempts` | smallint | Intentos fallidos |
| `expires_at`, `created_at` | timestamptz | Caducidad y creación |

---

## Tabla projects

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | uuid | Clave primaria |
| `name` | text | Nombre que se muestra |
| `url` | text | Enlace al sitio o repositorio |
| `image` | text | Ruta pública de la captura |
| `kind` | text | `web` o `repo` |
| `position` | integer | Orden de aparición (menor primero) |
| `visible` | boolean | Si se muestra en la web |

---

## Tabla experiences

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | uuid | Clave primaria |
| `title` | text | Sitio o empresa |
| `role` | text | Puesto |
| `location` | text | Localidad (opcional) |
| `description` | text | Descripción breve |
| `start_date` | date | Fecha de inicio |
| `end_date` | date | Fecha de fin. Nulo significa actualidad |
| `date_precision` | text | `year` o `month`: cómo se muestran las fechas |
| `image` | text | Ruta pública de la imagen (opcional) |
| `position` | integer | Orden de aparición (menor primero) |
| `visible` | boolean | Si se muestra en la web |

---

## Gestión de administradores

Es la única forma de crear o quitar administradores.

```sql
-- Convertir en administrador
update users set role = 'admin' where email = 'correo@ejemplo.com';

-- Quitar el permiso
update users set role = 'user' where email = 'correo@ejemplo.com';

-- Consultar roles
select email, name, role, verified_at from users order by created_at;
```
