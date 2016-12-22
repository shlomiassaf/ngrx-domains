import { Response } from '@angular/http';
import { Action } from '@ngrx/store';
import { Actions, Model } from 'ngrx-domains';

export class UserActions {
  static EDIT_USER = '[User] Edit User';
  editUser(user: Model.User): Action {
    return {
      type: UserActions.EDIT_USER,
      payload: user
    };
  }

  static LOGOUT = '[User] Logout';
  logout(): Action {
    return {
      type: UserActions.LOGOUT
    };
  }

  static LOGOUT_FAIL = '[User] Logout Fail';
  logoutFail(err: Error): Action {
    return {
      type: UserActions.LOGOUT_FAIL,
      payload: err
    };
  }

  static LOGOUT_SUCCESS = '[User] Logout Success';
  logoutSuccess(res: Response): Action {
    return {
      type: UserActions.LOGOUT_SUCCESS,
      payload: res
    };
  }
}

Actions.user = new UserActions();

declare module 'ngrx-domains' {
  interface Actions {
    user: UserActions;
  }
}



