import { routerReducer } from '@ngrx/router-store';
import { createTable } from 'ngrx-domains';
import './State';
import './Actions';


createTable('router', routerReducer);


