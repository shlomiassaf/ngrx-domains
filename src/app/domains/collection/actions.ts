import { Action } from '@ngrx/store';
import { Actions, Model } from 'ngrx-domains';
import { type } from '../../util';


export const ActionTypes = {
  ADD_BOOK:             type('[Collection] Add Book'),
  ADD_BOOK_SUCCESS:     type('[Collection] Add Book Success'),
  ADD_BOOK_FAIL:        type('[Collection] Add Book Fail'),
  REMOVE_BOOK:          type('[Collection] Remove Book'),
  REMOVE_BOOK_SUCCESS:  type('[Collection] Remove Book Success'),
  REMOVE_BOOK_FAIL:     type('[Collection] Remove Book Fail'),
  LOAD:                 type('[Collection] Load'),
  LOAD_SUCCESS:         type('[Collection] Load Success'),
  LOAD_FAIL:            type('[Collection] Load Fail'),
};


/**
 * Add Book to Collection Actions
 */
export class AddBookAction implements Action {
  type = ActionTypes.ADD_BOOK;

  constructor(public payload: Model.Book) { }
}

export class AddBookSuccessAction implements Action {
  type = ActionTypes.ADD_BOOK_SUCCESS;

  constructor(public payload: Model.Book) { }
}

export class AddBookFailAction implements Action {
  type = ActionTypes.ADD_BOOK_FAIL;

  constructor(public payload: Model.Book) { }
}


/**
 * Remove Book from Collection Actions
 */
export class RemoveBookAction implements Action {
  type = ActionTypes.REMOVE_BOOK;

  constructor(public payload: Model.Book) { }
}

export class RemoveBookSuccessAction implements Action {
  type = ActionTypes.REMOVE_BOOK_SUCCESS;

  constructor(public payload: Model.Book) { }
}

export class RemoveBookFailAction implements Action {
  type = ActionTypes.REMOVE_BOOK_FAIL;

  constructor(public payload: Model.Book) { }
}

/**
 * Load Collection Actions
 */
export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor() { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Model.Book[]) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any) { }
}

Actions.collection = {
  AddBookAction,
  AddBookSuccessAction,
  AddBookFailAction,
  RemoveBookAction,
  RemoveBookSuccessAction,
  RemoveBookFailAction,
  LoadAction,
  LoadSuccessAction,
  LoadFailAction
};

declare module 'ngrx-domains' {
  interface Actions {
    collection: {
      AddBookAction: typeof AddBookAction;
      AddBookSuccessAction: typeof AddBookSuccessAction;
      AddBookFailAction: typeof AddBookFailAction;
      RemoveBookAction: typeof RemoveBookAction;
      RemoveBookSuccessAction: typeof RemoveBookSuccessAction;
      RemoveBookFailAction: typeof RemoveBookFailAction;
      LoadAction: typeof LoadAction;
      LoadSuccessAction: typeof LoadSuccessAction;
      LoadFailAction: typeof LoadFailAction;
    };
  }
}
