import { createDomain } from 'ngrx-domains';
import './model';
import './state';
import './actions';
import './queries';

import { reducer } from './reducer';

createDomain('books', reducer);

export { BookEffects } from './effects';
