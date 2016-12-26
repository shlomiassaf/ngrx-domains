import './books';
import './collection';
import './layout';
import './search';
import './router';

import { createSelector } from 'reselect';
import { State, Model, Query, Queries, setQueries } from 'ngrx-domains';


export interface BookCollectionQueries {
  getSearchResults: Query<State, Model.Book[]>;
  getBookCollection: Query<State, Model.Book[]>;
  isSelectedBookInCollection: Query<State, boolean>;
}

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of books in the store.
 */
export const getSearchResults = createSelector(Queries.books.getEntities as any, Queries.search.getIds as any, (books, searchIds: string[]) => {
  return searchIds.map(id => books[id]);
});

export const getBookCollection = createSelector(Queries.books.getEntities as any, Queries.collection.getIds as any, (entities, ids: string[]) => {
  return ids.map(id => entities[id]);
});

export const isSelectedBookInCollection = createSelector(Queries.collection.getIds as any, Queries.search.getIds as any, (ids: string[], selected) => {
  return ids.indexOf(selected) > -1;
});



setQueries('global', { getSearchResults, getBookCollection, isSelectedBookInCollection });


declare module 'ngrx-domains' {
  interface Queries {
    global: BookCollectionQueries;
  }
}


export { BookEffects } from './books';
export { CollectionEffects } from './collection';
