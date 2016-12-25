import { createSelector } from 'reselect';

export interface Query<TSource, TTarget> {
  (state: TSource): TTarget;
}

export interface Type<T> {
  new (...args: any[]): T;
}

export function generateQuery(key: string): Query<any, any> {
  return (state: any) => state[key];
}

export function safeQuery(query: any, key: string): Query<any, any> {
  return typeof query === 'function' ? query : generateQuery(key);
}


export function composeChildQueries<T>(rootFn: any, queries: T): T {
  const compiledQueries: any = {};

  for (let q in queries) {
    if (queries.hasOwnProperty(q)) {
      compiledQueries[q] = createSelector(rootFn, queries[q]);
    }
  }

  return compiledQueries;
}
