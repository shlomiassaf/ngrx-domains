import { State } from 'ngrx-domains';

State.search = {
  ids: [],
  loading: false,
  query: ''
};

declare module 'ngrx-domains' {
  export interface SearchState {
    ids: string[];
    loading: boolean;
    query: string;
  }

  interface State {
    search: SearchState;
  }
}
