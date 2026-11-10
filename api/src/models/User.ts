export interface User {
  id: string;
  email: string;
  passwordHash: string;
  verifiedAt: Date | null;
  createdAt: Date;
}

/** Datos del usuario que sí se devuelven al cliente. */
export interface PublicUser {
  id: string;
  email: string;
  verified: boolean;
}

export const toPublicUser = (user: User): PublicUser => ({
  id: user.id,
  email: user.email,
  verified: user.verifiedAt !== null,
});
