import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; // sempre que precisar conecar o EG com o componente
import actions from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      validationLogin: true,
    };
    this.validacaoEmail = this.validacaoEmail.bind(this);
    this.hendleClick = this.hendleClick.bind(this);
  }

  validacaoEmail({ target }) {
    const { email, senha } = this.state;
    const digitedLogin = target.value;
    const NUMBER5 = 5;
    const validation = /\S+@\S+\.\S+/; // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    if (validation.test(email) && senha.length >= NUMBER5) {
      this.setState({
        [target.name]: digitedLogin,
        validationLogin: false,
      });
    } else {
      this.setState({
        [target.name]: digitedLogin,
        validationLogin: true,
      });
    }
  }

  hendleClick() {
    const { email } = this.state;
    const { emailGet } = this.props;
    emailGet(email);
    const { history } = this.props;
    history.push('/carteira');
  }

  render() {
    const { email, senha, validationLogin } = this.state;
    return (
      <div>
        Login:
        <br />
        <label htmlFor="email">
          E-mail
          <input
            onChange={ this.validacaoEmail }
            type="email"
            id="email"
            data-testid="email-input"
            name="email"
            value={ email }
          />
        </label>
        <br />
        <label htmlFor="senha">
          Senha
          <input
            type="password"
            id="senha"
            data-testid="password-input"
            onChange={ this.validacaoEmail }
            name="senha"
            value={ senha }
          />
        </label>
        <br />
        <button
          onClick={ this.hendleClick }
          disabled={ validationLogin }
          type="button"
          id="button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

// Para Ler
// const mapStateToProps = (state) => (
//   {
//     prop1: state.user.email,
//     prop2: state.wallet.value,
//   }
// );

// Para enviar
const mapDispatchToProps = (dispatch) => ({
  emailGet: (user) => dispatch(actions(user)),
});

export default connect(null, mapDispatchToProps)(Login);
