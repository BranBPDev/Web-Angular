/** Parámetros de seguridad en un único sitio: así no hay números mágicos repartidos por el código. */
export const SECURITY = {
  SESSION_TTL_SECONDS: 7 * 24 * 60 * 60,
  CODE_LENGTH: 6,
  CODE_TTL_MINUTES: 15,
  CODE_MAX_ATTEMPTS: 5,
  CODE_RESEND_COOLDOWN_SECONDS: 60,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  PBKDF2_ITERATIONS: 100_000, // máximo que permite WebCrypto en Workers
} as const;
