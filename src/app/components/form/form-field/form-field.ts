import { Component, computed, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { controlError } from '../../../utils/form-errors';
import { Icon } from '../../ui/icon/icon';

let nextId = 0;

/** Campo de formulario reutilizable: etiqueta, input, mensaje de error y, en contraseñas, botón mostrar/ocultar. */
@Component({
  selector: 'app-form-field',
  imports: [ReactiveFormsModule, Icon],
  templateUrl: './form-field.html',
})
export class FormField {
  readonly label = input.required<string>();
  readonly control = input.required<FormControl<string>>();
  readonly type = input<string>('text');
  readonly autocomplete = input<string>('off');
  readonly inputmode = input<string | null>(null);
  readonly maxlength = input<number | null>(null);
  readonly placeholder = input<string>('');

  protected readonly id = `field-${nextId++}`;
  protected readonly revealed = signal(false);
  protected readonly isPassword = computed(() => this.type() === 'password');
  protected readonly inputType = computed(() => (this.isPassword() && this.revealed() ? 'text' : this.type()));
  /**
   * Con la contraseña visible el campo es de texto normal: se retira la pista de contraseña
   * (new-password / current-password) para que el móvil permita seleccionar y copiar el texto.
   */
  protected readonly effectiveAutocomplete = computed(() => (this.isPassword() && this.revealed() ? 'off' : this.autocomplete()));

  protected toggleReveal(): void {
    this.revealed.update((value) => !value);
  }

  protected error(): string | null {
    return controlError(this.control());
  }
}
