import { State, LayoutState, Query, Queries, Root, setQueries } from 'ngrx-domains';

export interface LayoutQueries {
  getShowSidenav: Query<State, boolean>;
}

export const getShowSidenav = (state: LayoutState) => state.showSidenav;


setQueries('layout', { getShowSidenav });


declare module 'ngrx-domains' {
  interface Root {
    layout: Query<State, LayoutState>;
  }

  interface Queries {
    layout: LayoutQueries;
  }
}
