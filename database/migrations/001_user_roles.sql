-- Migración 001: roles de usuario (user / admin). Ejecutar una vez en Neon > SQL Editor.
-- Es idempotente: se puede lanzar más de una vez sin problema.

do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type user_role as enum ('user', 'admin');
  end if;
end $$;

-- Todos los usuarios existentes pasan a ser 'user' (usuario común) por defecto.
alter table users add column if not exists role user_role not null default 'user';

-- ---------------------------------------------------------------------------
-- Hacer administrador a un usuario (única forma de crear admins). Cambia el correo:
--   update users set role = 'admin' where email = 'tu-correo@ejemplo.com';
-- Quitar el permiso:
--   update users set role = 'user' where email = 'tu-correo@ejemplo.com';
-- Comprobar roles:
--   select email, role, verified_at from users order by created_at;
-- ---------------------------------------------------------------------------
