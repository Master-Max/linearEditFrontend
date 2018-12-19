import { combineReducers } from 'redux';
import playerClockReducer from './playerClockReducer'
import playerReducer from './playerReducer'
import recorderReducer from './recorderReducer'

export default combineReducers({
  playerClock: playerClockReducer,
  player: playerReducer,
  recorder: recorderReducer,
});
