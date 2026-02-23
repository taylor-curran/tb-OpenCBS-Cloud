import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {
};

interface ListItem {
  value: string | number;
  name: string;
}

export const FORM_SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormSelectControlComponent),
  multi: true
};

@Component({
  selector: 'cbs-form-select-control',
  templateUrl: './form-select-control.component.html',
  styleUrls: ['./form-select-control.component.scss'],
  providers: [
    FORM_SELECT_CONTROL_VALUE_ACCESSOR
  ]
})
export class FormSelectControlComponent implements ControlValueAccessor {
  @Input() requiredField = false;
  @Input() fieldLabel = '';
  @Input() hasError = false;
  @Input() disabled = false;
  @Input() showError = true;
  @Input() selectPlaceholder = 'SELECT';
  @Input() styleClass = '';
  @Input() style = '';
  @Input() selectValue = 'value';
  @Input() selectData = <ListItem[]>[];
  @Output() changeEvent = new EventEmitter();
  @Output() selectEvent = new EventEmitter();

  public innerValue = '';

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  get value(): any {
    return this.innerValue;
  };

  set value(v: any) {
    if (v && v !== this.innerValue) {
      this.selectEvent.emit(v);
      this.innerValue = v;
      this.changeEventCallback(v);
    } else {
      this.innerValue = null;
      this.changeEventCallback(null);
    }
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  remove() {
    this.innerValue = null;
    this.changeEvent.emit(null);
  }

  registerOnChange(fn: any) {
    this.changeEventCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onBlur() {
    this.onTouchedCallback();
  }

  inputChange(value) {
    this.changeEvent.emit(value);
  }
}
