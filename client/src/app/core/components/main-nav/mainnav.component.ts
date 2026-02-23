import { Component, Input } from '@angular/core';

@Component({
  selector: 'cbs-main-nav',
  templateUrl: 'mainnav.component.html',
  styleUrls: ['mainnav.component.scss']
})
export class MainNavComponent  {
  @Input() navElements: any[];

  constructor() {
  }
}
