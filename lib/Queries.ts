// When going TS 2.2 used mapped types so T in SET() can be a boolean
// export type OrBoolean<T> = {
//   [P in keyof T]: T[P] | boolean;
// };

export interface Queries {
  SET<T>(name: string, queries: T): void;
}

export const Queries: Queries = {
  SET<T>(name: string, queries: T): void {
    Queries[name] = queries;
  }
} as any;

export interface Root {

}
export const Root: Root = {} as any;
