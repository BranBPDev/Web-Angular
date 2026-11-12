import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { APP_ROUTES, PASSWORD_RULES } from '../../../core/config/app.constants';
import { AuthService } from '../../../core/services/auth.service';
import { AsyncAction } from '../../../core/utils/async-action';
import { AuthCard } from '../../../shared/components/auth-card/auth-card';
import { FormField } from '../../../shared/components/form-field/form-field';
import { emailValidator, matchesValidator, strongPasswordValidator } from '../../../shared/validators/auth.validators';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, AuthCard, FormField],
  templateUrl: './register.html',
})
export class Register {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly form = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, emailValidator]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(PASSWORD_RULES.minLength),
        Validators.maxLength(PASSWORD_RULES.maxLength),
        strongPasswordValidator,
      ],
    ],
    confirm: ['', [Validators.required, matchesValidator('password')]],
  });
  protected readonly action = new AsyncAction();

  constructor() {
    // Si cambia la contraseña, hay que volver a comprobar la confirmación.
    this.form.controls.password.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.form.controls.confirm.updateValueAndValidity());
  }

  protected async submit(): Promise<void> {
    const { email, password } = this.form.getRawValue();
    const ok = await this.action.submit(this.form, () => this.auth.register(email, password));
    if (ok) await this.router.navigate([APP_ROUTES.verify], { queryParams: { email, sent: 1 } });
  }
}
