import React from 'react';
import { connect } from 'react-redux';
import PropTypes, { string } from 'prop-types';
import { actionsCurrency, actionsWallet } from '../actions';

const alimentacao = 'Alimentação';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      valor: '',
      moeda: 'USD',
      metPg: 'Dinheiro',
      categoria: alimentacao,
      descricao: '',
    };
    this.hendleClick = this.hendleClick.bind(this);
    this.hendleChange = this.hendleChange.bind(this);
  }

  componentDidMount() {
    const { currencyD } = this.props;
    currencyD();
  }

  hendleChange({ target }) {
    const values = target.value;
    this.setState({
      [target.name]: values,
    });
  }

  hendleClick() {
    const { valor, moeda, metPg, categoria, descricao } = this.state;
    // const list = [];
    const data = { valor, moeda, metPg, categoria, descricao };
    // list.push(data);
    const { walletD } = this.props;
    walletD(data);
    console.log(valor, metPg, categoria, descricao, moeda);
    console.log(data);

    this.setState({
      valor: '',
      moeda: 'USD',
      metPg: 'Dinheiro',
      categoria: alimentacao,
      descricao: '',
    });
  }

  render() {
    const { email, currencyM } = this.props;
    const { valor, metPg, categoria, descricao, moeda } = this.state;
    console.log(valor, metPg, categoria, descricao, moeda);
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
  // wallet: PropTypes.number.isRequired,
  // currency: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  currencyD: () => dispatch(actionsCurrency()),
  walletD: (dados) => dispatch(actionsWallet(dados)),
});

const mapStateToProps = (state) => (
  {
    email: state.user.email,
    wallet: state.wallet.expenses,
    currencyM: state.wallet.currencies,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
