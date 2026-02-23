import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cbs-process-block',
  templateUrl: './process-block.component.html',
  styleUrls: ['./process-block.component.scss']
})
export class ProcessBlockComponent implements OnInit {
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

  ngOnInit() {
    // No-op: intentionally empty
  }

}
