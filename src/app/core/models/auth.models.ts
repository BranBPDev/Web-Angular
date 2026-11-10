export interface User {
  id: string;
  email: string;
  verified: boolean;
}

export interface Session {
  token: string;
  user: User;
}

export interface AppConfig {
  googleClientId: string;
}
