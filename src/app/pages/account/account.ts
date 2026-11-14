import { Component } from '@angular/core';
import { AccountPassword } from '../../components/account/account-password/account-password';
import { AccountProfile } from '../../components/account/account-profile/account-profile';
import { Hero } from '../../components/ui/hero/hero';

@Component({
  selector: 'app-account',
  imports: [Hero, AccountProfile, AccountPassword],
  templateUrl: './account.html',
})
export class Account {}
