import { State } from 'ngrx-domains';
import { MOBILE } from '../../services/constants';

State.nav = {
  toggleState: !MOBILE,
  sidenavSize: null
};

declare module 'ngrx-domains' {
  export interface NavSchema {
    toggleState: boolean;
    sidenavSize: number;
  }


  interface State {
    nav: NavSchema;
  }
}



