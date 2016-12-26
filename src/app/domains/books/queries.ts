import { createSelector } from 'reselect';
import { Model, BooksState, Query, Queries, Root, combineRootFactory } from 'ngrx-domains';

/**
 * create the root selector for the "books" state, then create a factory for child selectors,
 * i.e selectors that requires the books state, not the app state.
 *
 * We implement the "short" version for creating the factory.
 * This will get the root selector for the domain 'books' or create and register it if it doesn't exist.
 * It will then return a factory for creating selectors based on that root selector.
 *
 * The "long" implementation is implicit.
 * We create the root selector and then the factory, this is useful if you are using a function.
 * Example:
 *    const root = setRootQuery<BooksState>( state => state.books );
 *    const fromRoot = combineFactory(root);
 *
 * We use combineFactory instead of combineRootFactory
 *
 * If you just need a reference to the root selector you can still use the "short" version, once
 * "combineRootFactory" is invoked get the root selector via Root.books
 */
const fromRoot = combineRootFactory<BooksState>('books');

/** COMPLETE TYPE INFORMATION
 *
 *     Setting "Queries.books" is 100% type safe since we must follow the structure defined in
 *     the "BookQueries" interface. The module declaration below (declare module 'ngrx-domains')
 *     makes sure TypeScript knows about it.
 *
 *     This means that:
 *
 *      A) We can relay on TS to infer the types, a lot!
 *
 *         In the code `const getEntities = fromRoot(state => state.entities);`
 *         "state" is inferred as BooksState which means typing "state" dot (.) will pop IntelliSense.
 *
 *         Furthermore, the return type from our selector is used to build the type returned by the query.
 *         In the code `const getSelectedId = fromRoot(state => state.selectedBookId);` the return type
 *         is booleans since `state.selectedBookId` is of type boolean. This means that the type returned
 *         from the expression, thus assigned to "getSelectedId", is `Query<boolean>` which in it's raw
 *         form reflects `(state: State): boolean;` or in words: A function that get's the global state
 *         and returns a boolean. (remember that it's actually a composition of 2 functions)
 *
 *         Less code without loosing type information.
 *
 *      B) Type safety all the way
 *
 *         if we replace: const getIds = fromRoot(state => state.ids);
 *         with:          const getIds = fromRoot(state => state.selectedBookId);
 *
 *         We will get a type error "Type 'string' is not assignable to type 'string[]'"
 *         Furthermore, TS will complain that "Property 'map' does not exist on type 'string'"
 *         which comes from `getAll` implementation that assumes the "ids" parameter is an array.
 *
 *         Working outside of the domain is no different.
 *         For example, if we want to a map the id's of the books into a comma separated string:
 *
 *         commaIds(id: string): Observable<string> {
 *            return store.select(Queries.books.getIds).map(ids => ids.join(', '));
 *         }
 *
 *         Changing the function's signature to `commaIds(id: string): Observable<string[]>`
 *         will result in a type error.
  */


const getEntities = fromRoot(state => state.entities);
const getIds = fromRoot(state => state.ids);
const getSelectedId = fromRoot(state => state.selectedBookId);

/**
 * Represents the structure of the queries object and the type of each query.
 * Using an interface is optional but recommended.
 *
 * An interface is more verbose but strongly typed, since it's virtual there no cost.
 * Instead of a implicitly creating an interface, create the books queries object and use its
 * inferred interface to set the type of in the module declaration.
 * See comments below for an example how to omit the interface.
 */
export interface BookQueries {
  getEntities: Query<{ [id: string]: Model.Book }>;
  getIds: Query<string[]>;
  getSelectedId: Query<string>;
  getSelected: Query<Model.Book>;
  getAll: Query<Model.Book[]>;
}

Queries.books  = {
  getEntities,
  getIds,
  getSelectedId,
  getSelected: createSelector(getEntities, getSelectedId, (entities, selectedId) => entities[selectedId]),
  getAll: createSelector(getEntities, getIds, (entities, ids) => ids.map(id => entities[id]))
};

declare module 'ngrx-domains' {
  interface Root {
    books: Query<BooksState>;
  }
  interface Queries {
    books: BookQueries;
  }
}

/** OMITTING THE INTERFACE:
 * We create an inferred interface and assign it's type to the module declaration.
 *
 * const books = { // THIS IS THE CHANGE
 *   getEntities,
 *   getIds,
 *   getSelectedId,
 *   getSelected: createSelector(getEntities, getSelectedId, (entities, selectedId) => entities[selectedId]),
 *   getAll: createSelector(getEntities, getIds, (entities, ids) => ids.map(id => entities[id]))
 * };
 *
 * Queries.books = books; // THIS IS THE CHANGE
 *
 * declare module 'ngrx-domains' {
 *   interface Root {
 *     books: Query<BooksState>;
 *   }
 *   interface Queries {
 *     books: typeof books; // THIS IS THE CHANGE
 *   }
 * }
 *
 */
