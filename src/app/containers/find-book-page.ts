import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Actions, State, Queries, Model } from 'ngrx-domains';


@Component({
  selector: 'bc-find-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-book-search [query]="searchQuery$ | async" [searching]="loading$ | async" (search)="search($event)"></bc-book-search>
    <bc-book-preview-list [books]="books$ | async"></bc-book-preview-list>
  `
})
export class FindBookPageComponent {
  searchQuery$: Observable<string>;
  books$: Observable<Model.Book[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.searchQuery$ = store.select(Queries.search.getQuery).take(1);
    this.books$ = store.select(Queries.VIEWS.getSearchResults);
    this.loading$ = store.select(Queries.search.getLoading);
  }

  search(query: string) {
    this.store.dispatch(new Actions.books.SearchAction(query));
  }
}
