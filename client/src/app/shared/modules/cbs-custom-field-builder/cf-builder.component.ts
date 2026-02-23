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
  @Output() sectionEditSuccessChanged = new EventEmitter();
  @Output() sectionEditErrorChanged = new EventEmitter();
  @Output() sectionAddSuccessChanged = new EventEmitter();
  @Output() sectionAddErrorChanged = new EventEmitter();
  @Output() fieldEditSuccessChanged = new EventEmitter();
  @Output() fieldEditErrorChanged = new EventEmitter();
  @Output() fieldDeleteSuccessChanged = new EventEmitter();
  @Output() fieldDeleteErrorChanged = new EventEmitter();
  @Output() fieldAddSuccessChanged = new EventEmitter();
  @Output() fieldAddErrorChanged = new EventEmitter();
  @ViewChildren(CFSectionComponent) sections: QueryList<CFSectionComponent>;
  @ViewChildren(CFFieldComponent) fields: QueryList<CFFieldComponent>;
  @ViewChildren(CFAddComponent) addBtns: QueryList<CFAddComponent>;
  public sectionAddMode = false;

  callSectionEditSuccess(editedSectionData) {
    this.sectionEditSuccessChanged.emit(editedSectionData);
  }

  callSectionEditError(error) {
    this.sectionEditErrorChanged.emit(error);
  }

  callSectionAddSuccess(newSectionData) {
    this.sectionAddSuccessChanged.emit(newSectionData);
  }

  callSectionAddError(error) {
    this.sectionAddErrorChanged.emit(error);
  }

  callFieldEditSuccess(editedData) {
    this.fieldEditSuccessChanged.emit(editedData);
  }

  callFieldEditError(error) {
    this.fieldEditErrorChanged.emit(error);
  }

  callFieldDeleteSuccess(deleteData) {
    this.fieldDeleteSuccessChanged.emit(deleteData);
  }

  callFieldDeleteError(error) {
    this.fieldDeleteErrorChanged.emit(error);
  }

  callFieldAddSuccess(sectionDataWithNewField: { data, sectionId }) {
    const addBtnOnCurrentSection = this.getAddComponentBtnById(sectionDataWithNewField.sectionId);

    addBtnOnCurrentSection.disabled = false;

    this.fieldAddSuccessChanged.emit(sectionDataWithNewField.data);
  }

  callFieldAddError(error) {
    this.fieldAddErrorChanged.emit(error);
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
