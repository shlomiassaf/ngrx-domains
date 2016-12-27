import { State } from 'ngrx-domains';

State.stats = {
  searchCount: 0,
  searchHistory: [],
  query: ''
};

declare module 'ngrx-domains' {
  export interface StatsState {
    searchCount: number;
    searchHistory: string[];
    query: string;
  }

  interface State {
    stats: StatsState;
  }
}
