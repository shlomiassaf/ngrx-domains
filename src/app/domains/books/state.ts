import { State, Model } from 'ngrx-domains';

State.books = {
  ids: [],
  entities: {},
  selectedBookId: null,
};

declare module 'ngrx-domains' {
  export interface BooksState {
    ids: string[];
    entities: { [id: string]: Model.Book };
    selectedBookId: string | null;
  }

  interface State {
    books: BooksState;
  }
}
