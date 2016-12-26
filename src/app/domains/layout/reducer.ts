import { Actions, LayoutState, State } from 'ngrx-domains';

export function reducer(state: LayoutState = State.layout, action: any): LayoutState {
  switch (action.constructor) {
    case Actions.layout.CloseSidenavAction:
      return {
        showSidenav: false
      };

    case Actions.layout.OpenSidenavAction:
      return {
        showSidenav: true
      };

    default:
      return state;
  }
}
