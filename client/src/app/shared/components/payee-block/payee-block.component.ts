import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPayeeItem } from '../../../core/store/loan-application/loan-application-form/loan-application-form.interfaces';

@Component({
  selector: 'cbs-payee-block',
  templateUrl: './payee-block.component.html',
  styleUrls: ['./payee-block.component.scss']
})
export class PayeeBlockComponent {
  @Input() payee: IPayeeItem;
  @Input() readonly = false;
  @Input() showEditBtn = true;
  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  edit(payee) {
    this.editEvent.emit(payee);
  }

  delete(payee) {
    this.deleteEvent.emit(payee);
  }

  checkLength(str: string) {
    if (!str) {
      return false;
    }
    return str.split('').length > 26;
  }
}
