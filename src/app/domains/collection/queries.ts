import { State, CollectionState, Query, Queries, Root, setQueries } from 'ngrx-domains';


export interface CollectionQueries {
  getLoaded: Query<CollectionState, boolean>;
  getLoading: Query<CollectionState, boolean>;
  getIds: Query<CollectionState, string[]>;
}

export const getLoaded = (state: CollectionState) => state.loaded;

export const getLoading = (state: CollectionState) => state.loading;

export const getIds = (state: CollectionState) => state.ids;


setQueries('collection', { getLoaded, getLoading, getIds });


declare module 'ngrx-domains' {
  interface Root {
    collection: Query<State, CollectionState>;
  }

  interface Queries {
    collection: CollectionQueries;
  }
}
