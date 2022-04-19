import React from 'react';
import { connect } from 'react-redux';
import PropTypes, { string } from 'prop-types';
import { actionsCurrency } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { currencyD } = this.props;
    currencyD();
  }

  render() {
    const { email, currencyM } = this.props;
    return (
      <div>
        TrybeWallet
        <header>
          <span data-testid="email-field">
            { email }
          </span>
          <span data-testid="total-field">
            0
          </span>
          <span data-testid="header-currency-field">
            { currencyM[0] }
            {/* BRL */}
          </span>
        </header>
        <section>
          <label htmlFor="valor">
            Valor:
            <input id="valor" data-testid="value-input" />
          </label>

          <label htmlFor="moeda">
            Moeda:
            <select id="moeda" data-testid="currency-input">
              { currencyM.map((currency) => (
                <option value={ currency } key={ Math.random() }>
                  { currency }
                </option>
              )) }
            </select>
          </label>

          <label htmlFor="metodopag">
            Método de Pagamento:
            <select id="metodopag" data-testid="method-input">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="categoria">
            Método de Pagamento:
            <select id="categoria" data-testid="tag-input">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <label htmlFor="descricao">
            Descrição
            <input id="descricao" data-testid="description-input" />
          </label>

        </section>
      </div>);
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencyM: PropTypes.arrayOf(string).isRequired,
  currencyD: PropTypes.func.isRequired,
  // wallet: PropTypes.number.isRequired,
  // currency: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  currencyD: () => dispatch(actionsCurrency()),
});

const mapStateToProps = (state) => (
  {
    email: state.user.email,
    wallet: state.wallet.expenses,
    currencyM: state.wallet.currencies,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
