import { Component, OnInit, inject, signal } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { AsyncAction } from '../../../core/utils/async-action';
import { AppShell } from '../../../shared/components/app-shell/app-shell';

@Component({
  selector: 'app-admin-dashboard',
  imports: [AppShell],
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard implements OnInit {
  private readonly admin = inject(AdminService);

  protected readonly check = new AsyncAction();
  protected readonly confirmed = signal(false);

  ngOnInit(): void {
    void this.check.run(async () => {
      await this.admin.check();
      this.confirmed.set(true);
    });
  }
}
