import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';


import { Model } from 'ngrx-domains';
import { Actions as DomainActions } from 'ngrx-domains'
import { ActionTypes, RemoveBookAction, AddBookAction } from './actions'


@Injectable()
export class CollectionEffects {
  constructor(private actions$: Actions, private db: Database) { }

  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the database open call in `defer` makes
   * effect easier to test.
   */
  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('books_app');
  });

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(ActionTypes.LOAD)
    .startWith(new DomainActions.collection.LoadAction())
    .switchMap(() =>
      this.db.query('books')
        .toArray()
        .map((books: Model.Book[]) => new DomainActions.collection.LoadSuccessAction(books))
        .catch(error => of(new DomainActions.collection.LoadFailAction(error)))
    );

  @Effect()
  addBookToCollection$: Observable<Action> = this.actions$
    .ofType(ActionTypes.ADD_BOOK)
    .map((action: AddBookAction) => action.payload)
    .mergeMap(book =>
      this.db.insert('books', [ book ])
        .map(() => new DomainActions.collection.AddBookSuccessAction(book))
        .catch(() => of(new DomainActions.collection.AddBookFailAction(book)))
    );


  @Effect()
  removeBookFromCollection$: Observable<Action> = this.actions$
    .ofType(ActionTypes.REMOVE_BOOK)
    .map((action: RemoveBookAction) => action.payload)
    .mergeMap(book =>
      this.db.executeWrite('books', 'delete', [ book.id ])
        .map(() => new DomainActions.collection.RemoveBookSuccessAction(book))
        .catch(() => of(new DomainActions.collection.RemoveBookFailAction(book)))
    );
}
