import * as routerStore from '@ngrx/router-store';
import { Actions } from 'ngrx-domains/Actions';


export const ActionTokens = routerStore.routerActions;

export class RouterActions {
  readonly GO: string = routerStore.routerActions.GO;
  readonly REPLACE: string = routerStore.routerActions.REPLACE;
  readonly SEARCH: string = routerStore.routerActions.SEARCH;
  readonly SHOW: string = routerStore.routerActions.SHOW;
  readonly BACK: string = routerStore.routerActions.BACK;
  readonly FORWARD: string = routerStore.routerActions.FORWARD;
  readonly UPDATE_LOCATION: string = routerStore.routerActions.UPDATE_LOCATION;

  readonly go = routerStore.go;
  readonly replace = routerStore.replace;
  readonly search = routerStore.search;
  readonly show = routerStore.show;
  readonly back = routerStore.back;
  readonly forward = routerStore.forward;
}
Actions.router = new RouterActions();

declare module 'ngrx-domains/Actions' {
  interface Actions {
    router: RouterActions;
  }
}



