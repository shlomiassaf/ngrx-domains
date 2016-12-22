import { ActionReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';

import { createReducer, tableCreated$, State } from 'ngrx-domains';
import './domains/user';
import './domains/nav';
import './domains/router';


// Generate a reducer to set the root state in dev mode for HMR
function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
}

const resetOnLogout = (reducer: Function) => {
  return function (state, action) {
    let newState;
    if (action.type === '[User] Logout Success') {
      newState = Object.assign({}, state);
      Object.keys(State).forEach((key) => {
        newState[key] = State[key];
      });
    }
    return reducer(newState || state, action);
  };
};

const DEV_REDUCERS = [stateSetter, storeFreeze];
// set in constants.js file of project root
if (['logger', 'both'].indexOf(STORE_DEV_TOOLS) !== -1 ) {
  DEV_REDUCERS.push(storeLogger());
}

let reducer;
//     = ENV !== 'development'
//   ? createReducer(resetOnLogout)
//   :  createReducer(...DEV_REDUCERS, resetOnLogout)
// ;

tableCreated$.subscribe( (table: string) => {
  console.log('Reducer updated');
  reducer = ENV !== 'development'
    ? createReducer(resetOnLogout)
    : createReducer(...DEV_REDUCERS, resetOnLogout)
  ;
});


export function rootReducer(state: any, action: any) {
  return reducer(state, action);
}
