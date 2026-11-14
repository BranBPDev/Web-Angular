export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  verified: boolean;
  createdAt: string;
}

export interface Session {
  token: string;
  user: User;
}

export interface AppConfig {
  googleClientId: string;
}
