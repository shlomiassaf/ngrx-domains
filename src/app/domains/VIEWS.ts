import { createSelector } from 'reselect';
import { Model, Query, Queries } from 'ngrx-domains';

const { books, search, collection } = Queries;

export interface VIEWQueries {
  getSearchResults: Query<Model.Book[]>;
  getBookCollection: Query<Model.Book[]>;
  isSelectedBookInCollection: Query<boolean>;
}

/**
 * Views are inter-domain queries the involve at least 2 domains.
 * Views are slightly more complex, transforming at least 2 or domains into a new (virtual) domain.
 * Views will usually mimic operations like SQL Joins, virtual/calculated properties etc...
 */
Queries.VIEWS = {
  /**
   * Some selector functions create joins across parts of state. This selector
   * composes the search result IDs to return an array of books in the store.
   */
  getSearchResults: createSelector(
    books.getEntities,
    search.getIds,
    (books, searchIds) => searchIds.map(id => books[id])
  ),
  getBookCollection: createSelector(
    books.getEntities,
    collection.getIds,
    (entities, ids) => ids.map(id => entities[id])
  ),
  isSelectedBookInCollection: createSelector(
    collection.getIds,
    books.getSelectedId,
    (ids, selected) => ids.indexOf(selected) > -1
  )
};


declare module 'ngrx-domains' {
  interface Queries {
    VIEWS: VIEWQueries;
  }
}
