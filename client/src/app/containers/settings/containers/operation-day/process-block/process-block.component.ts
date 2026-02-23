import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cbs-process-block',
  templateUrl: './process-block.component.html',
  styleUrls: ['./process-block.component.scss']
})
export class ProcessBlockComponent {
  @Input() buttonLabel: string;
  @Input() date = '';
  @Input() statusData: any;
  @Input() title: string;
  @Input() disabled: false;
  @Output() dateChange = new EventEmitter();
  @Output() startClick = new EventEmitter();
  @Output() finishClick = new EventEmitter();

  constructor() {
  }

  }
