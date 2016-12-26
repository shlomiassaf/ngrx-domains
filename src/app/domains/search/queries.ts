import { SearchState, Query, Queries, Root, combineRootFactory } from 'ngrx-domains';

export interface SearchQueries {
  getIds: Query<string[]>;
  getQuery: Query<string>;
  getLoading: Query<boolean>;
}


/* SEE domains/boks/queries.ts for a detailed explanation */
const fromRoot = combineRootFactory<SearchState>('search');


Queries.search = {
  getIds: fromRoot(state => state.ids ),
  getQuery: fromRoot(state => state.query ),
  getLoading: fromRoot(state => state.loading )
};


declare module 'ngrx-domains' {
  interface Root {
    search: Query<SearchState>;
  }

  interface Queries {
    search: SearchQueries;
  }
}
