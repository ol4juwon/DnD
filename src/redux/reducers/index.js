import {combineReducers} from 'redux';

import authReducer from './authSlice';

const appReducer = combineReducers({
  auth: authReducer,
});

const rootReducer = appReducer;

export default rootReducer;
