/** Variables y secretos del Worker. */
export interface Env {
  // Secretos (GitHub Actions -> wrangler secret)
  NEON_DATABASE_URL: string;
  JWT_SECRET: string;
  RESEND_API_KEY: string;
  GOOGLE_CLIENT_ID: string;
  // Variables públicas (wrangler.jsonc)
  ALLOWED_ORIGINS: string;
  EMAIL_FROM: string;
}
