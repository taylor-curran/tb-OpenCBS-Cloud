import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cbs-list-select',
  templateUrl: 'cbs-list-select.component.html',
  styleUrls: ['cbs-list-select.component.scss']
})

export class ListSelectComponent  {
  @Input() listLabel: string;
  @Input() noDataLabel: string;
  @Input() listData = [];
  @Input() displayButton = true;
  @Input() picklistData = [];
  @Input() isRequired = true;
  @Input() selectDataLabel: string;
  @Output() selectItem = new EventEmitter();
  @Output() removeItem = new EventEmitter();


  public pick: any = [];
  public open = false;
  handleSelectItem(pickedItem) {
    this.selectItem.emit(pickedItem);
  }

  delete(removedItem) {
    this.removeItem.emit(removedItem);
  }
}
