import { createDomain } from 'ngrx-domains';
import './state';
import './queries';

import { reducer } from './reducer';

createDomain('search', reducer);

