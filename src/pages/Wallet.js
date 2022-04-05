import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
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
            BRL
          </span>
        </header>
      </div>);
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  // wallet: PropTypes.number.isRequired,
  // currency: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => (
  {
    email: state.user.email,
    wallet: state.wallet.value,
    currency: state.currency.sigla,
  }
);

export default connect(mapStateToProps)(Wallet);
