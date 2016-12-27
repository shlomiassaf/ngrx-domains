import 'rxjs/add/operator/first';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { Store } from '@ngrx/store';
import { State, Actions } from 'ngrx-domains';

import { StatsPageComponent } from './components/stats-page/stats-page.component';
import { routes } from './routes';
import './domain/stats';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StatsPageComponent]
})
export class LazyStatsModule {
  constructor(store: Store<State>) {
    // we relay on an external domain's action so we must first init the stats.
    // if not our root query will return null.
    // the root query runs before the reducer so it does not have a default state.

    store
      .first()
      .filter(state => !state.stats)
      .subscribe(state => store.dispatch(new Actions.stats.ResetStatsAction()));
  }
}
