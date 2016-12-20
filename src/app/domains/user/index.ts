import { createDomain } from 'ngrx-domains';
import './Model';
import './State';
import './Actions';

import { reducer } from './reducer';

createDomain('user', reducer);
