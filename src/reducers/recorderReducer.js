import {
  ADD_RECORDER_SOURCE,
  UPDATE_RECORDER_SOURCE,
  UPDATE_RECORDER_ISLOADED,
  UPDATE_RECORDER_ISPLAYING,
  UPDATE_RECORDER_PLAYRATE,
  UPDATE_RECORDER_JOGSTEP,
  UPDATE_PREVIEW_CLIP
} from '../actions/types';

// Sources will have video objects in it, structured like this:
/*
  {
    sourceURL: "",
    streamURL: "",
    playerIN: 0,
    playerOUT: 300,
    recorderIN: 0,
    recorderOUT: 300
  }

*/

const initialState = {
  sources: [],
  currentSource: null,
  previewClip: null,
  isPlaying: false,
  isLoaded: false,
  playRate: 1,
  stepCount: 0,
  stepRate: 0,
}

export default function recorderReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_RECORDER_SOURCE:
      const newSources = state.sources.splice();
      newSources.push(action.payload)
      return {...state, sources: newSources}
    case UPDATE_RECORDER_SOURCE:
      return {...state, currentSource: action.payload}
    case UPDATE_RECORDER_ISLOADED:
      return {...state, isLoaded: action.payload}
    case UPDATE_RECORDER_ISPLAYING:
      return {...state, isPlaying: action.payload}
    case UPDATE_RECORDER_PLAYRATE:
      return {...state, playRate: action.payload}
    case UPDATE_RECORDER_JOGSTEP:
      return {...state, stepCount: state.stepCount + 1, stepRate: action.payload}
    case UPDATE_PREVIEW_CLIP:
      return {...state, previewClip: action.payload}
    default:
      return state;
  }
}
