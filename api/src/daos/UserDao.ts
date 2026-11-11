import { BaseDao } from './BaseDao';
import { parseRole } from '../models/Role';
import type { User } from '../models/User';

interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  role: string;
  verified_at: string | Date | null;
  created_at: string | Date;
}

export class UserDao extends BaseDao {
  async findByEmail(email: string): Promise<User | null> {
    return this.map(await this.one<UserRow>('select * from users where email = $1', [email]));
  }

  async findById(id: string): Promise<User | null> {
    return this.map(await this.one<UserRow>('select * from users where id = $1', [id]));
  }

  async create(email: string, passwordHash: string): Promise<User> {
    const row = await this.one<UserRow>(
      'insert into users (email, password_hash) values ($1, $2) returning *',
      [email, passwordHash],
    );
    return this.map(row)!;
  }

  async updatePasswordHash(id: string, passwordHash: string): Promise<void> {
    await this.db.query('update users set password_hash = $2, updated_at = now() where id = $1', [id, passwordHash]);
  }

  async markVerified(id: string): Promise<User | null> {
    return this.map(
      await this.one<UserRow>(
        'update users set verified_at = coalesce(verified_at, now()), updated_at = now() where id = $1 returning *',
        [id],
      ),
    );
  }

  private map(row: UserRow | null): User | null {
    if (!row) return null;
    return {
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      role: parseRole(row.role),
      verifiedAt: row.verified_at ? new Date(row.verified_at) : null,
      createdAt: new Date(row.created_at),
    };
  }
}
