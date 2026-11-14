/** Para qué se emitió el código. Cada usuario tiene como máximo un código vigente por finalidad. */
export type CodePurpose = 'email_verification' | 'password_change';

export interface VerificationCode {
  userId: string;
  purpose: CodePurpose;
  codeHash: string;
  /** Dato asociado a la operación (p. ej. el hash de la contraseña nueva). */
  payload: string | null;
  attempts: number;
  expiresAt: Date;
  createdAt: Date;
}
