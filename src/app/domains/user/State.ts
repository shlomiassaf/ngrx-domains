import { State, Model } from 'ngrx-domains';

State.user = {
  user: { name: 'Angular User' },
  loading: false,
  loaded: true,
};

declare module 'ngrx-domains' {
  export interface UserSchema {
    user: Model.User;
    loading: boolean;
    loaded: boolean;
  }

  interface State {
    user: UserSchema
  }
}



