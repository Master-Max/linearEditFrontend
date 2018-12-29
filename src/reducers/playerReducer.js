import {
  UPDATE_PLAYER_SOURCE,
  UPDATE_PLAYER_STREAM,
  UPDATE_PLAYER_ISPLAYING,
  UPDATE_PLAYER_PLAYRATE,
  UPDATE_PLAYER_JOGSTEP
} from '../actions/types';

// const ts = 'http://localhost:4001'

const initialState = {
  source: null,
  stream: null,
  isLoading: false,
  isPlaying: false,
  playRate: 1,
  stepCount: 0,
  stepRate: 0,
}

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PLAYER_SOURCE: // This will be async
      return {...state, source: action.payload}
    case UPDATE_PLAYER_STREAM:
      return {...state, stream: action.payload}
    case "POSTING_VIDEO":
      return {...state, isLoading: true}
    case "POSTED_VIDEO":
      return {...state, isLoading: false}
    case UPDATE_PLAYER_ISPLAYING:
      return {...state, isPlaying: action.payload}
    case UPDATE_PLAYER_PLAYRATE:
      return {...state, playRate: action.payload}
    case UPDATE_PLAYER_JOGSTEP:
      return {...state, stepCount: state.stepCount + 1, stepRate: action.payload}
    default:
      return state;
  }
}
