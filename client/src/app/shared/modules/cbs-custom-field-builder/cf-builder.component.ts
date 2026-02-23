import { Component, Input, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';

import { CFSectionComponent } from './cf-section/cf-section.component';
import { CFFieldComponent } from './cf-field/cf-field.component';
import { CFAddComponent } from './cf-add/cf-add.component';

@Component({
  selector: 'cbs-cf-builder',
  templateUrl: 'cf-builder.component.html',
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class CFBuilderComponent {
  @Input() data: any;
  @Input() urls: { sectionUrl, fieldUrl };
  @Input() fieldLookupTypes = [];
  @Input() fieldTypes = [];
  @Output() sectieditSuccess = new EventEmitter();
  @Output() sectieditError = new EventEmitter();
  @Output() sectionAddSuccess = new EventEmitter();
  @Output() sectionAddError = new EventEmitter();
  @Output() fieldEditSuccess = new EventEmitter();
  @Output() fieldEditError = new EventEmitter();
  @Output() onFieldDeleteSuccess = new EventEmitter();
  @Output() onFieldDeleteError = new EventEmitter();
  @Output() onFieldAddSuccess = new EventEmitter();
  @Output() onFieldAddError = new EventEmitter();
  @ViewChildren(CFSectionComponent) sections: QueryList<CFSectionComponent>;
  @ViewChildren(CFFieldComponent) fields: QueryList<CFFieldComponent>;
  @ViewChildren(CFAddComponent) addBtns: QueryList<CFAddComponent>;
  public sectionAddMode = false;

  callSectieditSuccess(editedSectionData) {
    this.sectieditSuccess.emit(editedSectionData);
  }

  callSectieditError(error) {
    this.sectieditError.emit(error);
  }

  callSectionAddSuccess(newSectionData) {
    this.sectionAddSuccess.emit(newSectionData);
  }

  callSectionAddError(error) {
    this.sectionAddError.emit(error);
  }

  callFieldEditSuccess(editedData) {
    this.fieldEditSuccess.emit(editedData);
  }

  callFieldEditError(error) {
    this.fieldEditError.emit(error);
  }

  callFieldDeleteSuccess(deleteData) {
    this.onFieldDeleteSuccess.emit(deleteData);
  }

  callFieldDeleteError(error) {
    this.onFieldDeleteError.emit(error);
  }

  callFieldAddSuccess(sectionDataWithNewField: { data, sectionId }) {
    const addBtnOnCurrentSection = this.getAddComponentBtnById(sectionDataWithNewField.sectionId);

    addBtnOnCurrentSection.disabled = false;

    this.onFieldAddSuccess.emit(sectionDataWithNewField.data);
  }

  callFieldAddError(error) {
    this.onFieldAddError.emit(error);
  }

  addSection() {
    this.data = [...this.data, {caption: ''}];
    this.sectionAddMode = true;
    setTimeout(() => {
      const lastSection = this.sections.last;
      lastSection.activateNewSectionMode();
    });
  }

  addField(sectionId) {
    let newlyAddedFieldComponent: CFFieldComponent;
    let addBtnOnCurrentSection: CFAddComponent;

    const sectionArray = [];
    this.data.map(section => {
      if (section.id === sectionId) {
        section = Object.assign({}, section, {
          customFields: Array.prototype.concat(section.customFields, [{
            caption: '',
            fieldType: '',
            unique: false,
            required: false,
            sectionId: sectionId
          }])
        });
      }
      sectionArray.push(section);
    });
    this.data = sectionArray;
    setTimeout(() => {
      newlyAddedFieldComponent = this.fields.filter((fieldComponent: CFFieldComponent) => {
        return fieldComponent.sectionId === sectionId;
      }).slice(-1)[0];
      newlyAddedFieldComponent.activateNewFieldMode();
      addBtnOnCurrentSection = this.getAddComponentBtnById(sectionId);

      addBtnOnCurrentSection.disabled = true;
    });

  }

  onSectionAddCancel() {
    this.sectionAddMode = false;
    this.data.pop();
  }

  onFieldAddCancel(sectionId) {
    this.data.map(section => {
      if (section.id === sectionId) {
        section.customFields.pop();
      }
    });

    const addBtnOnCurrentSection = this.getAddComponentBtnById(sectionId);

    addBtnOnCurrentSection.disabled = false;
  }

  getAddComponentBtnById(id: number) {
    return this.addBtns.filter((addBtn: CFAddComponent) => {
      return addBtn.uid === id;
    })[0];
  }
}
