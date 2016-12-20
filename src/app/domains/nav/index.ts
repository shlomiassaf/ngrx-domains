import { createDomain } from 'ngrx-domains';
import './State';
import './Actions';
import './Queries';

import { reducer } from './reducer';

createDomain('nav', reducer);


