import { AfterViewInit, Component, ElementRef, OnDestroy, inject, signal, viewChild } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { GoogleIdentityService } from '../../../core/services/google-identity.service';
import { AsyncAction } from '../../../core/utils/async-action';
import { AuthCard } from '../../../shared/components/auth-card/auth-card';
import { FormField } from '../../../shared/components/form-field/form-field';

const RESEND_COOLDOWN_SECONDS = 60;

@Component({
  selector: 'app-verify',
  imports: [ReactiveFormsModule, RouterLink, AuthCard, FormField],
  templateUrl: './verify.html',
})
export class Verify implements AfterViewInit, OnDestroy {
  private readonly auth = inject(AuthService);
  private readonly google = inject(GoogleIdentityService);
  private readonly router = inject(Router);

  private readonly query = inject(ActivatedRoute).snapshot.queryParamMap;
  protected readonly email = this.query.get('email') ?? '';

  private readonly googleButton = viewChild.required<ElementRef<HTMLElement>>('googleButton');
  private timer?: ReturnType<typeof setInterval>;

  protected readonly form = inject(NonNullableFormBuilder).group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });
  protected readonly verifyAction = new AsyncAction();
  protected readonly resendAction = new AsyncAction();
  protected readonly info = signal<string | null>(null);
  protected readonly cooldown = signal(0);

  constructor() {
    if (!this.email) void this.router.navigate(['/register']);
  }

  ngAfterViewInit(): void {
    if (!this.email) return;
    if (this.query.get('sent')) this.startCooldown();
    void this.connectGoogle();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    this.google.cancel();
  }

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const ok = await this.verifyAction.run(() => this.auth.verify(this.email, this.form.controls.code.value));
    if (ok) await this.router.navigateByUrl('/');
  }

  protected async resend(): Promise<void> {
    this.info.set(null);
    const ok = await this.resendAction.run(() => this.auth.resendCode(this.email));
    if (ok) {
      this.info.set('Te hemos enviado un código nuevo.');
      this.startCooldown();
    }
  }

  /** Si el usuario tiene sesión de Google con este correo, Google lo confirma y entra sin código. */
  private async connectGoogle(): Promise<void> {
    try {
      const { googleClientId } = await this.auth.loadConfig();
      if (!googleClientId) return;
      await this.google.prepare(googleClientId, (idToken) => void this.verifyWithGoogle(idToken), this.googleButton().nativeElement);
    } catch {
      /* Google no disponible: se puede verificar con el código del correo */
    }
  }

  private async verifyWithGoogle(idToken: string): Promise<void> {
    const ok = await this.verifyAction.run(() => this.auth.verifyWithGoogle(this.email, idToken));
    if (ok) await this.router.navigateByUrl('/');
  }

  private startCooldown(): void {
    clearInterval(this.timer);
    this.cooldown.set(RESEND_COOLDOWN_SECONDS);
    this.timer = setInterval(() => {
      this.cooldown.update((seconds) => Math.max(0, seconds - 1));
      if (this.cooldown() === 0) clearInterval(this.timer);
    }, 1000);
  }
}
