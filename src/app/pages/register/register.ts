import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthCard } from '../../components/auth/auth-card/auth-card';
import { FormField } from '../../components/form/form-field/form-field';
import { APP_ROUTES, PASSWORD_RULES } from '../../config/app.constants';
import { SessionManager } from '../../managers/session.manager';
import { AsyncAction } from '../../utils/async-action';
import { emailValidator, matchesValidator, strongPasswordValidator } from '../../validators/auth.validators';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, AuthCard, FormField],
  templateUrl: './register.html',
})
export class Register {
  private readonly session = inject(SessionManager);
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
    const ok = await this.action.submit(this.form, () => this.session.register(email, password));
    if (ok) await this.router.navigate([APP_ROUTES.verify], { queryParams: { email, sent: 1 } });
  }
}
