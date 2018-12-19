import { UPDATE_PLAYER_CLOCK } from '../actions/types';

const initialState = {
  time: 0
}

export default function playerClockReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PLAYER_CLOCK:
      return {...state, time: action.payload}
    default:
      return state;
  }
}
