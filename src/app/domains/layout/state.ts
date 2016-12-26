import { State } from 'ngrx-domains';

State.layout = {
  showSidenav: false
};

declare module 'ngrx-domains' {
  export interface LayoutState {
    showSidenav: boolean;
  }

  interface State {
    layout: LayoutState;
  }
}
