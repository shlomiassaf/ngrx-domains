import * as routerStore from '@ngrx/router-store';
import { Actions } from 'ngrx-domains';

export const ActionTokens = routerStore.routerActions;

export interface RouterActions {
  readonly GO: string;
  readonly REPLACE: string;
  readonly SEARCH: string;
  readonly SHOW: string;
  readonly BACK: string;
  readonly FORWARD: string;
  readonly UPDATE_LOCATION: string;

  readonly go: typeof routerStore.go;
  readonly replace: typeof routerStore.replace;
  readonly search: typeof routerStore.search;
  readonly show: typeof routerStore.show;
  readonly back: typeof routerStore.back;
  readonly forward: typeof routerStore.forward;
}

Actions.router = Object.assign({
  go: routerStore.go,
  replace: routerStore.replace,
  search: routerStore.search,
  show: routerStore.show,
  back: routerStore.back,
  forward: routerStore.forward
}, routerStore.routerActions);

declare module 'ngrx-domains' {
  interface Actions {
    router: RouterActions;
  }
}



