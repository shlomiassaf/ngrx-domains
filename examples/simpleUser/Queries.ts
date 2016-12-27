import { SimpleUserState, Query, Queries, Root, combineRootFactory } from 'ngrx-domains';

export interface SimpleQueries {
  // IN: State.simpleUser -> OUT: State.simpleUser.loggedIn
  loggedIn: Query<boolean>;
}

/* SEE domains/boks/queries.ts for a detailed explanation */
const fromRoot = combineRootFactory<SimpleUserState>('simpleUser');

Queries.simpleUser = {
  loggedIn: fromRoot( state => state.loggedIn )
};


declare module 'ngrx-domains' {
  interface Root {
    simpleUser: Query<SimpleUserState>;
  }

  interface Queries {
    simpleUser: SimpleQueries;
  }
}
