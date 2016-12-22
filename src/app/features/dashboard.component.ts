import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { State, Actions, Model } from 'ngrx-domains'


@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`#my-logout-button { background: #F44336 }`]
})

export class DashboardComponent implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  form: FormGroup;
  nameLabel = 'Enter your name';
  user: Model.User;
  user$: Observable<Model.User>;
  constructor(fb: FormBuilder, private store: Store<State>) {
    this.form = fb.group({
      name: ''
    });


    let X: Model.ConcreteUser = new Model.ConcreteUser();
    console.log(Model.ConcreteUser, X);
    this.user$ = this.store.select(state => state.user.user);
    this.user$.takeUntil(this.destroyed$)
      .subscribe(user => { this.user = user; });
  }

  ngOnInit() {
    this.form.get('name').setValue(this.user.name);
  }

  clearName() {
    this.store.dispatch(Actions.user.editUser(
      Object.assign({}, this.user, { name: '' }
      )));

    this.form.get('name').setValue('');
  }

  logout() {
    this.store.dispatch(Actions.user.logout());
  }

  submitState() {
    this.store.dispatch(Actions.user.editUser(
      Object.assign({}, this.user, { name: this.form.get('name').value }
      )));
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
