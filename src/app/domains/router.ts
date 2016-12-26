import { State  } from 'ngrx-domains';
import { RouterState } from '@ngrx/router-store';

declare module 'ngrx-domains' {
  interface State {
    router: RouterState;
  }
}



