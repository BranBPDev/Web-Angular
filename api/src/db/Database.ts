import { neon } from '@neondatabase/serverless';

/** Acceso a Neon por HTTP (apto para Workers). */
export class Database {
  private readonly sql: ReturnType<typeof neon>;

  constructor(connectionString: string) {
    this.sql = neon(connectionString);
  }

  async query<T>(text: string, params: unknown[] = []): Promise<T[]> {
    return (await this.sql.query(text, params)) as T[];
  }
}
