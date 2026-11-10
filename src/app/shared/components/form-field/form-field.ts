import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { controlError } from '../../utils/form-errors';

let nextId = 0;

/** Campo de formulario reutilizable: etiqueta, input y mensaje de error. */
@Component({
  selector: 'app-form-field',
  imports: [ReactiveFormsModule],
  templateUrl: './form-field.html',
})
export class FormField {
  readonly label = input.required<string>();
  readonly control = input.required<FormControl<string>>();
  readonly type = input<string>('text');
  readonly autocomplete = input<string>('off');
  readonly inputmode = input<string | null>(null);
  readonly maxlength = input<number | null>(null);

  protected readonly id = `field-${nextId++}`;

  protected error(): string | null {
    return controlError(this.control());
  }
}
