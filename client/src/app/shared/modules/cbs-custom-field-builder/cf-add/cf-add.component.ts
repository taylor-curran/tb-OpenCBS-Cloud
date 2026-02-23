import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'cbs-cf-add',
  templateUrl: 'cf-add.component.html',
  styleUrls: ['cf-add.component.scss']
})
export class CFAddComponent  {
  @Input() buttonTitle: string;
  @Input() disabled: boolean;
  @Input() uid: number;
  @Output() click = new EventEmitter();

  constructor() {}
  click() {
    this.click.emit();
  }
}
