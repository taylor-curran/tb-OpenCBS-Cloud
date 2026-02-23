import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'cbs-confirm-popup',
  templateUrl: 'cbs-confirm-popup.component.html',
  styleUrls: ['cbs-confirm-popup.component.scss']
})

export class ConfirmPopupComponent {
  @HostBinding('style.display') display = 'none';

  @Input() set opened(val: boolean) {
    this.display = val ? 'block' : 'none';
  }

  @Input() confirmText: string;
  @Input() popupLabel: string;
  @Input() showTextarea = false;
  @Input() textareaLabel: string;
  @Input() textareaHolderText: string;
  @Input() leftButtonLabel: string;
  @Input() rightButtonLabel: string;
  @Output() openedChange = new EventEmitter();
  @Output() submitClick = new EventEmitter();
  @Output() closeAction = new EventEmitter();
  public selectedAction: any;
  public textareaVal = '';
  cancelConfirm() {
    this.opened = false;
    this.selectedAction = '';
    this.openedChange.emit(this.opened);
    this.closeAction.emit();
    this.textareaVal = '';
  }

  submitAction({value, valid}) {
    this.submitClick.emit(value);
    this.opened = false;
    this.openedChange.emit(this.opened);
    this.textareaVal = '';
  }
}
