import { createTable } from 'ngrx-domains';
import './State';
import './Actions';
import './Queries';

import { reducer } from './reducer';

createTable('nav', reducer);


