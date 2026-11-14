import type { UserRole } from './Role';

export interface User {
  id: string;
  email: string;
  name: string | null;
  passwordHash: string;
  role: UserRole;
  verifiedAt: Date | null;
  createdAt: Date;
}

/** Datos del usuario que sí se devuelven al cliente. */
export interface PublicUser {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  verified: boolean;
  createdAt: string;
}

export const toPublicUser = (user: User): PublicUser => ({
  id: user.id,
  email: user.email,
  name: user.name,
  role: user.role,
  verified: user.verifiedAt !== null,
  createdAt: user.createdAt.toISOString(),
});
