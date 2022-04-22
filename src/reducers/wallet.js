// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: ['BRL'],
  expenses: [],
  lastCotacoes: {},
};

const walletReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
  case 'getCurrency':
    return { ...state,
      currencies: (Object.keys(actions.currency)).filter((val) => val !== 'USDT') };
  case 'getWallet':
    return { ...state, expenses: [...state.expenses, actions.wallet] };
  case 'getCotacoes':
    return { ...state, lastCotacoes: actions.cotacoes };
  case 'getNewWallet':
    return { ...state, expenses: actions.newWallet };
  default:
    return state;
  }
};

export default walletReducer;
