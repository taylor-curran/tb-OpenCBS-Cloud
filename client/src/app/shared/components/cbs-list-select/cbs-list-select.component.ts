import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cbs-list-select',
  templateUrl: 'cbs-list-select.component.html',
  styleUrls: ['cbs-list-select.component.scss']
})

export class ListSelectComponent implements OnInit {
  @Input() listLabel: string;
  @Input() noDataLabel: string;
  @Input() listData = [];
  @Input() displayButton = true;
  @Input() picklistData = [];
  @Input() isRequired = true;
  @Input() selectDataLabel: string;
  @Output() selectItemChange = new EventEmitter();
  @Output() removeItemChange = new EventEmitter();


  public pick: any = [];
  public open = false;

  ngOnInit() {
    // No-op: intentionally left empty
  }

  selectItem(pickedItem) {
    this.selectItemChange.emit(pickedItem);
  }

  delete(removedItem) {
    this.removeItemChange.emit(removedItem);
  }
}
