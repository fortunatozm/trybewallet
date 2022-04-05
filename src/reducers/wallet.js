// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: ['BRL'],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
  case 'getWallet':
    return { ...state, currencies: actions.wallet };
  case 'getCurrency':
    return { ...state, expenses: actions.currency };
  default:
    return state;
  }
};

export default walletReducer;
