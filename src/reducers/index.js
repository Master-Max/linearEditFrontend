import { combineReducers } from 'redux';
import playerClockReducer from './playerClockReducer'
import playerReducer from './playerReducer'
import recorderClockReducer from './recorderClockReducer'
import recorderReducer from './recorderReducer'
import userReducer from './userReducer'

export default combineReducers({
  playerClock: playerClockReducer,
  player: playerReducer,
  recorderClock: recorderClockReducer,
  recorder: recorderReducer,
  user: userReducer,
});
