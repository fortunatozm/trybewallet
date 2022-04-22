import React from 'react';
import { connect } from 'react-redux';
import PropTypes, { string } from 'prop-types';
import { requisitionCurrencySucess, actionsNewWallet,
  actionsWallet, requisitionCotacoesSucess } from '../actions';
import Table from '../component/table';

const alimentacao = 'Alimentação';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      valor: 0,
      moeda: 'USD',
      metPg: 'Dinheiro',
      categoria: alimentacao,
      descricao: '',
      identity: 0,
    };
    this.hendleClick = this.hendleClick.bind(this);
    this.hendleChange = this.hendleChange.bind(this);
    this.butClick = this.butClick.bind(this);
  }

  async componentDidMount() {
    const { currencyD } = this.props;
    const answer = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await answer.json();
    currencyD(response);
  }

  hendleChange({ target }) {
    const values = target.value;
    this.setState({
      [target.name]: values,
    });
  }

  butClick({ target }) {
    const valores = target.id;
    const { wallet } = this.props;
    const atual = wallet.filter((at) => at.id !== Number(valores));
    console.log(atual);
    console.log(typeof (valores));
    newWallet(atual);
  }

  async hendleClick() {
    const { valor, moeda, metPg, categoria, descricao, identity } = this.state;
    const { walletD, cotacoesD } = this.props;
    const answer = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await answer.json();
    cotacoesD(response);
    const moedaCotada = response;
    const data = {
      id: identity,
      value: valor,
      currency: moeda,
      method: metPg,
      tag: categoria,
      description: descricao,
      exchangeRates: moedaCotada,
    };
    walletD(data);
    this.setState({
      valor: 0,
      moeda: 'USD',
      metPg: 'Dinheiro',
      categoria: alimentacao,
      descricao: '',
      identity: identity + 1,
    });
  }

  render() {
    const { email, currencyM, wallet } = this.props;
    const { valor, metPg, categoria, descricao, moeda } = this.state;

    return (
      <div>
        TrybeWallet
        <header>
          <span data-testid="email-field">
            { email }
          </span>
          <span data-testid="total-field">
            {/* 0 */}
            { wallet.length === 0 || wallet === undefined ? 0
              : (wallet.map((wal) => parseFloat(wal.value)
              * parseFloat((wal.exchangeRates[wal.currency].ask))).reduce(
                (acc, curr) => acc + curr,
              )).toFixed(2) }
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </header>
        <section>
          <label htmlFor="valor">
            Valor:
            <input
              type="number"
              name="valor"
              value={ valor }
              onChange={ this.hendleChange }
              id="valor"
              data-testid="value-input"
            />
          </label>

          <label htmlFor="moeda">
            Moeda:
            <select
              id="moeda"
              data-testid="currency-input"
              name="moeda"
              onChange={ this.hendleChange }
              value={ moeda }
            >
              { currencyM.map((currency) => (
                <option key={ Math.random() }>
                  { currency }
                </option>
              )) }
            </select>
          </label>

          <label htmlFor="metodopag">
            Método de Pagamento:
            <select
              id="metodopag"
              name="metPg"
              onChange={ this.hendleChange }
              value={ metPg }
              data-testid="method-input"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="categoria">
            Categoria:
            <select
              id="categoria"
              name="categoria"
              value={ categoria }
              data-testid="tag-input"
              onChange={ this.hendleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

          <label htmlFor="descricao">
            Descrição
            <input
              type="text"
              name="descricao"
              value={ descricao }
              onChange={ this.hendleChange }
              id="descricao"
              data-testid="description-input"
            />
          </label>

          <button type="button" onClick={ this.hendleClick }>
            Adicionar despesa
          </button>

        </section>
        <section>
          { wallet.length === 0 && wallet === undefined ? undefined : (<Table
            butClick={ this.butClick }
            wallet={ wallet }
          />) }
        </section>
      </div>);
  }
}
Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencyM: PropTypes.arrayOf(string).isRequired,
  currencyD: PropTypes.func.isRequired,
  walletD: PropTypes.func.isRequired,
  cotacoesD: PropTypes.func.isRequired,
  wallet: PropTypes.arrayOf(string).isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  currencyD: (data) => dispatch(requisitionCurrencySucess(data)),
  walletD: (data) => dispatch(actionsWallet(data)),
  newWallet: (data) => dispatch(actionsNewWallet(data)),
  cotacoesD: (data) => dispatch(requisitionCotacoesSucess(data)),
});
const mapStateToProps = (state) => (
  {
    email: state.user.email,
    wallet: state.wallet.expenses,
    currencyM: state.wallet.currencies,
    cotacoesM: state.wallet.lastCotacoes,
  }
);
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
