import { Component, Input } from '@angular/core';

@Component({
  selector: 'cbs-tickorcross',
  templateUrl: 'tick-cross.component.html',
  styleUrls: ['./tick-cross.component.scss']
})
export class TickCrossComponent {
  @Input() isTick = true;

  constructor() {}
}

