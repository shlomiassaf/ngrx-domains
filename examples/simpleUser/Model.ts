import { register } from 'ngrx-domains/Model';

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

declare module 'ngrx-domains/Model' {
  export namespace Model {
    export type User = UserModels.User;

    export const ConcreteUser: typeof UserModels.ConcreteUser;
    export type ConcreteUser = UserModels.ConcreteUser;
  }
}

