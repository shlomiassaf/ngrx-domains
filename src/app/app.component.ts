import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { views } from './app-nav-views';
import { MOBILE } from './services/constants';
import { Store } from "@ngrx/store";
import { State, Actions, Queries } from 'ngrx-domains';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  showMonitor = (ENV === 'development' && !AOT &&
    ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
  );
  mobile = MOBILE;
  views = views;
  sidenavMode$: Observable<'side' | 'over'>;

  constructor(public route: ActivatedRoute, public router: Router, store: Store<any>) {
    this.sidenavMode$ = store.let(Queries.nav.showSidenav)
      .map( show => show ? 'side' : 'over');
  }

  activateEvent(event) {
    if (ENV === 'development') {
      console.log('Activate Event:', event);
    }
  }

  deactivateEvent(event) {
    if (ENV === 'development') {
      console.log('Deactivate Event', event);
    }
  }
}
