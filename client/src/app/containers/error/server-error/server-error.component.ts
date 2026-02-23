import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cbs-server-error',
  templateUrl: 'server-error.component.html'
})
export class ServerErrorComponent {
  constructor(private router: Router) {
  }
goHome() {
    this.router.navigateByUrl('/');
  }
}
