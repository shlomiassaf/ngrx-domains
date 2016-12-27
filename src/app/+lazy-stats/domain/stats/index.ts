import { createDomain } from 'ngrx-domains';

import './state';
import './actions';
import './queries';
// import './model';

import { reducer } from './reducer';

createDomain('stats', reducer);

