import { register } from 'ngrx-domains/Model';

namespace UserModels {
  export class SimpleUser {
    constructor(public name: string) {}
  }
}


register(UserModels.SimpleUser);

declare module 'ngrx-domains/Model' {
  export namespace Model {
    export const SimpleUser: typeof UserModels.SimpleUser;
    export type SimpleUser = UserModels.SimpleUser;
  }
}

