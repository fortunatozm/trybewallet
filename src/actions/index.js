// Coloque aqui suas actions

// const actions = {
//   type: 'getEmail',
//   user: 'fortunato',
// };

export const actions = (user) => ({
  type: 'getEmail',
  user,
});

export const actionsWallet = (wallet) => ({
  type: 'getWallet',
  wallet,
});

export const actionsCurrency = (currency) => ({
  type: 'getCurrency',
  currency,
});

// export default actions;
