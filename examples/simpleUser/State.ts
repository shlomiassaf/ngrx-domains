import { State, Model } from 'ngrx-domains';

// This is our initial state
State.simpleUser = {
  user: new Model.SimpleUser('John'),
  loggedIn: false
};

// type information
declare module 'ngrx-domains' {
  export interface SimpleUserState {
    user: Model.SimpleUser;
    loggedIn: boolean;
  }

  interface State {
    simpleUser: SimpleUserState
  }
}



