import { UPDATE_CLOCK } from '../actions/types';

const initialState = {
  time: 0,
};

export default function clockReducer(state = initialState, action) {
  console.log('%c clockReducer', 'color: green');
  switch(action.type) {
    case UPDATE_CLOCK:
      return { ...state, time: action.payload };
    default:
      return state;
  }
}
