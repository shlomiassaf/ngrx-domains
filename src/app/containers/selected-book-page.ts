import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Actions, State, Queries, Model } from 'ngrx-domains';

@Component({
  selector: 'bc-selected-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-book-detail
      [book]="book$ | async"
      [inCollection]="isSelectedBookInCollection$ | async"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)">
    </bc-book-detail>
  `
})
export class SelectedBookPageComponent {
  book$: Observable<Model.Book>;
  isSelectedBookInCollection$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.book$ = store.select(Queries.books.getSelected);
    this.isSelectedBookInCollection$ = store.select(Queries.VIEWS.isSelectedBookInCollection);
  }

  addToCollection(book: Model.Book) {
    this.store.dispatch(new Actions.collection.AddBookAction(book));
  }

  removeFromCollection(book: Model.Book) {
    this.store.dispatch(new Actions.collection.RemoveBookAction(book));
  }
}
