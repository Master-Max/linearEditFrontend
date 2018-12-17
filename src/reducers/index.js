import { combineReducers } from 'redux';
import testReducer from './testReducer';

export default combineReducers({
  tests: testReducer
});
