import { createDomain } from 'ngrx-domains';
import './Model';
import './State';
import './Actions';
import './Queries';

import { reducer } from './reducer';

// publish the reducer
createDomain('simpleUser', reducer);
