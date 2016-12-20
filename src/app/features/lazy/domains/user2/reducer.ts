import { Action } from '@ngrx/store';
import { State, UserSchema } from 'ngrx-domains/State';
import {  UserActions } from './Actions';

export function reducer(state: UserSchema, action: Action): UserSchema {
  if (!state) state = State.user;

  switch (action.type) {

    case UserActions.EDIT_USER: {
      return Object.assign({}, state, {
        user: action.payload
      });
    }

    default: {
      return state;
    }
  }
}
