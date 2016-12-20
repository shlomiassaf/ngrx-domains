import { createTable } from 'ngrx-domains';
import './Model';
import './State';
import './Actions';
import './Queries';

import { reducer } from './reducer';

// publish the reducer
createTable('simpleUser', reducer);
