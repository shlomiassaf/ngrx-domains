import { createSelector } from 'reselect';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { ActionReducer } from '@ngrx/store';

const tables = new Map<string, boolean>();
const reducers: {[key: string]: ActionReducer<any> } = {};
const tableCreatedSubject$ = new ReplaySubject<string>(1);

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

export interface Query<TTarget> {
  (state: State): TTarget;
}

export interface Type<T> {
  new (...args: any[]): T;
}

namespace utils {
  export function generateQuery(key: string): Query<any> {
    return (state: any) => state[key];
  }
}


export function safeQuery(query: any, key: string): Query<any> {
  return typeof query === 'function' ? query : utils.generateQuery(key);
}

export function createDomain(name: string, reducer: ActionReducer<any>): void {
  if (tables.has(name)) {
    throw new Error(`Domain name "${name}" already exists."`);
  }

  tables.set(name, true);
  reducers[name] = reducer;

  if (!Root[name]) {
    setRootQuery(name);
  }

  tableCreatedSubject$.next(name);
}

export function getReducers(): {[key: string]: ActionReducer<any> } {
  return Object.assign({}, reducers) as any;
}

export const tableCreated$: Observable<string> = tableCreatedSubject$.asObservable();

/**
 * Create a factory for creating selectors that relay on a base selector to transform the state.
 * @param base
 * @returns {(selector:(state:TState)=>TType)=>Selector<State, TOutput>}
 */
export function combineFactory<TState>(base: Query<TState>): <TType>(selector: (state: TState) => TType) => (state: State) => TType  {
  return <TType>(selector: (state:TState) => TType) => createSelector(base, selector);
}

/**
 * Create a root query for a domain.
 * By default creates a query that returns an object on the State object referenced by the domain name property.
 * @param domain The domain name
 * @param query Optional, a custom query.
 * @returns {Query<TState>}
 */
export function setRootQuery<TState>(domain: string, query?: Query<TState>): Query<TState> {
  if (Root[domain]) {
    throw new Error(`A root query for domain "${domain}" is already defined`);
  }

  const rootQuery: Query<TState> = safeQuery(query, domain);
  Object.defineProperty(Root, domain, { value: rootQuery });
  return rootQuery;
}

/**
 * Given a domain, returns a factory for creating queries that except the DOMAIN's state as input.
 * i.e: the query create expects an object that the root will select.
 * If the a root selector for the domain does not exist creats is (see setRootQuery).
 * @param domain
 * @returns {(selector:(state:TState)=>TType)=>(state:State)=>TType}
 */
export function combineRootFactory<TState>(domain: string): <TType>(selector: (state: TState) => TType) => (state: State) => TType  {
  const rootFn: Query<TState> = Root[domain] || setRootQuery<TState>(domain);
  return combineFactory(rootFn);
}

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
