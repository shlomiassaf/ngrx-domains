import { Observable } from "rxjs/Observable";
import { safeQuery } from './utils';

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


export interface Query<TSource, TTarget> {
  (selector: Observable<TSource>): Observable<TTarget>;
}


export interface Queries {}

export const Queries: Queries = {} as any;

export interface Root {

}
export const Root: Root = {} as any;
