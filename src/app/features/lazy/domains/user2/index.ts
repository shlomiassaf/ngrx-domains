import { createTable } from 'ngrx-domains';
import './State';
import './Actions';

import { reducer } from './reducer';

createTable('user2', reducer);
