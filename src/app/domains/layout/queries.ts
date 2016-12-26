import { LayoutState, Query, Queries, Root, combineRootFactory } from 'ngrx-domains';

export interface LayoutQueries {
  getShowSidenav: Query<boolean>;
}

/* SEE domains/boks/queries.ts for a detailed explanation */
const fromRoot = combineRootFactory<LayoutState>('layout');

Queries.layout = {
  getShowSidenav: fromRoot( state => state.showSidenav )
};

declare module 'ngrx-domains' {
  interface Root {
    layout: Query<LayoutState>;
  }

  interface Queries {
    layout: LayoutQueries;
  }
}
