import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as fromStore from '../../../../../core/store'
import { RoleListState, getRoles } from '../../../../../core/store';

@Injectable()
export class DependentOnRolesGuard implements CanActivate {
  constructor(private roleStore$: Store<RoleListState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.roleStore$.pipe(
      getRoles(),
      take(1),
      map(roles => {
        if (!roles) {
          this.roleStore$.dispatch(new fromStore.LoadRoleList());
        }
        return true;
      })
    );
  }
}
