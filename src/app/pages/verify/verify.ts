import { Component, DestroyRef, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthCard } from '../../components/auth/auth-card/auth-card';
import { FormField } from '../../components/form/form-field/form-field';
import { APP_ROUTES, RESEND_COOLDOWN_SECONDS } from '../../config/app.constants';
import { GoogleIdentityManager } from '../../managers/google-identity.manager';
import { SessionManager } from '../../managers/session.manager';
import { AsyncAction } from '../../utils/async-action';
import { Countdown } from '../../utils/countdown';

@Component({
  selector: 'app-verify',
  imports: [ReactiveFormsModule, RouterLink, AuthCard, FormField],
  templateUrl: './verify.html',
})
export class Verify {
  private readonly session = inject(SessionManager);
  private readonly google = inject(GoogleIdentityManager);
  private readonly router = inject(Router);

  private readonly query = inject(ActivatedRoute).snapshot.queryParamMap;
  protected readonly email = this.query.get('email') ?? '';
  private readonly googleButton = viewChild.required<ElementRef<HTMLElement>>('googleButton');

  protected readonly form = inject(NonNullableFormBuilder).group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });
  protected readonly verifyAction = new AsyncAction();
  protected readonly resendAction = new AsyncAction();
  protected readonly cooldown = new Countdown();
  protected readonly info = signal<string | null>(null);

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.cooldown.stop();
      this.google.cancel();
    });
    if (!this.email) void this.router.navigate([APP_ROUTES.register]);

    afterNextRender(() => {
      if (!this.email) return;
      if (this.query.get('sent')) this.cooldown.start(RESEND_COOLDOWN_SECONDS);
      void this.connectGoogle();
    });
  }

  protected async submit(): Promise<void> {
    const code = this.form.controls.code.value;
    const ok = await this.verifyAction.submit(this.form, () => this.session.verify(this.email, code));
    if (ok) await this.enter();
  }

  protected async resend(): Promise<void> {
    this.info.set(null);
    const ok = await this.resendAction.run(() => this.session.resendCode(this.email));
    if (ok) {
      this.info.set('Te hemos enviado un código nuevo.');
      this.cooldown.start(RESEND_COOLDOWN_SECONDS);
    }
  }

  /** Si el usuario tiene sesión de Google con este correo, Google lo confirma y entra sin código. */
  private async connectGoogle(): Promise<void> {
    try {
      await this.google.attach(this.googleButton().nativeElement, (idToken) => void this.verifyWithGoogle(idToken));
    } catch {
      /* Google no disponible: se puede verificar con el código del correo */
    }
  }

  private async verifyWithGoogle(idToken: string): Promise<void> {
    const ok = await this.verifyAction.run(() => this.session.verifyWithGoogle(this.email, idToken));
    if (ok) await this.enter();
  }

  private enter(): Promise<boolean> {
    return this.router.navigateByUrl(APP_ROUTES.home);
  }
}
