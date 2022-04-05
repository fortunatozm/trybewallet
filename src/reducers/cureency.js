const INITIAL_STATE = {
  sigla: 'BRL',
};

const currencyReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
  case 'getCurrency':
    return { ...state, sigla: actions.currency };
  default:
    return state;
  }
};

export default currencyReducer;
