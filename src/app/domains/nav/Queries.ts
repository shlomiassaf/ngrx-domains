import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';

import { Query } from 'ngrx-domains';
import { State, NavSchema } from 'ngrx-domains/State';
import { Queries, Root, setQueries } from 'ngrx-domains/Queries';

/*
 The root query is auto-generated, unless specified.
 There's no need to set it unless there is some wierd state structure.
 */
//Root.nav = (state$: Observable<State>) => state$.select(state => state.nav);

export interface NavQueries {
  showSidenav: Query<NavSchema, boolean>;
  sidenavSize: Query<NavSchema, number>;
}


setQueries('nav', {
  showSidenav: (state$: Observable<NavSchema>) => state$.select(state => state.toggleState),
  sidenavSize: <any>false
});


declare module 'ngrx-domains/Queries' {
  interface Root {
    nav: Query<State, NavSchema>;
  }

  interface Queries {
    nav: NavQueries;
  }
}
