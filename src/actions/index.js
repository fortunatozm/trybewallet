// Coloque aqui suas actions
// import getCurrency from '../asyncFunctions';

// const requisitionCurrency = () => ({
//   type: 'REQUISITION',
// });

// REQUISITION_SUCESS
export const requisitionCurrencySucess = (currency) => ({
  type: 'getCurrency',
  currency,
});

export const requisitionCotacoesSucess = (cotacoes) => ({
  type: 'getCotacoes',
  cotacoes,
});

// Function Mount Requisitions
// const requitionDispactch = async (dispatch) => {
//   dispatch(requisitionCurrency());
//   const funcS = await getCurrency();
//   // dispatch(requisitionCurrencySucess(funcS));
//   dispatch(requisitionCotacoesSucess(funcS));
//   // console.log(funcS);
// };

export const actions = (user) => ({
  type: 'getEmail',
  user,
});

export const actionsWallet = (wallet) => ({
  type: 'getWallet',
  wallet,
});

// export const actionsCurrency = () => requitionDispactch;

// export const actionsCotacoes = () => requitionDispactch;
