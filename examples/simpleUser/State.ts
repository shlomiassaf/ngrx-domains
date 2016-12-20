import { State } from 'ngrx-domains/State';
import { Model } from 'ngrx-domains/Model';

// This is our initial state
State.simpleUser = {
  user: new Model.SimpleUser('John'),
  loggedIn: false
};

// type information
declare module 'ngrx-domains/State' {
  export interface SimpleUserState {
    user: Model.SimpleUser;
    loggedIn: boolean;
  }

  interface State {
    simpleUser: SimpleUserState
  }
}



