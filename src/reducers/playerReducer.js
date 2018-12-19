import { UPDATE_PLAYER_SOURCE, UPDATE_PLAYER_ISPLAYING, UPDATE_PLAYER_PLAYRATE } from '../actions/types';

const initialState = {
  source: 'http://localhost:4001/video',
  isPlaying: false,
  playRate: 1,
}

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PLAYER_SOURCE: // This will be async
      return {...state, source: action.payload}
    case UPDATE_PLAYER_ISPLAYING:
      return {...state, isPlaying: action.payload}
    case UPDATE_PLAYER_PLAYRATE:
      return {...state, playRate: action.payload}
    default:
      return state;
  }
}
