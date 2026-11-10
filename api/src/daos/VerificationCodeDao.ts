import { BaseDao } from './BaseDao';
import type { VerificationCode } from '../models/VerificationCode';

interface CodeRow {
  user_id: string;
  code_hash: string;
  attempts: number;
  expires_at: string | Date;
  created_at: string | Date;
}

export class VerificationCodeDao extends BaseDao {
  async findByUserId(userId: string): Promise<VerificationCode | null> {
    const row = await this.one<CodeRow>('select * from email_verification_codes where user_id = $1', [userId]);
    if (!row) return null;
    return {
      userId: row.user_id,
      codeHash: row.code_hash,
      attempts: Number(row.attempts),
      expiresAt: new Date(row.expires_at),
      createdAt: new Date(row.created_at),
    };
  }

  /** Crea o reemplaza el código vigente del usuario. */
  async upsert(userId: string, codeHash: string, expiresAt: Date): Promise<void> {
    await this.db.query(
      `insert into email_verification_codes (user_id, code_hash, expires_at)
       values ($1, $2, $3::timestamptz)
       on conflict (user_id) do update
         set code_hash = excluded.code_hash, attempts = 0,
             expires_at = excluded.expires_at, created_at = now()`,
      [userId, codeHash, expiresAt.toISOString()],
    );
  }

  async incrementAttempts(userId: string): Promise<void> {
    await this.db.query('update email_verification_codes set attempts = attempts + 1 where user_id = $1', [userId]);
  }

  async delete(userId: string): Promise<void> {
    await this.db.query('delete from email_verification_codes where user_id = $1', [userId]);
  }
}
