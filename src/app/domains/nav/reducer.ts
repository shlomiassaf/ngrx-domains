import { Action } from '@ngrx/store';
import { State, NavSchema } from 'ngrx-domains/State';
import { Actions } from 'ngrx-domains/Actions';

import { MOBILE } from '../../services/constants';

export function reducer(state: NavSchema, action: Action): NavSchema {
  if (!state) state = State.nav;

  switch (action.type) {
    case Actions.nav.ToggleSidenavAction.TOKEN: {
      return Object.assign({}, state, { toggleState: MOBILE ? false : !state.toggleState });
    }
    default:
      return state;
  }
}
