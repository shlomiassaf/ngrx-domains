import { createDomain } from 'ngrx-domains';
import './State';
import './Actions';

import { reducer } from './reducer';

createDomain('user2', reducer);
