import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PASSWORD_RULES, RESEND_COOLDOWN_SECONDS } from '../../../config/app.constants';
import { AccountManager } from '../../../managers/account.manager';
import { SessionManager } from '../../../managers/session.manager';
import { AsyncAction } from '../../../utils/async-action';
import { Countdown } from '../../../utils/countdown';
import { matchesValidator, strongPasswordValidator } from '../../../validators/auth.validators';
import { FormField } from '../../form/form-field/form-field';
import { Panel } from '../../ui/panel/panel';

type Step = 'form' | 'code';

/** Cambio de contraseña en dos pasos, igual que el registro: datos nuevos y código recibido por correo. */
@Component({
  selector: 'app-account-password',
  imports: [ReactiveFormsModule, Panel, FormField],
  templateUrl: './account-password.html',
})
export class AccountPassword {
  private readonly account = inject(AccountManager);
  private readonly session = inject(SessionManager);

  protected readonly email = computed(() => this.session.user()?.email ?? '');
  protected readonly step = signal<Step>('form');
  protected readonly done = signal(false);
  protected readonly info = signal<string | null>(null);

  protected readonly changeForm = inject(NonNullableFormBuilder).group({
    current: ['', [Validators.required]],
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
  protected readonly codeForm = inject(NonNullableFormBuilder).group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });

  protected readonly requestAction = new AsyncAction();
  protected readonly confirmAction = new AsyncAction();
  protected readonly resendAction = new AsyncAction();
  protected readonly cooldown = new Countdown();

  constructor() {
    inject(DestroyRef).onDestroy(() => this.cooldown.stop());
    // Si cambia la contraseña nueva, hay que volver a comprobar la confirmación.
    this.changeForm.controls.password.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.changeForm.controls.confirm.updateValueAndValidity());
  }

  protected async request(): Promise<void> {
    this.done.set(false);
    const { current, password } = this.changeForm.getRawValue();
    const ok = await this.requestAction.submit(this.changeForm, () => this.account.requestPasswordChange(current, password));
    if (!ok) return;
    this.codeForm.reset();
    this.info.set(null);
    this.step.set('code');
    this.cooldown.start(RESEND_COOLDOWN_SECONDS);
  }

  protected async confirm(): Promise<void> {
    const code = this.codeForm.controls.code.value;
    const ok = await this.confirmAction.submit(this.codeForm, () => this.account.confirmPasswordChange(code));
    if (!ok) return;
    this.changeForm.reset();
    this.codeForm.reset();
    this.cooldown.stop();
    this.step.set('form');
    this.done.set(true);
  }

  protected async resend(): Promise<void> {
    this.info.set(null);
    const ok = await this.resendAction.run(() => this.account.resendPasswordChange());
    if (ok) {
      this.info.set('Te hemos enviado un código nuevo.');
      this.cooldown.start(RESEND_COOLDOWN_SECONDS);
    }
  }

  protected cancel(): void {
    this.cooldown.stop();
    this.step.set('form');
  }
}
