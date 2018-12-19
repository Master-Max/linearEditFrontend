import { UPDATE_RECORDER_CLOCK } from '../actions/types';

const initialState = {
  time: 0
}

export default function recorderClockReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_RECORDER_CLOCK:
      return {...state, time: action.payload}
    default:
      return state;
  }
}
