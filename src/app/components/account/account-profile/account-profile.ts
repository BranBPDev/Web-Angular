import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NAME_MAX_LENGTH } from '../../../config/app.constants';
import { AccountManager } from '../../../managers/account.manager';
import { SessionManager } from '../../../managers/session.manager';
import { AsyncAction } from '../../../utils/async-action';
import { ROLE_LABELS } from '../../../utils/role-labels';
import { FormField } from '../../form/form-field/form-field';
import { Badge } from '../../ui/badge/badge';
import { InfoItem } from '../../ui/info-item/info-item';
import { Panel } from '../../ui/panel/panel';

/** Datos de la cuenta y edición del nombre. */
@Component({
  selector: 'app-account-profile',
  imports: [ReactiveFormsModule, Panel, InfoItem, Badge, FormField],
  templateUrl: './account-profile.html',
})
export class AccountProfile {
  protected readonly session = inject(SessionManager);
  private readonly account = inject(AccountManager);

  protected readonly roleLabel = computed(() => {
    const user = this.session.user();
    return user ? ROLE_LABELS[user.role] : '';
  });
  protected readonly memberSince = computed(() => {
    const user = this.session.user();
    return user ? new Date(user.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  });

  protected readonly form = inject(NonNullableFormBuilder).group({
    name: [this.session.user()?.name ?? '', [Validators.maxLength(NAME_MAX_LENGTH)]],
  });
  protected readonly action = new AsyncAction();
  protected readonly saved = signal(false);

  constructor() {
    this.form.controls.name.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.saved.set(false));
  }

  protected async save(): Promise<void> {
    const name = this.form.controls.name.value;
    const ok = await this.action.submit(this.form, () => this.account.updateName(name));
    if (ok) this.saved.set(true);
  }
}
