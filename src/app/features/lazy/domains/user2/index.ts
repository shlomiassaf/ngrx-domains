import { createTable } from 'ngrx-domains';
import './Model';
import './State';
import './Actions';

import { reducer } from './reducer';

createTable('user', reducer);
