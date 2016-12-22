import { State } from 'ngrx-domains';

State.user2 = {
  user: { name: 'Angular User2' },
  loading: false,
  loaded: true,
};

declare module 'ngrx-domains' {
  export interface UserSchema2 {
    user: any;
    loading: boolean;
    loaded: boolean;
  }

  interface State {
    user2: UserSchema2
  }
}



