import { UserRole } from '../models/auth.models';

export const ROLE_LABELS: Record<UserRole, string> = {
  user: 'Usuario común',
  admin: 'Administrador',
};
