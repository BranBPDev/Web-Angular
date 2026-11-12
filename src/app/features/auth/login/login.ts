import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { API_ERRORS, APP_ROUTES } from '../../../core/config/app.constants';
import { AuthService } from '../../../core/services/auth.service';
import { AsyncAction } from '../../../core/utils/async-action';
import { AuthCard } from '../../../shared/components/auth-card/auth-card';
import { FormField } from '../../../shared/components/form-field/form-field';
import { emailValidator } from '../../../shared/validators/auth.validators';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, AuthCard, FormField],
  templateUrl: './login.html',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly form = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, emailValidator]],
    password: ['', [Validators.required]],
  });
  protected readonly action = new AsyncAction();

  protected async submit(): Promise<void> {
    const { email, password } = this.form.getRawValue();
    const ok = await this.action.submit(this.form, () => this.auth.login(email, password));

    if (ok) {
      await this.router.navigateByUrl(APP_ROUTES.home);
    } else if (this.action.errorCode() === API_ERRORS.emailNotVerified) {
      await this.router.navigate([APP_ROUTES.verify], { queryParams: { email } });
    }
  }
}
