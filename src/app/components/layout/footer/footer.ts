import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
})
export class AppFooter {
  protected readonly year = new Date().getFullYear();
}
