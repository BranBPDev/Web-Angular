import { BaseDao } from './BaseDao';
import type { CodePurpose, VerificationCode } from '../models/VerificationCode';

interface CodeRow {
  user_id: string;
  purpose: CodePurpose;
  code_hash: string;
  payload: string | null;
  attempts: number;
  expires_at: string | Date;
  created_at: string | Date;
}

export class VerificationCodeDao extends BaseDao {
  async find(userId: string, purpose: CodePurpose): Promise<VerificationCode | null> {
    const row = await this.one<CodeRow>('select * from verification_codes where user_id = $1 and purpose = $2', [userId, purpose]);
    if (!row) return null;
    return {
      userId: row.user_id,
      purpose: row.purpose,
      codeHash: row.code_hash,
      payload: row.payload,
      attempts: Number(row.attempts),
      expiresAt: new Date(row.expires_at),
      createdAt: new Date(row.created_at),
    };
  }

  /** Crea o reemplaza el código vigente del usuario para esa finalidad. */
  async upsert(userId: string, purpose: CodePurpose, codeHash: string, payload: string | null, expiresAt: Date): Promise<void> {
    await this.db.query(
      `insert into verification_codes (user_id, purpose, code_hash, payload, expires_at)
       values ($1, $2, $3, $4, $5::timestamptz)
       on conflict (user_id, purpose) do update
         set code_hash = excluded.code_hash, payload = excluded.payload, attempts = 0,
             expires_at = excluded.expires_at, created_at = now()`,
      [userId, purpose, codeHash, payload, expiresAt.toISOString()],
    );
  }

  async incrementAttempts(userId: string, purpose: CodePurpose): Promise<void> {
    await this.db.query('update verification_codes set attempts = attempts + 1 where user_id = $1 and purpose = $2', [userId, purpose]);
  }

  async delete(userId: string, purpose: CodePurpose): Promise<void> {
    await this.db.query('delete from verification_codes where user_id = $1 and purpose = $2', [userId, purpose]);
  }
}
