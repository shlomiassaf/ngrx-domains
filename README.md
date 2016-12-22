# ngrx-domains

**Get your state together** - A plugin oriented Global registry for your **NGRX** logic

## TL;DR
Use a global registry to create encapsulated redux logic modules (domains).  

Each domain is a plugin, no hard dependencies.

Supports lazy domains (lazy injection of a reducer)

Create a dependency free global redux role objects, as you go, per module:  
  - State
  - Actions
  - Models  
  _Classes or Interfaces exposed to the app by a specific domain._
  - Queries  
  _Observables for a specific property on the state, or a transformation of it_
  
Access redux role objects from a single import:  
```ts
import { Actions, State, Model, Root, Queries } from 'ngrx-domains/State'

@Component({
  selector: 'my-cmp'
  /* metadata here */
})
export class MyCmpComponent {
  user$: Observable<Model.User>; // access types published by the domain 
  userName$: Observable<string>; 
  
  constructor(private store: Store<State>) {
    // State object type contains type data published by all domains.
  
  
    // root queries (table level)
    this.user$ = store.let(Root.user)    
    
    // namespaced queries defined by the domain:
    this.userName$ = store.let(Queries.user.name)    
  }


  changeName(name: string) {
  // namespaced actions defined by the domain, full auto-complete:
    this.store.dispatch(Actions.user.changeName(name));            
  }

}
```
 
## Alpha release
This library is in an early stage of development, expect some changes.
> The `Actions` objects will probably change since `@ngrx/effects` has an `Actions` type.
 
## Background
Redux is cool, super cool, but its hard to manage. 
Having all that boilerplate and strict discipline, that's tough!  
Working with NGRX I found 2 painful issues that this library try to solve:
  - Typescript: global `State` type (modularize, lazy load)
  - File Structure

#### State type
Our store represents a shared global state object. It's an empty object.  
Reducers populate the global state, each property on the global state is a child state managed by a reducer.  
>We can think of the store as a database where each property is a table, hence a reducer is a table.

Each reducer defines it own state interface internally, we don't have a typed global state.  
Every time we use the store we get a portion of the global state type.

```
constructor(store: Store<State>) { }
```
The generic `State` param is the interface we import from one of the reducers.  
> On a large project importing a state from a reducer somewhere in the project comes with some pain.



We can easily combine all states together so we get a complete global state type:
```
import * as fromBooks from './books';
import * as fromCollection from './collection';
import * as fromLayout from './layout';

export interface State {
  books: fromBooks.State;
  collection: fromCollection.State;
  layout: fromLayout.State;
}
```
This means we need to import every reducer, extra work but most important creates a dependency.  
It works fine on small projects using the **By Redux role** structure but it does not scale.
>A Dependency makes it hard to modularize, tree shake and lazy load with NGRX.

#### File structure
The file structure and organization of our code is crucial for the maintainability of the application.  
As the project grows it's getting difficult to structure the code so developers can easily understand the context, access and use it.  

There are many ways for structuring your code, the 2 most popular are:
 
#### By feature
Each application feature contains it own set or redux roles.
```
├── project-root/
│   ├── book
│   │   ├── actions.ts
│   │   ├── effects.ts
│   │   ├── index.ts
│   │   ├── reducer.ts
│   ├── collection
│   │   ├── actions.ts
│   │   ├── effects.ts
│   │   ├── index.ts
│   │   ├── reducer.ts
│   ├── layout
│   │   ├── actions.ts
│   │   ├── effects.ts
│   │   ├── index.ts
│   │   ├── reducer.ts
```
##### pros:
**Scales:** Changes are scoped into a single module, one place for all the redux logic and domain logic.  

##### cons:
**Dependent**: Accessing features is done by importing it module using hard coded relative path reference.   
**Hard to access**: Sometimes features are nested inside other modules

#### By Redux role
Each role (Actions, Reducers) in the Redux eco-system (and Effects in **ngrx**) has a module, project wide.
```
├── project-root/
│   ├── actions
│   │   ├── book.ts
│   │   ├── collection.ts
│   │   ├── layout.ts
│   ├── effects
│   │   ├── book.ts
│   │   ├── collection.ts
│   ├── reducers
│   │   ├── book.ts
│   │   ├── collection.ts
│   │   ├── index.ts
│   │   ├── layout.ts
```
Some roles acts as classic modules with `index.ts` (reducers)  
some acts as containers where each internal file is a module (actions, effects)

##### pros:
**Easy access:** This structure allows easy access when importing from other location in our app.

##### cons:
**Does not scale:** When adding or changing features some groups of objects tend to change together
for example, when we change the `reducers/book.ts` we will probably change `actions/book.ts` and `effects/books.ts`.  

## Enter `domains`
A Domain is a namespaced encapsulated feature that you can access easily from anywhere in your app without directly referencing it.

Each **Domain** is a redux logic unit that is responsible for:
  - publish itself in the registry
  - publish it's type information 
  - publish interaction methods (Actions)
  - manage all logic of the domain (reducers)
  - publish domain queries (optional)
  - publish domain models (optional)

> A Domain can also encapsulate it own `@Effect` services, they can be created outside of the domain.
  Since importing domain objects is easy they can live outside the domain.
  That's a choice of preference, `@Effect` has domain logic so it should be inside but its also an `@Injectable`...
  
A Domain is like a plugin, it attaches itself to the registry. The registry does not know about the plugin/domain.

Going back to the **Database** _metaphor_ with a tint of SQL:  
A domain is a managed table that comes with:  
  - Typed table schema (state)
  - Predefined CRUD **Functions / STP** (actions, reducers)
  - Predefined observed **Views** (queries)

### How does it work?
**ngrx-domains** works on 2 levels, runtime and design time.  
It uses **TypeScripts** `modules` and `namespaces` to extend types, similar to the way **rxjs** 5 allows extending `Observables`

#####Runtime:  
Dynamically adding objects (actions, reducers, queries, models) to a global registry.
#####Design time:
Being able to reflect the dynamic additions as "concrete" type information.  
Remember that the global registry is empty, actions, state, queries, etc... are all empty object with no type information.  
Adding type information requires a small amount boilerplate that helps TypeScript know about the structure.
A lot of this boilerplate you would have done anyway.
> The boilerplate represents Type information, as so it has no effect on the javascript output, i.e
it has no footprint on the compiled code emitted by TypeScript.


## Example
In this example we're creating a domain called **simpleUser**, we will separate redux roles by file but the whole **simpleUser** feature will be in one module.  
We have a model, 1 action (changing the name) and a query to get the logged in state.

```
├── project-root/
│   ├── simpleUser
│   │   ├── Actions.ts
│   │   ├── index.ts
│   │   ├── Model.ts
│   │   ├── Queries.ts
│   │   ├── reducer.ts
│   │   ├── State.ts
```

This structure is just for demonstration, you can follow any convention you like.

> File: Model.ts

```ts
import { register } from 'ngrx-domains';

namespace UserModels {
  export class SimpleUser {
    constructor(public name: string) {}
  }
}


register(UserModels.SimpleUser);

declare module 'ngrx-domains' {
  export namespace Model {
    export const SimpleUser: typeof UserModels.SimpleUser;
    export type SimpleUser = UserModels.SimpleUser;
  }
}
```

>File: Actions.ts

```ts
import { Action } from '@ngrx/store';
import { Actions } from 'ngrx-domains';

export class UserActions {
  static CHANGE_NAME = '[SimpleUser] Change User Name';
  changeName(name: string): Action {
    return {
      type: UserActions.CHANGE_NAME,
      payload: name
    };
  }
}

// this will fail type check if the module declaration below is not set
Actions.simpleUser = new UserActions();

// adding type information
declare module 'ngrx-domains' {
  interface Actions {
    simpleUser: UserActions;
  }
}
```

>File: State.ts

```ts
import { State, Model } from 'ngrx-domains';
const { SimpleUser } = Model;

// This is our initial state
State.simpleUser = {
  user: new SimpleUser('John'),
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
```

>File: Queries.ts

```ts
import { Observable } from 'rxjs/Observable';

import { Query } from 'ngrx-domains';
import { State, SimpleUserState, Queries, Root, setQueries } from 'ngrx-domains/State';

export interface SimpleQueries {
  // IN: State.simpleUser -> OUT: State.simpleUser.loggedIn
  loggedIn: Query<SimpleUserState, boolean>;
}


setQueries('simpleUser', {
  loggedIn: (state$: Observable<SimpleQueries>) => state$.select(state => state.loggedIn)
  /* OR:
   loggedIn: <any>false
   
   will auto generate a query returning a property from the state with the same name (loggedIn)
   */
});


declare module 'ngrx-domains' {
  // set root query (runtime query auto-generated)
  // so we can store.let(Root.simpleUser); 
  interface Root {
    simpleUser: Query<State, SimpleUserState>;
  }

  interface Queries {
    simpleUser: SimpleQueries;
  }
}
```

>File: reducer.ts

```ts
import { Action } from '@ngrx/store';
import { State, SimpleUserState, Model, UserActions } from 'ngrx-domains';

const { SimpleUser } = Model;

export function reducer(state: SimpleUserState, action: Action): SimpleUserState {
  if (!state) state = State.simpleUser; // State.simpleUser is typed

  switch (action.type) {
    case UserActions.CHANGE_NAME: {
      return Object.assign({}, state, {
        user: new SimpleUser(action.payload)
      });
    }

    default: {
      return state;
    }
  }
}
```

>File: index.ts

```ts
import { createTable } from 'ngrx-domains';
import './Model';
import './State';
import './Actions';
import './Queries';

import { reducer } from './reducer';

// publish the reducer
createTable('simpleUser', reducer);
```


## Development
This repo needs a good clean up, here's a map for now:

**lib** - Directory holding the `ngrx-domains` library code in TS.
**src** - A demo app until units tests...

The demo apps should consume a compiled version of **lib**, this is why there is a compilation process for the lib separate from the demo app.

`npm run start` will fire lib compilation + watch and demo app server via webpack. 

**lib** compiles to `src/ngrx-domains`, `src` is a module directory on the demo app so any `import {} from 'ngrx-domains'` will work.
 
## TODO / DESIGN / THOUGHTS:
  - Use metadata via decorators in addition to `createDomain`?