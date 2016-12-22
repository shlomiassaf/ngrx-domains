import { Action } from '@ngrx/store';
import { State, SimpleUserState, Model } from 'ngrx-domains';
import { UserActions } from './Actions';

export function reducer(state: SimpleUserState, action: Action): SimpleUserState {
  if (!state) state = State.simpleUser; // State.simpleUser is typed

  switch (action.type) {
    case UserActions.CHANGE_NAME: {
      return Object.assign({}, state, {
        user: new Model.SimpleUser(action.payload)
      });
    }

    default: {
      return state;
    }
  }
}
