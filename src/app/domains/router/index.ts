import { routerReducer } from '@ngrx/router-store';
import { createDomain } from 'ngrx-domains';
import './State';
import './Actions';


createDomain('router', routerReducer);


