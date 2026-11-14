/** Constantes de la aplicación en un único sitio. */

export const APP_ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  verify: '/verify',
  account: '/account',
  admin: '/admin',
} as const;

/** Códigos de error que devuelve la API y que la interfaz sabe interpretar. */
export const API_ERRORS = {
  emailNotVerified: 'EMAIL_NOT_VERIFIED',
} as const;

/** Debe coincidir con las reglas del servidor (api/src/config/security.ts). */
export const PASSWORD_RULES = { minLength: 8, maxLength: 128 } as const;
export const NAME_MAX_LENGTH = 60;
export const RESEND_COOLDOWN_SECONDS = 60;

export const TOKEN_STORAGE_KEY = 'branbp.token';
