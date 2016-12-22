import { Action } from '@ngrx/store';
import { Actions } from 'ngrx-domains';

export const ActionTokens = {
  TOGGLE_SIDENAV: '[NavLayout] Toggle Sidenav',
};

export class ToggleSidenavAction implements Action {
  type = ActionTokens.TOGGLE_SIDENAV;

  constructor(public payload?: boolean) { }

  static readonly TOKEN = ActionTokens.TOGGLE_SIDENAV;
}

Actions.nav = {
  ToggleSidenavAction
};

declare module 'ngrx-domains' {
  interface Actions {
    nav: {
      ToggleSidenavAction: typeof ToggleSidenavAction
    };
  }
}



