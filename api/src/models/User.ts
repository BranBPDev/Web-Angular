import type { UserRole } from './Role';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  verifiedAt: Date | null;
  createdAt: Date;
}

/** Datos del usuario que sí se devuelven al cliente. */
export interface PublicUser {
  id: string;
  email: string;
  role: UserRole;
  verified: boolean;
}

export const toPublicUser = (user: User): PublicUser => ({
  id: user.id,
  email: user.email,
  role: user.role,
  verified: user.verifiedAt !== null,
});
