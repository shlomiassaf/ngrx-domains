import { Response } from '@angular/http';
import { Action } from '@ngrx/store';
import { Actions } from 'ngrx-domains';

export class UserActions2 {
  static EDIT_USER = '[User] Edit User2';
  editUser(user: any): Action {
    return {
      type: UserActions2.EDIT_USER,
      payload: user
    };
  }

  static LOGOUT = '[User] Logout2';
  logout(): Action {
    return {
      type: UserActions2.LOGOUT
    };
  }

  static LOGOUT_FAIL = '[User] Logout Fail2';
  logoutFail(err: Error): Action {
    return {
      type: UserActions2.LOGOUT_FAIL,
      payload: err
    };
  }

  static LOGOUT_SUCCESS = '[User] Logout Success2';
  logoutSuccess(res: Response): Action {
    return {
      type: UserActions2.LOGOUT_SUCCESS,
      payload: res
    };
  }
}

Actions.user2 = new UserActions2();

declare module 'ngrx-domains' {
  interface Actions {
    user2: UserActions2;
  }
}



