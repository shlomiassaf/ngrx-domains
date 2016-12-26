import { CollectionState, Query, Queries, Root, combineRootFactory } from 'ngrx-domains';

export interface CollectionQueries {
  getLoaded: Query<boolean>;
  getLoading: Query<boolean>;
  getIds: Query<string[]>;
}

/* SEE domains/boks/queries.ts for a detailed explanation */
const fromRoot = combineRootFactory<CollectionState>('collection');

Queries.collection = {
  getLoaded: fromRoot( state => state.loaded ),
  getLoading: fromRoot( state => state.loading ),
  getIds: fromRoot( state => state.ids )
};

declare module 'ngrx-domains' {
  interface Root {
    collection: Query<CollectionState>;
  }

  interface Queries {
    collection: CollectionQueries;
  }
}
