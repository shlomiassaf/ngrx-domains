import { Observable } from 'rxjs/Observable';

import { State, SimpleUserState, Query, Queries, Root, setQueries } from 'ngrx-domains';

export interface SimpleQueries {
  // IN: State.simpleUser -> OUT: State.simpleUser.loggedIn
  loggedIn: Query<SimpleUserState, boolean>;
}


setQueries('simpleUser', {
  loggedIn: (state$: Observable<SimpleQueries>) => state$.select(state => state.loggedIn)
  /* OR:
   loggedIn: <any>false

   will auto generate a query returning a property from the state with the same name (loggedIn)
   */
});


declare module 'ngrx-domains' {
  // set root query (runtime query auto-generated)
  // so we can store.let(Root.simpleUser);
  interface Root {
    simpleUser: Query<State, SimpleUserState>;
  }

  interface Queries {
    simpleUser: SimpleQueries;
  }
}
