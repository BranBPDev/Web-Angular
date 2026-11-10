import type { Database } from '../db/Database';

export abstract class BaseDao {
  constructor(protected readonly db: Database) {}

  protected async one<T>(text: string, params: unknown[] = []): Promise<T | null> {
    const rows = await this.db.query<T>(text, params);
    return rows[0] ?? null;
  }
}
