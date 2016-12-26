import { createDomain } from 'ngrx-domains';
import './state';
import './actions';
import './queries';

import { reducer } from './reducer';

createDomain('layout', reducer);

