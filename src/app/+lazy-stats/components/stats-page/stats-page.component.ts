import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, Queries } from 'ngrx-domains';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.css']
})
export class StatsPageComponent {

  searchCount$: Observable<number>;
  searchHistory$: Observable<string[]>;

  constructor(store: Store<State>) {
    this.searchCount$ = store.select(Queries.stats.searchCount);
    this.searchHistory$ = store.select(Queries.stats.searchHistory);
  }

}
