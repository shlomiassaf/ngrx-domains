import { Actions, BooksState, State , Model } from 'ngrx-domains';


/*=
 * The ngrx example-app originally uses a class for every action.
 * The classes does not come with a static property representing the token for the action (type),
 * the example-app uses an exported object (ActionTypes) to export the types.
 * Since ngrx-domains does not provide a way to export the tokens in the global api they can only be
 * access directly (import { ActionTypes } from './actions').
 * Direct import will work fine but when we want to import action types from a different domain we
 * need to import it directly which couples both domains together.
 *
 * There's no problem with coupling if this is by design, but if not we can bypass it.
 * To minimize changes to the original app I have left the class based actions in tact and used
 * direct reference comparision to find the dispatched action.
 *
 */


export function reducer(state: BooksState = State.books, action: any): BooksState {
  switch (action.constructor) {
    case Actions.books.SearchCompleteAction:
    case Actions.collection.LoadSuccessAction: {
      const books = action.payload;
      const newBooks = books.filter(book => !state.entities[book.id]);

      const newBookIds = newBooks.map(book => book.id);
      const newBookEntities = newBooks.reduce((entities: { [id: string]: Model.Book }, book: Model.Book) => {
        return Object.assign(entities, {
          [book.id]: book
        });
      }, {});

      return {
        ids: [ ...state.ids, ...newBookIds ],
        entities: Object.assign({}, state.entities, newBookEntities),
        selectedBookId: state.selectedBookId
      };
    }

    case Actions.books.LoadAction: {
      const book = action.payload;

      if (state.ids.indexOf(book.id) > -1) {
        return state;
      }

      return {
        ids: [ ...state.ids, book.id ],
        entities: Object.assign({}, state.entities, {
          [book.id]: book
        }),
        selectedBookId: state.selectedBookId
      };
    }

    case Actions.books.SelectAction: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedBookId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
