-- ============================================================================
-- Migración 002: nombre de usuario y códigos de verificación por finalidad.
-- Ejecutar UNA VEZ en Neon > SQL Editor, ANTES de subir la nueva versión de la API.
-- Es idempotente: se puede lanzar más de una vez sin problema.
-- ============================================================================

alter table users add column if not exists name text;

do $$
begin
  -- Solo si la tabla antigua todavía no se ha convertido
  if to_regclass('public.verification_codes') is null
     and to_regclass('public.email_verification_codes') is not null then
    alter table email_verification_codes add column if not exists purpose text not null default 'email_verification';
    alter table email_verification_codes add column if not exists payload text;
    alter table email_verification_codes drop constraint if exists email_verification_codes_pkey;
    alter table email_verification_codes add primary key (user_id, purpose);
    alter table email_verification_codes rename to verification_codes;
  end if;
end $$;
