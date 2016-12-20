import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { Query } from './Queries';


export interface Type<T> {
  new (...args: any[]): T;
}


export function generateQuery(key: string): Query<any, any> {
  return (state$: Observable<any>) => state$.select(state => state[key]);
}

export function safeQuery(query: any, key: string): Query<any, any> {
  return typeof query === 'function' ? query : generateQuery(key);
}


export function composeChildQueries<T>(rootFn: any, queries: T): T {
  const compiledQueries: any = {};

  for (let q in queries) {
    if (queries.hasOwnProperty(q)) {
      compiledQueries[q] = compose(queries[q], rootFn);
    }
  }

  return compiledQueries;
}
