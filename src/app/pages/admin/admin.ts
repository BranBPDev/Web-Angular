import { Component, OnInit, inject, signal } from '@angular/core';
import { Badge } from '../../components/ui/badge/badge';
import { Hero } from '../../components/ui/hero/hero';
import { Panel } from '../../components/ui/panel/panel';
import { AdminDao } from '../../daos/admin.dao';
import { AsyncAction } from '../../utils/async-action';

@Component({
  selector: 'app-admin',
  imports: [Hero, Panel, Badge],
  templateUrl: './admin.html',
})
export class Admin implements OnInit {
  private readonly admin = inject(AdminDao);

  protected readonly check = new AsyncAction();
  protected readonly confirmed = signal(false);

  ngOnInit(): void {
    void this.check.run(async () => {
      await this.admin.check();
      this.confirmed.set(true);
    });
  }
}
