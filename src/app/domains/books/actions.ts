import { Action } from '@ngrx/store';
import { Actions, Model } from 'ngrx-domains';

import { type } from '../../util';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  SEARCH:           type('[Book] Search'),
  SEARCH_COMPLETE:  type('[Book] Search Complete'),
  LOAD:             type('[Book] Load'),
  SELECT:           type('[Book] Select'),
};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class SearchAction implements Action {
  type = ActionTypes.SEARCH;

  constructor(public payload: string) { }
}

export class SearchCompleteAction implements Action {
  type = ActionTypes.SEARCH_COMPLETE;

  constructor(public payload: Model.Book[]) { }
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: Model.Book) { }
}

export class SelectAction implements Action {
  type = ActionTypes.SELECT;

  constructor(public payload: string) { }
}

Actions.books = {
  SearchAction,
  SearchCompleteAction,
  LoadAction,
  SelectAction
};

declare module 'ngrx-domains' {
  interface Actions {
    books: {
      SearchAction: typeof SearchAction;
      SearchCompleteAction: typeof SearchCompleteAction;
      LoadAction: typeof LoadAction;
      SelectAction: typeof SelectAction;
    };
  }
}
