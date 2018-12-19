import { ADD_RECORDER_SOURCE } from '../actions/types';
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
}

export default function recorderReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_RECORDER_SOURCE:
      return {...state, time: action.payload}
    default:
      return state;
  }
}
