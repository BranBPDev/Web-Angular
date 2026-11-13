import { Component, input } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.html',
})
export class Panel {
  readonly heading = input.required<string>();
}
