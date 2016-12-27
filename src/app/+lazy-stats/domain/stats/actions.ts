import { Action } from '@ngrx/store';
import { Actions } from 'ngrx-domains';


/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  RESET:           '[Stats] Reset',
};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class ResetStatsAction implements Action {
  type = ActionTypes.RESET;

  constructor() { }
}


Actions.stats = {
  TYPES: ActionTypes,
  ResetStatsAction
};

declare module 'ngrx-domains' {
  interface Actions {
    stats: {
      TYPES: typeof ActionTypes,
      ResetStatsAction: typeof ResetStatsAction;
    };
  }
}
