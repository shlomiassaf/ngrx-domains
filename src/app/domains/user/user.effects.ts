/* tslint:disable: member-ordering */
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { State } from 'ngrx-domains/State'
import { Actions as ActionMap } from 'ngrx-domains/Actions';
import { UserActions } from './Actions';
import { UserService } from './user.service';


@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private userService: UserService
  ) { }

  @Effect() logout$ = this.actions$
    .ofType(UserActions.LOGOUT)
    .map(action => action.payload)
    .switchMap(() => this.userService.logout()
      .mergeMap((res: any) => Observable.of(
        ActionMap.user.logoutSuccess(res)
        )
      )
      .catch((err) => Observable.of(
        ActionMap.user.logoutFail(err)
      ))
    );
}
