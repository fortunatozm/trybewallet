// Coloque aqui suas actions
import getCurrency from '../asyncFunctions';

const requisitionCurrency = () => ({
  type: 'REQUISITION',
});

// REQUISITION_SUCESS
const requisitionCurrencySucess = (currency) => ({
  type: 'getCurrency',
  currency,
});

// Function Mount Requisitions
const requitionDispactch = async (dispatch) => {
  dispatch(requisitionCurrency());
  const funcS = await getCurrency();
  dispatch(requisitionCurrencySucess(funcS));
  console.log(funcS);
};

export const actions = (user) => ({
  type: 'getEmail',
  user,
});

export const actionsWallet = (wallet) => ({
  type: 'getWallet',
  wallet,
});

export const actionsCurrency = () => requitionDispactch;
