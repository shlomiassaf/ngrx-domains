import { createDomain } from 'ngrx-domains';
import './model';
import './state';
import './actions';
import './queries';

import { reducer } from './reducer';

createDomain('books', reducer);


export { BookEffects } from './effects';


/* This code is here since we must register these queries after the createDomain() call.
  The raw queries defined in books/queries.ts are simple selectors that needs a pre-selector
  to filter the books state only. using them before createDomain() means it's before they are replaced
  with a the pre-selector functions.

 * TODO(shlomiassaf): ngrx-domains should allow getting the compiled function - maybe forwardRef like, or a function...
 * need to think of a good design for this.
 */
import { createSelector } from 'reselect';
import { Queries } from 'ngrx-domains';

Queries.books.getSelected = createSelector(
  Queries.books.getEntities,
  Queries.books.getSelectedId,
  (entities, selectedId) => entities[selectedId]
);

Queries.books.getAll = createSelector(
  Queries.books.getEntities,
  Queries.books.getIds,
  (entities, ids) => ids.map(id => entities[id])
);


