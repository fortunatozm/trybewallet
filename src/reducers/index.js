import { combineReducers } from 'redux';
import userReducer from './user';
import walletReducer from './wallet';
// import currencyReducer from './cureency';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducer = combineReducers({
  user: userReducer,
  wallet: walletReducer,
  // currency: currencyReducer,
});

export default rootReducer;
