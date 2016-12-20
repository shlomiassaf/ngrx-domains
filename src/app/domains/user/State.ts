import { State } from 'ngrx-domains/State';
import { Model } from 'ngrx-domains/Model';

State.user = {
  user: { name: 'Angular User' },
  loading: false,
  loaded: true,
};

declare module 'ngrx-domains/State' {
  export interface UserSchema {
    user: Model.User;
    loading: boolean;
    loaded: boolean;
  }

  interface State {
    user: UserSchema
  }
}



