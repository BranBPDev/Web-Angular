import { AbstractControl } from '@angular/forms';

/** Mensaje de error de un control (solo si ya fue tocado). */
export function controlError(control: AbstractControl | null): string | null {
  if (!control || !control.touched || !control.errors) return null;
  const errors = control.errors;
  if (errors['required']) return 'Este campo es obligatorio.';
  if (errors['email']) return 'Introduce un correo válido.';
  if (errors['minlength']) return `Debe tener al menos ${errors['minlength'].requiredLength} caracteres.`;
  if (errors['maxlength']) return `No puede superar ${errors['maxlength'].requiredLength} caracteres.`;
  if (errors['passwordStrength']) return 'Debe incluir al menos una letra y un número.';
  if (errors['mismatch']) return 'Las contraseñas no coinciden.';
  if (errors['pattern']) return 'Formato no válido.';
  return 'Valor no válido.';
}
