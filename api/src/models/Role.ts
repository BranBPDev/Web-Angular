export const USER_ROLES = ['user', 'admin'] as const;
export type UserRole = (typeof USER_ROLES)[number];

/** Rol que recibe todo usuario nuevo. Los administradores solo se crean a mano en la base de datos. */
export const DEFAULT_ROLE: UserRole = 'user';

const RANK: Record<UserRole, number> = { user: 1, admin: 2 };

/** ¿El rol actual cumple (o supera) el rol exigido? Un admin puede hacer todo lo de un usuario común. */
export const hasRole = (actual: UserRole, required: UserRole): boolean => RANK[actual] >= RANK[required];

export const parseRole = (value: unknown): UserRole =>
  (USER_ROLES as readonly unknown[]).includes(value) ? (value as UserRole) : DEFAULT_ROLE;
