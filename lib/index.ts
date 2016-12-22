import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { Type, safeQuery, composeChildQueries, Query } from './utils';

export { Type, safeQuery, Query } from './utils';

export interface Actions {}
export const Actions: Actions = {} as any;

export interface State {}
export const State: State = {} as any;

export interface Queries {}

export const Queries: Queries = {} as any;

export interface Root {}
export const Root: Root = {} as any;

export namespace Model {
  const X = 15;
}


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


/**
 * Sets a query in the domain.
 * If a query is falsy (not set, false, null, etc...) it will be auto-generated using the "name".
 * Auto-generated queries assume that the query name has a matching property name on the domain's state.
 * @param domain
 * @param name
 * @param query
 */
export function setQuery(domain: string, name: string, query?: Query<any, any>): void {
  let queries = Queries[domain];

  if (!queries) {
    queries = Queries[domain] = {};
  }

  queries[name] = safeQuery(query, name);
}

/**
 * Set a map of queries in the domain.
 * Each property name on the queries object is the query name.
 * If a query is falsy (not set, false, null, etc...) it will be auto-generated using the "name".
 * Auto-generated queries assume that the query name has a matching property name on the domain's state.
 * @param domain
 * @param queries
 */
export function setQueries(domain: string, queries: { [key: string]: Query<any, any> } ): void {
  Object.keys(queries).forEach( key => setQuery(domain, key, queries[key]) );
}
// When going TS 2.2 used mapped types so T in setQueries() can be a boolean
// export type OrBoolean<T> = {
//   [P in keyof T]: T[P] | boolean;
// };


/**
 * Register a model in the model registry.
 *
 * @param cls
 * @param name Optional, if not set "name" property is used.
 */
export function register(cls: Type<any>, name?: string): void {
  Model[name || cls.name] = cls;
}

/**
 * Registers a namespace.
 *
 * EXAMPLE:
 *
 * namespace MyModels {
 *   export class MyClass1 { }
 *   export class MyClass2 { }
 *   export class MyClass3 { }
 * }
 * registerNS(MyModels);
 *
 *
 *
 * Will register "MyClass1", "MyClass2" and "MyClass3"
 *
 * @param ns
 */
export function registerNS(ns: any): void {
  Object.keys(ns).forEach( key => register(ns[key]) );
}
