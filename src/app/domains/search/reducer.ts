import { Actions, SearchState, State } from 'ngrx-domains';


export function reducer(state: SearchState = State.search, action: any): SearchState {
  switch (action.constructor) {
    case Actions.books.SearchAction: {
      const query = action.payload;

      if (query === '') {
        return {
          ids: [],
          loading: false,
          query
        };
      }

      return Object.assign({}, state, {
        query,
        loading: true
      });
    }

    case Actions.books.SearchCompleteAction: {
      const books = action.payload;

      return {
        ids: books.map(book => book.id),
        loading: false,
        query: state.query
      };
    }

    default: {
      return state;
    }
  }
}
