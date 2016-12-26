import { State, SearchState, Query, Queries, Root, setQueries } from 'ngrx-domains';


export interface SearchQueries {
  getIds: Query<SearchState, string[]>;
  getQuery: Query<SearchState, string>;
  getLoading: Query<SearchState, boolean>;
}
export const getIds = (state: SearchState) => state.ids;

export const getQuery = (state: SearchState) => state.query;

export const getLoading = (state: SearchState) => state.loading;

setQueries('search', { getIds, getQuery, getLoading });


declare module 'ngrx-domains' {
  interface Root {
    search: Query<State, SearchState>;
  }

  interface Queries {
    search: SearchQueries;
  }
}
