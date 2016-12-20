import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';


import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { Queries, Root } from './Queries';
import { safeQuery, composeChildQueries } from './utils';

const tables = new Map<string, boolean>();
const reducers: {[key: string]: ActionReducer<any> } = {};
const tableCreatedSubject$ = new ReplaySubject<string>(1);

export function createDomain(name: string, reducer: ActionReducer<any>): void {
  if (tables.has(name)) {
    throw new Error(`Domain name "${name}" already exists."`);
  }

  tables.set(name, true);
  reducers[name] = reducer;

  Root[name] = safeQuery(Root[name], name);
  Queries[name] = composeChildQueries(Root[name], Queries[name]);

  tableCreatedSubject$.next(name);
}

export function createReducer(...pre: any[]): ActionReducer<any> {
  if (pre.length > 0) {
    return compose(...pre, combineReducers)(reducers);
  } else {
    return combineReducers(reducers);
  }
}

export const tableCreated$: Observable<string> = tableCreatedSubject$.asObservable();
