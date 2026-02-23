import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { CFBuilderService } from '../cf-builder.service';

@Component({
  selector: 'cbs-cf-section',
  templateUrl: 'cf-section.component.html',
  styleUrls: ['cf-section.component.scss']
})
export class CFSectionComponent {
  @Input() url: string;
  @Input() sectionData: any;
  @Output() editSuccess = new EventEmitter();
  @Output() editError = new EventEmitter();
  @Output() addSuccess = new EventEmitter();
  @Output() addError = new EventEmitter();
  @Output() addCancel = new EventEmitter();
  @ViewChild('caption', {static: false, read: ElementRef}) captionInput: ElementRef;
  public isEditView = false;
  public newSectionMode = false;
  public formChanged = false;

  private cachedCaption: string;

  constructor(private service: CFBuilderService) {
  }
  submitForm({valid, value}) {
    if ( valid && value.caption !== this.cachedCaption && !this.newSectionMode ) {
      this.updateSection(value);
    } else if ( valid && this.newSectionMode ) {
      this.createSection(value);
    }
  }

  updateSection(data) {
    this.service.updateSection(this.url, this.sectionData.id, data).subscribe(
      resp => {
        this.editSuccess.emit(resp);
        this.closeEdit();
      },
      err => {
        alert(err.error.message);
        this.editError.emit(err.error);
      }
    );
  }

  createSection(data) {
    this.service.createSection(this.url, data).subscribe(
      resp => {
        this.addSuccess.emit(resp);
        this.closeEdit();
        this.newSectionMode = false;
      },
      err => {
        alert(err.error.message);
        this.addError.emit(err.error);
      }
    );
  }

  activateEdit(cachedCaption) {
    this.cachedCaption = cachedCaption;
    this.isEditView = true;
    this.focusCaptionInput();
  }

  checkValueChange(value) {
    this.formChanged = value !== this.cachedCaption;
  }

  closeEdit() {
    this.cachedCaption = '';
    this.formChanged = false;

    if ( this.newSectionMode ) {
      this.addCancel.emit();
    } else {
      this.isEditView = false;
    }
  }

  activateNewSectionMode() {
    this.newSectionMode = true;
    this.isEditView = true;
    this.focusCaptionInput();
  }

  focusCaptionInput() {
    setTimeout(() => {
      this.captionInput.nativeElement.focus();
    });
  }
}
