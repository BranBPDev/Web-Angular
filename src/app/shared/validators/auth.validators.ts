import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const emailValidator: ValidatorFn = (control) =>
  !control.value || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(control.value)) ? null : { email: true };

export const strongPasswordValidator: ValidatorFn = (control) => {
  const value = String(control.value ?? '');
  return !value || (/[A-Za-z]/.test(value) && /\d/.test(value)) ? null : { passwordStrength: true };
};

/** El control debe coincidir con otro control hermano del mismo grupo. */
export const matchesValidator =
  (siblingName: string): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null =>
    control.value === control.parent?.get(siblingName)?.value ? null : { mismatch: true };
