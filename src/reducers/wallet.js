// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: ['BRL'],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
  case 'getCurrency':
    return { ...state,
      currencies: (Object.keys(actions.currency)).filter((val) => val !== 'USDT') };
  case 'getWallet':
    return { ...state, expenses: actions.wallet };
  default:
    return state;
  }
};

export default walletReducer;
