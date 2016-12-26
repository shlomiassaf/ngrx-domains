import { Component, Input } from '@angular/core';

import { Model } from 'ngrx-domains';


@Component({
  selector: 'bc-book-authors',
  template: `
    <h5 md-subheader>Written By:</h5>
    <span>
      {{ authors | bcAddCommas }}
    </span>
  `,
  styles: [`
    h5 {
      margin-bottom: 5px;
    }
  `]
})
export class BookAuthorsComponent {
  @Input() book: Model.Book;

  get authors() {
    return this.book.volumeInfo.authors;
  }
}
