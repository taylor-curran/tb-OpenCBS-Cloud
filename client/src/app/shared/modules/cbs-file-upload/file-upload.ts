import {
  NgModule,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  AfterContentInit,
  ContentChildren,
  QueryList
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CbsTemplateDirective, SharedTreetableModule } from '../cbs-tree-table/shared-treetable';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cbs-file-upload',
  templateUrl: 'file-upload.html',
  styleUrls: ['file-upload.scss']
})
export class FileUploadComponent implements OnInit, AfterContentInit {

  @Input() name: string;

  @Input() url: string;

  @Input() multiple: boolean;

  @Input() hasComments: boolean;

  @Input() accept: string;

  @Input() disabled: boolean;

  @Input() auto: boolean;

  @Input() maxFileSize: number;

  @Input() invalidFileSizeMessageSummary = '{0}: Invalid file size, ';

  @Input() invalidFileSizeMessageDetail = 'Maximum upload size is {0}.';

  @Input() style: string;

  @Input() includeToken: boolean;

  @Input() tokenName = 'token';

  @Input() title: string;

  @Input() size = 'large';

  @Input() styleClass: string;

  @Input() previewWidth = 50;

  @Input() chooseLabel = 'Choose';

  @Input() uploadLabel = 'Upload';

  @Input() cancelLabel = 'Cancel';

  @Input() dropLabel = 'or Drop File';

  @Output() beforeUpload: EventEmitter<any> = new EventEmitter();

  @Output() beforeSend: EventEmitter<any> = new EventEmitter();

  @Output() upload: EventEmitter<any> = new EventEmitter();

  @Output() error: EventEmitter<any> = new EventEmitter();

  @Output() clear: EventEmitter<any> = new EventEmitter();

  @Output() select: EventEmitter<any> = new EventEmitter();

  @ContentChildren(CbsTemplateDirective) templates: QueryList<any>;

  public files: File[];

  public progress = 0;

  public uploading = false;

  public dragHighlight: boolean;

  public msgs: any[] = [];

  public fileTemplate: TemplateRef<any>;

  public contentTemplate: TemplateRef<any>;

  public toolbarTemplate: TemplateRef<any>;

  public fileComment = '';

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.files = [];
  }

  ngAfterContentInit(): void {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'file':
          this.fileTemplate = item.template;
          break;

        case 'content':
          this.contentTemplate = item.template;
          break;

        case 'toolbar':
          this.toolbarTemplate = item.template;
          break;

        default:
          this.fileTemplate = item.template;
          break;
      }
    });
  }

  onChooseClick(event, fileInput) {
    fileInput.value = null;
    fileInput.click();
  }

  onFileSelect(event) {
    this.msgs = [];
    if (!this.multiple) {
      this.files = [];
    }

    const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (this.validate(file)) {
        if (this.isImage(file)) {
          file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
        }

        this.files.push(files[i]);
      }
    }

    this.select.emit({originalEvent: event, files: files});

    if (this.hasFiles() && this.auto) {
      this.uploadFiles();
    }
  }

  validate(file: File): boolean {
    if (this.maxFileSize && file.size > this.maxFileSize) {
      this.msgs.push({
        summary: this.invalidFileSizeMessageSummary.replace('{0}', file.name),
        detail: this.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.maxFileSize))
      });
      return false;
    }

    return true;
  }

  isImage(file: File): boolean {
    return /^image\//.test(file.type);
  }

  onImageLoad(img: any) {
    window.URL.revokeObjectURL(img.src);
  }

  uploadFiles() {
    this.uploading = true;
    this.msgs = [];
    const xhr = new XMLHttpRequest(),
      formData = new FormData();

    this.beforeUpload.emit({
      'xhr': xhr,
      'formData': formData
    });

    for (let i = 0; i < this.files.length; i++) {
      formData.append(this.name, this.files[i], this.files[i].name);
    }

    xhr.upload.addEventListener('progress', (e: ProgressEvent) => {
      if (e.lengthComputable) {
        this.progress = Math.round((e.loaded * 100) / e.total);
      }
    }, false);


    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        this.fileComment = '';
        this.progress = 0;
        if (xhr.status >= 200 && xhr.status < 300) {
          this.upload.emit({xhr: xhr, files: this.files});
        } else {
          this.error.emit({xhr: xhr, files: this.files});
        }
        this.clearFiles();
        this.uploading = false;
      }
    };

    this.hasComments ? xhr.open('POST', this.url + '?comment=' + this.fileComment, true) : xhr.open('POST', this.url, true);

    if (this.includeToken) {
      const token = window.localStorage.getItem(this.tokenName);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }


    this.beforeSend.emit({
      'xhr': xhr,
      'formData': formData
    });

    xhr.send(formData);
  }

  clearFiles() {
    this.files = [];
    this.clear.emit();
  }

  remove(index: number) {
    this.files.splice(index, 1);
  }

  hasFiles(): boolean {
    return this.files && this.files.length > 0;
  }

  onDragEnter(e) {
    if (!this.disabled) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  onDragOver(e) {
    if (!this.disabled) {
      this.dragHighlight = true;
      e.stopPropagation();
      e.preventDefault();
    }
  }

  onDragLeave(e) {
    if (!this.disabled) {
      this.dragHighlight = false;
    }
  }

  onDrop(e) {
    if (!this.disabled) {
      this.dragHighlight = false;
      e.stopPropagation();
      e.preventDefault();

      this.onFileSelect(e);
    }
  }

  formatSize(bytes) {
    if (bytes === 0) {
      return '0 B';
    }
    const k = 1000,
      dm = 3,
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}

@NgModule({
    imports: [CommonModule, SharedTreetableModule, FormsModule, TranslateModule],
  exports: [FileUploadComponent, SharedTreetableModule],
  declarations: [FileUploadComponent]
})
export class FileUploadModule {
}
