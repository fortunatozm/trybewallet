// import { actions } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: 'Fortunato',
};

const userReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
  case 'getEmail':
    return { ...state, email: actions.user };
  default:
    return state;
  }
};

export default userReducer;
