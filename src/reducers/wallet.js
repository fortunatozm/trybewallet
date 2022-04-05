// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const walletReducer = (state = { value: '$1000,00' }, actions) => {
  switch (actions.type) {
  case 'getWallet':
    return { ...state, wallet: actions.wallet };
  default:
    return state;
  }
};

export default walletReducer;
