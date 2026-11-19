/** Constantes de la aplicación en un único sitio. */

export const APP_ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  verify: '/verify',
  projects: '/projects',
  experience: '/experience',
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

/** Carrusel de proyectos. */
export const CAROUSEL = {
  autoplayMs: 5000, // cada cuánto avanza solo
  swipePx: 40, // desplazamiento mínimo para considerar un deslizamiento
  fallbackMs: 900, // por si el navegador no avisa del fin de la animación
} as const;
