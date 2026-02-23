import { Component, Input, OnDestroy } from '@angular/core';
import { scrollTo } from '../../utils/scroll-to.utils';

interface NavItem {
  title: string;
  id: number;
}

@Component({
  selector: 'cbs-scrollable-nav',
  templateUrl: 'scrollable-nav.component.html',
  styleUrls: ['scrollable-nav.component.scss']
})
export class ScrollableNavComponent implements OnDestroy {
  @Input() navData: NavItem[] = [];
  @Input() selectorName = '';
  @Input() parentSelector = '';
  @Input() offset = 0;
  @Input() activeItemId = 1;

  constructor() {
  }

  ngOnDestroy() {
    this.navData = [];
  }

  scrollTo(selector) {
    scrollTo(
      selector,
      this.parentSelector,
      false,
      this.offset
    );
  }
}
