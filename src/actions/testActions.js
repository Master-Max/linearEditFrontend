import { FETCH_TEST } from './types';

export const fetchTests = () => dispatch => {
  fetch('')
    .then(r => r.json())
    .then(data => dispatch({
      type: FETCH_TEST,
      payload: data
    })
  );
};
