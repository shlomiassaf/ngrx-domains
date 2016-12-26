import { Actions, CollectionState, State } from 'ngrx-domains';

export function reducer(state: CollectionState = State.collection, action: any): CollectionState {
  switch (action.constructor) {
    case Actions.collection.LoadAction: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case Actions.collection.LoadSuccessAction: {
      const books = action.payload;

      return {
        loaded: true,
        loading: false,
        ids: books.map(book => book.id)
      };
    }

    case Actions.collection.AddBookSuccessAction:
    case Actions.collection.RemoveBookFailAction: {
      const book = action.payload;

      if (state.ids.indexOf(book.id) > -1) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [ ...state.ids, book.id ]
      });
    }

    case Actions.collection.RemoveBookSuccessAction:
    case Actions.collection.AddBookFailAction: {
      const book = action.payload;

      return Object.assign({}, state, {
        ids: state.ids.filter(id => id !== book.id)
      });
    }

    default: {
      return state;
    }
  }
}
