import { UPDATE_USER } from '../actions/types';

const initialState = {
  id: null,
  username: null,
  password: null,
  isLoading: false,
};

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_USER:
      return {...state,
        id: action.payload.id,
        username: action.payload.username,
        password: action.payload.password,
      };
    case "CREATING_USER":
      return {...state, isLoading: true}
    case "CREATED_USER":
      return {...state, isLoading: false}
    default:
      return state;
  }
}
