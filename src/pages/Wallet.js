import React from 'react';
import { connect } from 'react-redux';
import PropTypes, { string } from 'prop-types';
import { requisitionCurrencySucess, actionsWallet, requisitionCotacoesSucess } from '../actions';

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
  }

  async componentDidMount() {
    // const { currencyD } = this.props;
    // currencyD();
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

  async hendleClick() {
    const { valor, moeda, metPg, categoria, descricao, identity } = this.state;
    const { walletD, cotacoesD, cotacoesM } = this.props;
    // const { cotacoesD } = this.props;
    const answer = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await answer.json();
    cotacoesD(response);
    // cotacoesD();
    // const moedaCotada = cotacoesM[moeda];
    const moedaCotada = response[moeda];
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
    console.log(cotacoesM);
    console.log(moedaCotada);

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
    console.log(valor, metPg, categoria, descricao, moeda);
    console.log(wallet);
    return (
      <div>
        TrybeWallet
        <header>
          <span data-testid="email-field">
            { email }
          </span>
          <span data-testid="total-field">
            {/* 0 */}
            { wallet.length === 0 ? 0
              : (wallet.map((wal) => parseFloat(wal.value)
              * parseFloat(wal.exchangeRates.ask)).reduce(
                (acc, curr) => acc + curr,
              )) }
          </span>
          <span data-testid="header-currency-field">
            {/* { currencyM[0] } */}
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
          <table>
            <tr>
              <th>
                Descrição
              </th>
              <th>
                Tag
              </th>
              <th>
                Método de pagamento
              </th>
              <th>
                Valor
              </th>
              <th>
                Moeda
              </th>
              <th>
                Câmbio utilizado
              </th>
              <th>
                Valor convertido
              </th>
              <th>
                Moeda de conversão
              </th>
              <th>
                Editar/Excluir
              </th>
            </tr>
          </table>
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
  cotacoesM: PropTypes.shape().isRequired,
  wallet: PropTypes.shape().isRequired,
  // currency: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  currencyD: (data) => dispatch(requisitionCurrencySucess(data)),
  walletD: (data) => dispatch(actionsWallet(data)),
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
