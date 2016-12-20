import { State } from 'ngrx-domains/State';
import { MOBILE } from '../../services/constants';

State.nav = {
  toggleState: !MOBILE,
  sidenavSize: null
};

declare module 'ngrx-domains/State' {
  export interface NavSchema {
    toggleState: boolean;
    sidenavSize: number;
  }


  interface State {
    nav: NavSchema;
  }
}



