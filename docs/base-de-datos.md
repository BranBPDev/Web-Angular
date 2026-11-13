[← Volver al índice](../README.md)

# Base de datos

PostgreSQL en Neon.

| Archivo | Uso |
|---|---|
| `database/schema.sql` | Esquema completo, para una base nueva |
| `database/migrations/001_user_roles.sql` | Añade la columna `role` a una base ya creada |

## Tablas

- `users`: `id`, `email` (único, minúsculas), `password_hash`, `role` (`user` | `admin`), `verified_at`, `created_at`, `updated_at`.
- `email_verification_codes`: `user_id`, `code_hash`, `attempts`, `expires_at`, `created_at`.

## Hacer administrador a un usuario

```sql
update users set role = 'admin' where email = 'correo@ejemplo.com';
```
