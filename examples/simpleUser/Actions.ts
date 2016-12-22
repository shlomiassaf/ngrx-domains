import { Action } from '@ngrx/store';
import { Actions } from 'ngrx-domains';

export class UserActions {
  static CHANGE_NAME = '[SimpleUser] Change User Name';
  changeName(name: string): Action {
    return {
      type: UserActions.CHANGE_NAME,
      payload: name
    };
  }
}

// this will fail type check if the module declaration below is not set
Actions.simpleUser = new UserActions();

// adding type information
declare module 'ngrx-domains' {
  interface Actions {
    simpleUser: UserActions;
  }
}



