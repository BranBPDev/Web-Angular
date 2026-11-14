-- ============================================================================
-- Esquema completo para Neon (PostgreSQL). Úsalo en una base de datos NUEVA.
-- Si ya tienes la base creada, aplica las migraciones de database/migrations/.
-- ============================================================================

do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type user_role as enum ('user', 'admin');
  end if;
end $$;

create table if not exists users (
  id            uuid primary key default gen_random_uuid(),
  email         text not null,
  name          text,                                   -- nombre opcional que edita el usuario
  password_hash text not null,                          -- hash PBKDF2 con sal; la contraseña nunca se guarda
  role          user_role not null default 'user',      -- 'admin' solo se asigna a mano desde la base de datos
  verified_at   timestamptz,                            -- null = correo sin verificar
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint users_email_lowercase check (email = lower(email))
);

create unique index if not exists users_email_key on users (email);

-- Códigos enviados por correo. Un usuario tiene como máximo uno vigente por finalidad.
create table if not exists verification_codes (
  user_id    uuid not null references users(id) on delete cascade,
  purpose    text not null,                             -- 'email_verification' | 'password_change'
  code_hash  text not null,                             -- HMAC del código; el código en claro no se guarda
  payload    text,                                      -- dato de la operación (hash de la contraseña nueva)
  attempts   smallint not null default 0,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  primary key (user_id, purpose)
);
