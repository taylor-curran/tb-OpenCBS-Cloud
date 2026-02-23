import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cbs-page-header',
  templateUrl: 'page-header.component.html',
  styleUrls: ['page-header.component.scss']
})
export class PageHeaderComponent {
  @Input() isTwoColumn: boolean;

  constructor() {
  }
}


