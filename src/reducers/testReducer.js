import { FETCH_TEST } from '../actions/types';

const initialState = {
  things: [],
  thing: {}
};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_TEST:
      return {
        ...state,
        things: action.payload
      }
    default:
      return state;
  }
}
