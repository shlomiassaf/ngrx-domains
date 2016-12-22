import { Action } from '@ngrx/store';
import { State, UserSchema2 } from 'ngrx-domains';
import { UserActions2 } from './Actions';

export function reducer(state: UserSchema2, action: Action): UserSchema2 {
  if (!state) state = State.user2;

  switch (action.type) {

    case UserActions2.EDIT_USER: {
      return Object.assign({}, state, {
        user2: action.payload
      });
    }

    default: {
      return state;
    }
  }
}
