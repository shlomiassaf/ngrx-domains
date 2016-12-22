import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';


import { Store } from '@ngrx/store';
import { State } from 'ngrx-domains'


@Component({
  selector: 'my-lazy',
  templateUrl: './lazy.component.html'
})

export class LazyComponent {
  user$: Observable<any>;

  constructor(private store: Store<State>) {
    this.user$ = this.store.select(state => {
      return state.user2 ? state.user2.user : '';
    });
  }


}
