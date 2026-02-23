import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cbs-cf-add',
  templateUrl: 'cf-add.component.html',
  styleUrls: ['cf-add.component.scss']
})
export class CFAddComponent {
  @Input() buttonTitle: string;
  @Input() disabled: boolean;
  @Input() uid: number;
  @Output() clicked = new EventEmitter();

  constructor() {
  }

  emitClick() {
    this.clicked.emit();
  }
}
