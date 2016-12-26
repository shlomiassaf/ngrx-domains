import { Action } from '@ngrx/store';
import { Actions } from 'ngrx-domains';
import { type } from '../../util';

export const ActionTypes = {
  OPEN_SIDENAV:   type('[Layout] Open Sidenav'),
  CLOSE_SIDENAV:  type('[Layout] Close Sidenav')
};


export class OpenSidenavAction implements Action {
  type = ActionTypes.OPEN_SIDENAV;
}

export class CloseSidenavAction implements Action {
  type = ActionTypes.CLOSE_SIDENAV;
}


Actions.layout = {
  TYPES: ActionTypes,
  OpenSidenavAction,
  CloseSidenavAction
};

declare module 'ngrx-domains' {
  interface Actions {
    layout: {
      TYPES: typeof ActionTypes,
      OpenSidenavAction: typeof OpenSidenavAction;
      CloseSidenavAction: typeof CloseSidenavAction;
    };
  }
}

