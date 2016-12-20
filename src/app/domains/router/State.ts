import { State } from 'ngrx-domains/State';
import { RouterState } from '@ngrx/router-store';

declare module 'ngrx-domains/State' {
  interface State {
    router: RouterState;
  }
}



