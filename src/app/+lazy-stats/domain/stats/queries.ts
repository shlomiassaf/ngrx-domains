import { StatsState, Query, Queries, Root, combineRootFactory } from 'ngrx-domains';

export interface StatsQueries {
  searchCount: Query<number>;
  searchHistory: Query<string[]>;
}

/* SEE domains/boks/queries.ts for a detailed explanation */
const fromRoot = combineRootFactory<StatsState>('stats');

Queries.stats = {
  searchCount: fromRoot( state => state.searchCount ),
  searchHistory: fromRoot( state => state.searchHistory )
};

declare module 'ngrx-domains' {
  interface Root {
    stats: Query<StatsState>;
  }

  interface Queries {
    stats: StatsQueries;
  }
}
