import { State } from 'ngrx-domains';

State.collection = {
  loaded: false,
  loading: false,
  ids: []
};

declare module 'ngrx-domains' {
  export interface CollectionState {
    loaded: boolean;
    loading: boolean;
    ids: string[];
  }

  interface State {
    collection: CollectionState;
  }
}
