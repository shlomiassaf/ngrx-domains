import { Actions, StatsState, State } from 'ngrx-domains';

// we have a redundant "query" property that also exists on the "search" state.
// we can omit it by setting the query to accept the root state
// or by setting an observable...

export function reducer(state: StatsState = State.stats, action: any): StatsState {
  switch (action.constructor) {
    case Actions.stats.ResetStatsAction:
      return Object.assign({}, State.stats);
    case Actions.books.SearchAction:
      return Object.assign({}, state, { query: action.payload });
    case Actions.books.SearchCompleteAction:
      return Object.assign({}, state, {
        searchHistory: [...state.searchHistory, state.query],
        searchCount: state.searchCount + 1
      });
    default:
      return state;
  }
}
