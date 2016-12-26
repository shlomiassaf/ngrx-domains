import { createSelector } from 'reselect';
import { State, Model, BooksState, Query, Queries, Root, setQueries } from 'ngrx-domains';


export interface BookQueries {
  getEntities: Query<BooksState, { [id: string]: Model.Book }>;
  getIds: Query<BooksState, string[]>;
  getSelectedId: Query<BooksState, string>;
  getSelected: Query<BooksState, Model.Book>;
  getAll: Query<BooksState, Model.Book[]>;
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */
export const getEntities = (state: BooksState) => state.entities;

export const getIds = (state: BooksState) => state.ids;

export const getSelectedId = (state: BooksState) => state.selectedBookId;

// TODO(shlomiassaf): see index.ts
setQueries('books', { getEntities, getIds, getSelectedId });


declare module 'ngrx-domains' {
  interface Root {
    books: Query<State, BooksState>;
  }

  interface Queries {
    books: BookQueries;
  }
}
