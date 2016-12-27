import { ActionReducer } from '@ngrx/store';
import { State, getReducers, tableCreated$ } from 'ngrx-domains';
import { environment } from '../../environments/environment';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';


let _reducer: ActionReducer<State>;

// Support lazy loading, re-build reducer tree when a new domain is added
tableCreated$.subscribe( (domain: string) => {
  console.log('Reducer updated - new domain: ' + domain);

  if (environment.production) {
    _reducer = combineReducers(getReducers());
  }
  else {
    _reducer = compose(storeFreeze, combineReducers)(getReducers());
  }
});


export function reducer(state: any, action: any) {
  return _reducer(state, action);
}

