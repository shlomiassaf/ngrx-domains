import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { tables, reducers } from './cache';
import { Table } from './table';

export function createTable(name: string, reducer: ActionReducer<any>): void {
  if (tables.has(name)) {
    throw new Error(`Table name "${name}" already exists."`);
  }

  const table = new Table(name, reducer);

  tables.set(table.name, table);
  reducers[table.name] = table.reducer;

}

export function createReducer(...pre: any[]): ActionReducer<any> {
  if (pre.length > 0) {
    return compose(...pre, combineReducers)(reducers);
  } else {
    return combineReducers(reducers);
  }
}
