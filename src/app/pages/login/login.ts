import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthCard } from '../../components/auth/auth-card/auth-card';
import { FormField } from '../../components/form/form-field/form-field';
import { API_ERRORS, APP_ROUTES } from '../../config/app.constants';
import { SessionManager } from '../../managers/session.manager';
import { AsyncAction } from '../../utils/async-action';
import { emailValidator } from '../../validators/auth.validators';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, AuthCard, FormField],
  templateUrl: './login.html',
})
export class Login {
  private readonly session = inject(SessionManager);
  private readonly router = inject(Router);

  protected readonly form = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, emailValidator]],
    password: ['', [Validators.required]],
  });
  protected readonly action = new AsyncAction();

  protected async submit(): Promise<void> {
    const { email, password } = this.form.getRawValue();
    const ok = await this.action.submit(this.form, () => this.session.login(email, password));

    if (ok) {
      await this.router.navigateByUrl(APP_ROUTES.home);
    } else if (this.action.errorCode() === API_ERRORS.emailNotVerified) {
      await this.router.navigate([APP_ROUTES.verify], { queryParams: { email } });
    }
  }
}
