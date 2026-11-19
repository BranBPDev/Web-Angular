-- ============================================================================
-- Migración 003: contenido de la web (proyectos y experiencia laboral).
-- Ejecutar UNA VEZ en Neon > SQL Editor. Después, cargar los datos con seed/content.sql.
-- Es idempotente: se puede lanzar más de una vez sin problema.
-- ============================================================================

create table if not exists projects (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  url        text not null,
  image      text not null,                       -- ruta pública de la captura (p. ej. /projects/creiss.jpg)
  kind       text not null check (kind in ('web', 'repo')),
  position   integer not null default 0,          -- orden de aparición (menor primero)
  visible    boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists experiences (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,                   -- sitio o empresa
  role           text not null,                   -- puesto
  location       text,
  description    text not null,
  start_date     date not null,
  end_date       date,                            -- null = actualidad
  date_precision text not null default 'month' check (date_precision in ('year', 'month')),
  image          text,                            -- ruta pública de la imagen (p. ej. /experience/hotusa.jpg)
  position       integer not null default 0,      -- orden de aparición (menor primero)
  visible        boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
