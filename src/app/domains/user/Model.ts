import { register } from 'ngrx-domains';

namespace UserModels {
  export interface User {
    readonly id?: number | string;
    readonly name?: string;
  }

  export class ConcreteUser {
    static HELLO: string;
    met(): string {
      return '1';
    };
  }
}


register(UserModels.ConcreteUser, 'ConcreteUser');

declare module 'ngrx-domains' {
  export namespace Model {
    export type User = UserModels.User;

    export const ConcreteUser: typeof UserModels.ConcreteUser;
    export type ConcreteUser = UserModels.ConcreteUser;
  }
}

